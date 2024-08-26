import { View,Text, TouchableOpacity ,Pressable, ScrollView, TextInput} from 'react-native';

import { useState,  useRef, useEffect } from 'react';

import InputSearch from '../components/InputSearch';
import GoBackTopBar from '../components/GoBackTopBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from '../components/BottomSheet';
import TransferTypeItem from '../components/TransferTypeItem';
import httpRequest from '../utils/httpRequest';

import ItemLoader from '../components/ItemLoader';

import Recipient from '../components/Recipient';

import ScreenLoader from '../components/ScreenLoader';

export default function AutoWithdrawalRecipientScreen({ route, navigation })  {
const {transferTypeId, payPalEmailAddress, balanceData} = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [transferType, setTransferType] = useState(null);

  const [transferTypeSearchText, setTransferTypeSearchText] = useState(null);

  const bottomSheetPTransferTypeModalRef = useRef(null);

  const [isEmailAddressFocused, setEmailAddressFocused] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const [recipient, setRecipient] = useState({});


  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const handleEmailAddressFocus = () => {
    setEmailAddressFocused(true);
  };

  const handleEmailAddressBlur = async () => {
    setEmailAddressFocused(false);

    setRecipient(null);
    let result = await httpRequest('customer/get-recipient-by-email-address?emailAddress=' + emailAddress + '&currencyId=' + balanceData?.currencyId + '&transferTypeId=' + transferType?.transferTypeId, 'get', null, true, null);
    if (result.data) {
      setRecipient(result.data);
    }  else {
      setRecipient({flag: true});
    }

};

  const onFocus = async () =>{
setTransferType(global.transferTypes?.find(e=>e.transferTypeId == transferTypeId));
setEmailAddress(payPalEmailAddress);
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

    return(
        <View>
        {!isLoading && (
          <View
            style={{
              height: '100%',
              paddingRight: 20,
              backgroundColor: '#13150F',
            }}>
            <GoBackTopBar navigation={navigation} />
            <ScrollView
              contentContainerStyle={{ paddingLeft: 20 }}
              showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  color: 'white',
                  paddingRight: 20,
                  marginBottom: 20,
                  fontSize: 28,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
             Auto withdrawal recipient - {balanceData?.currency}
              </Text>
              <Text style={{ color: 'white' }}>Transfer Type</Text>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        bottomSheetPTransferTypeModalRef.current.present();
                        setTransferTypeSearchText(null);
                  }}>
                  <View
                  style={{
                    height: 52,
                    paddingLeft: 5,
                    color: 'white',
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    marginTop: 10,
                    fontSize: 18,
                    flexDirection: 'row'
                    , justifyContent: 'space-between'
                  }}>
                    <Text style={{
                          color: 'white',
                          fontSize: 18,
                          marginLeft: 20,
                          marginTop: 15
                    }}>
        {transferType?.transferTypeName}
  
                    </Text>
     <FontAwesome5
                        style={{ marginTop: 15, marginLeft: 10 }}
                        name="chevron-down"
                        size={18}
                        color="white"
                      />
  
                  </View>
               
                  </TouchableOpacity>

                  
<Text style={{ color: 'white', marginTop:20 }}>Email Address</Text>
                <TextInput
                  style={{
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                       isEmailAddressFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setEmailAddress(value);
                  }}
                  value={emailAddress}
                  onFocus={handleEmailAddressFocus}
                  onBlur={handleEmailAddressBlur}
                  selectionColor="#2a80b9"
                />
                    {!recipient && (
             <View style={{ marginLeft: -20 , marginTop:10, flex: 'row' }}>
             <ItemLoader key={1} count={1} />
           </View>
            )}
                 {recipient?.fullName && 
            <Recipient recipient={recipient} />

            }
            </ScrollView>
            <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}>
            <Pressable
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinuePressOut}
              onPress={async () => {
                handleContinuePressOut();
            
                    let result = await httpRequest('customer/update-auto-withdrawal-recipient', 'put', {
                      currencyId:balanceData?.currencyId,
                      transferTypeId:transferType?.transferTypeId,
                      emailAddress: emailAddress
                    }, true, setIsLoading);
                    if (result.success) {
                        navigation.goBack();
                    } 
              }}
              disabled={!transferTypeId || !emailAddress}
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                !transferTypeId || !emailAddress
                    ? '#2A2C29'
                    : isContinuePressed
                    ? 'white'
                    : '#2a80b9',
              }}>
              <Text
                style={{
                  color: isContinuePressed ? 'black' : 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </Pressable>
          </View>
            <BottomSheet
            bottomSheetModalRef={bottomSheetPTransferTypeModalRef}
            snapPoints={['90%']}
            title={'Select transfer type'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                        setTransferTypeSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.transferTypes
                    ?.filter(
                      (x) =>
                        !transferTypeSearchText ||
                        x.transferTypeName
                          .toLowerCase()
                          .includes(transferTypeSearchText.toLowerCase())
                    )
                    ?.filter(
                      (e) => e.transferTypeId != 3 && e.transferTypeId != 4
                    )
                    ?.map((transferTypeData, index) => (
                      <TransferTypeItem
                        key={index}
                        isRadioButton={true}
                        transferTypeId={transferType?.transferTypeId}
                        transferTypeData={transferTypeData}
                        callback={() => {
                            bottomSheetPTransferTypeModalRef.current.close();
                            
                            setTransferType(transferTypeData);
                         
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
          </View>
        )}
        {isLoading && <ScreenLoader />}
      </View>
    )
}