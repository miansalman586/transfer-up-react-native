import { View,Text ,Pressable, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InputSearch from '../../components/InputSearch';
import CurrencyItem from '../../components/CurrencyItem';
import { useState,  useRef, useEffect } from 'react';

import ScreenLoader from '../../components/ScreenLoader';

import GoBackTopBar from '../../components/GoBackTopBar';
import httpRequest from '../../utils/httpRequest';

import BottomSheet from '../../components/BottomSheet';

import ErrorMessage from '../../components/ErrorMessage';

import TransferTypeItem from '../../components/TransferTypeItem';

export default function AddRecipientScreen({ route, navigation })  {

  const [isLoading, setIsLoading] = useState(false);
  const [isRecupientFound, setIsRecipientFound] = useState(false);

const [currency, setCurrency] = useState(null);
const [transferType, setTransferType] = useState(null);

  const bottomSheetCurrencyModalRef = useRef(null);
const bottomSheetTransferTypeModalRef = useRef(null);

  const [currencySearchText, setCurrencySearchText] = useState(null);
  const [transferTypeSearchText, setTransferTypeSearchText] = useState(null);

  const [isEmailAddressFocused, setEmailAddressFocused] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  
  const [isFirstNameFocused, setFirstNameFocused] = useState(false);
  const [firstName, setFirstName] = useState(null);

  const [isLastNameFocused, setLastNameFocused] = useState(false);
  const [lastName, setLastName] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

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

    if (emailAddress) {
    let result = await httpRequest('customer/has-customer-recipient?transferTypeId=' + transferType?.transferTypeId + '&emailAddress=' + emailAddress, 'get', null, true, setIsLoading);
    setIsRecipientFound(!result.success);
    } else {
      setIsRecipientFound(false);
    }
};


const handleFirstNameFocus = () => {
    setFirstNameFocused(true);
  };

  const handleFirstNameBlur = async () => {
    setFirstNameFocused(false);
};

const handleLastNameFocus = () => {
    setLastNameFocused(true);
  };

  const handleLastNameBlur = async () => {
    setLastNameFocused(false);
};

  const onFocus = async () =>{

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
             Add recipient
              </Text>

              <Text style={{ color: 'white', }}>First Name</Text>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                       isFirstNameFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setFirstName(value);
                  }}
                  value={firstName}
                  onFocus={handleFirstNameFocus}
                  onBlur={handleFirstNameBlur}
                  selectionColor="#2a80b9"
                />

<Text style={{ color: 'white', marginTop:20 }}>Last Name</Text>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                       isLastNameFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setLastName(value);
                  }}
                  value={lastName}
                  onFocus={handleLastNameFocus}
                  onBlur={handleLastNameBlur}
                  selectionColor="#2a80b9"
                />

<Text style={{ color: 'white' , marginTop: 20}}>Transfer Type</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetTransferTypeModalRef.current.present();
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

{transferType &&
<View>



                  
<Text style={{ color: 'white',marginTop:20 }}>Email Address</Text>
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
                    (isRecupientFound) 
                    ? '#FFBDBB'
                    :
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
                      <ErrorMessage
              flag={isRecupientFound}
              message={"Recipient already exists."
              }
            />
            </View>
}
<Text style={{ color: 'white' , marginTop: 20}}>Currency</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetCurrencyModalRef.current.present();
                      setCurrencySearchText(null);
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
      {currency?.description}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>



            

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
            
                    let result = await httpRequest('customer/add-recipient', 'post', {
                        firstName: firstName,
                        lastName: lastName,
                        emailAddress: emailAddress,
                        currencyId: currency?.currencyId,
                        transferTypeId: transferType?.transferTypeId
                    }, true, setIsLoading);
                    if (result.success) {
                        navigation.goBack();
                    } 
              }}
              disabled={!emailAddress || !firstName || !lastName || !currency || !transferType || isRecupientFound}
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                !emailAddress || !firstName || !lastName || !currency || !transferType || isRecupientFound
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
            bottomSheetModalRef={bottomSheetCurrencyModalRef}
            snapPoints={['90%']}
            title={'Select currency'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setCurrencySearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.currencies
                    ?.filter(
                      (x) =>
                        !currencySearchText ||
                        x.description
                          .toLowerCase()
                          .includes(currencySearchText.toLowerCase())
                    )
                    ?.filter((e) =>
                      global.balances?.some((t) => t.currencyId == e.currencyId)
                    )
                    ?.map((currencyData, index) => (
                      <CurrencyItem
                        key={index}
                        currencyId={currency?.currencyId}
                        isRadioButton={true}
                        currencyData={currencyData}
                        callback={async () => {
                          bottomSheetCurrencyModalRef.current.close();

                          setCurrency(
                           currencyData
                          );
                        }}
                      />
                    ))}
                </ScrollView>

              </View>
            }
          />
              <BottomSheet
            bottomSheetModalRef={bottomSheetTransferTypeModalRef}
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
                        transferTypeId={transferType?.transferTypeId}
                        isRadioButton={true}
                        transferTypeData={transferTypeData}
                        callback={() => {
                          bottomSheetTransferTypeModalRef.current.close();

                          setTransferType(transferTypeData);
                          setEmailAddress(null);
                          setIsRecipientFound(false);
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