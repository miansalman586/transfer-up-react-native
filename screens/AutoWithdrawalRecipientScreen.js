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
import RecipientItem from '../components/RecipientItem';
import TransferTypeIcon from '../components/TransferTypeIcon';

export default function AutoWithdrawalRecipientScreen({ route, navigation })  {
const {transferTypeId, payPalEmailAddress, balanceData} = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [transferType, setTransferType] = useState(null);
  const bottomSheetRecipientModalRef = useRef(null);
  const [recipients, setRecipients] = useState([]);

  const [transferTypeSearchText, setTransferTypeSearchText] = useState(null);

  const bottomSheetPTransferTypeModalRef = useRef(null);

  const [isEmailAddressFocused, setEmailAddressFocused] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  const [recipientSearchText, setRecipientSearchText] = useState(null);

  const [isIBANFocused, setIBANFocused] = useState(false);
  const [iban, setIBAN] = useState(null);

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


const handleIBANFocus = () => {
  setIBANFocused(true);
};

const handleIBANBlur = async () => {
  setIBANFocused(false);
};

  const onFocus = async () =>{

    var tr = global.transferTypes?.find(e=>e.transferTypeId == transferTypeId);
setTransferType(tr);
setEmailAddress(payPalEmailAddress);

if (tr?.transferTypeId == 9 || tr?.transferTypeId == 5  || tr?.transferTypeId == 10) {
  let recip = await httpRequest('customer/get-recipient-by-transfer-type-id?transferTypeId=' + tr.transferTypeId, 'get', null, true, setIsLoading, navigation, false);
  if (recip.status == 200) {
   recip = await recip.json();
   setRecipients(recip)
   setRecipient(recip.find(e=>e.recipientId == balanceData?.recipientId));
  }
 }
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
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 13, marginLeft: 20}}>
                  <TransferTypeIcon transferType={transferType} color="white" />
                  </View>
                  <Text style={{
                        color: 'white',
                        fontSize: 18,
                        marginLeft: 20,
                        marginTop: 15
                  }}>
       {transferType?.transferTypeName}

                  </Text>
                  </View>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>

             {transferType?.transferTypeId == 2 &&
<View>
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
                </View>
              }  

  
{(transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5 || transferType?.transferTypeId == 10) && (
            <View>
                  <Text style={{ color: 'white' , marginTop: 20}}>Recipient</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetRecipientModalRef.current.present();
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
      {recipient && recipient?.firstName && recipient?.lastName ? recipient?.firstName + ' ' + recipient?.lastName : ''}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>
            </View>

            )}

                    {!recipient && (
             <View style={{ marginLeft: -20 , marginTop:10, flex: 'row' }}>
             <ItemLoader key={1} count={1} />
           </View>
            )}
                 {(recipient?.fullName || recipient?.firstName && recipient?.lastName)&& 
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
                      emailAddress: emailAddress,
                      iban: recipient?.iban,
                      recipientId: recipient?.recipientId,
                      firstName: recipient?.firstName,
                      lastName: recipient?.lastName
                    }, true, setIsLoading, navigation, false);
                   
                    if (result.status == 200) {
                        navigation.goBack();
                    } 
              }}
              disabled={  !transferType ||
                (transferType?.transferTypeId == 2 && !emailAddress) ||
                (transferType?.transferTypeId == 9 && !recipient?.customerRecipientId)
              }
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                 !transferType ||
                (transferType?.transferTypeId == 2 && !emailAddress) ||
                (transferType?.transferTypeId == 9 && !recipient?.customerRecipientId)
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
          {(transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5 || transferType?.transferTypeId == 10) &&
<BottomSheet
            bottomSheetModalRef={bottomSheetRecipientModalRef}
            snapPoints={['90%']}
            title={'Select recipient'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setRecipientSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {recipients
                  
                    ?.filter(
                      (x) =>
                        !recipientSearchText ||
                        (x.firstName + ' ' + x.lastName)
                          .toLowerCase()
                          .includes(recipientSearchText.toLowerCase())
                    )?.filter(e=>e.currencyId == balanceData?.currencyId)
                    ?.map((recipientData, index) => (
                      <RecipientItem
                        key={index}
                        recipientId={recipient}
                        backgroundColor={"#2A2C29"}
                        customerRecipientId={recipient.customerRecipientId}
                        isRadioButton={true}
                        recipientData={recipientData}
                        callback={async () => {
                          bottomSheetRecipientModalRef.current.close();

                          setRecipient(recipientData);

                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
          }
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
                    (e) => (e.transactionTypeId == 1 &&

                            (e.transferTypeId != 2 || (e.transferTypeId == 2 && e.payPalCurrencyId?.split(',').some(t=> t == balanceData?.currencyId))) && 
                             (e.transferTypeId != 9 || (e.transferTypeId == 9 && e.currencyId?.split(',').some(t=> t == balanceData?.currencyId)))
                            
                            )
                  )
                    ?.filter(
                      (x) =>
                        !transferTypeSearchText ||
                        x.transferTypeName
                          .toLowerCase()
                          .includes(transferTypeSearchText.toLowerCase())
                    )
                  ?.filter((value, index, self) => 
                    index === self.findIndex((t) => t.transferTypeId === value.transferTypeId)
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
                        callback={async () => {
                            bottomSheetPTransferTypeModalRef.current.close();
                            
                            setTransferType(transferTypeData);

                            let recip = await httpRequest('customer/get-recipient-by-transfer-type-id?transferTypeId=' + transferTypeData.transferTypeId, 'get', null, true, setIsLoading, navigation, false);
                            if (recip.status == 200) {
                             recip = await recip.json();
                             setRecipients(recip)
                            }

                         
                         
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