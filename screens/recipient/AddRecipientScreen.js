import { View,Text ,Pressable, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InputSearch from '../../components/InputSearch';
import CurrencyItem from '../../components/CurrencyItem';
import { useState,  useRef, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ScreenLoader from '../../components/ScreenLoader';

import GoBackTopBar from '../../components/GoBackTopBar';
import httpRequest from '../../utils/httpRequest';

import BottomSheet from '../../components/BottomSheet';

import ErrorMessage from '../../components/ErrorMessage';

import TransferTypeItem from '../../components/TransferTypeItem';
import RadioButton from '../../components/RadionButton';
import TransferTypeIcon from '../../components/TransferTypeIcon';

export default function AddRecipientScreen({ route, navigation })  {

  const [isLoading, setIsLoading] = useState(false);

const [currency, setCurrency] = useState(null);
const [transferType, setTransferType] = useState(null);

const [country, setCountry] = useState(null);

  const bottomSheetCurrencyModalRef = useRef(null);
const bottomSheetTransferTypeModalRef = useRef(null);

  const [currencySearchText, setCurrencySearchText] = useState(null);
  const [transferTypeSearchText, setTransferTypeSearchText] = useState(null);

  const bottomSheetAccountTypeModalRef = useRef(null);

  const [accountType, setAccountType] = useState(null);
  const [address, setAddress] = useState(null);

  const [isCountryError, setIsCountryError] = useState(false);
  const [isCountryFocused, setCountryFocused] = useState(false);

  const [isAddressError, setIsAddressError] = useState(false);
  const [isAddressFocused, setAddressFocused] = useState(false);

  const [isIBANError, setIsIBANError] = useState(false);

  const [isEmailAddressFocused, setEmailAddressFocused] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  
  const [firstName, setFirstName] = useState(null);

  const [accountNumber, setAccountNumber] = useState(null);

  const [isBICError, setIsBICError] = useState(false);
  const [bicErrorMessage, setBICErrorMessage] = useState(null);

  const [isAccountNumberError, setIsAccountNumberErrpr] = useState(false);
  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState(null);

const [countryErrorMessage, setCountryErrorMessage] = useState(null);
const [addressErrorMessage, setAddressErrorMessage] = useState(null);
const [ibanErrorMessage, setIBANErrorMessage] = useState(null);

  const [isLastNameFocused, setLastNameFocused] = useState(false);
  const [isBICFocused, setBICFocused] = useState(false);

  const [lastName, setLastName] = useState(null);
  const [bic, setBIC] = useState(null);
  const [iban, setIBAN] = useState(null);


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
};

const handleAddressFocus = () => {
  setAddressFocused(true);
};

const handleAddressBlur = async () => {
  setAddressFocused(false);
};


const handleCountryFocus = () => {
  setCountryFocused(true);
};

const handleCountryBlur = async () => {
  setCountryFocused(false);
};

const [isFirstNameFocused, setFirstNameFocused] = useState(false);
const [isIBANFocused, setIBANFocused] = useState(false);

const [isAccountNumberFocused, setAccountNumberFocused] = useState(false);

const handleFirstNameFocus = () => {
    setFirstNameFocused(true);
  };

  const handleFirstNameBlur = async () => {
    setFirstNameFocused(false);
};

const handleBICFocus = () => {
  setBICFocused(true);
};

const handleBICBlur = async () => {
  setBICFocused(false);
};

const handleAccountNumberFocus = () => {
  setAccountNumberFocused(true);
};

const handleAccountNumberBlur = async () => {
  setAccountNumberFocused(false);
};

const handleLastNameFocus = () => {
    setLastNameFocused(true);
  };

  const handleLastNameBlur = async () => {
    setLastNameFocused(false);
};


const handleIBANFocus = () => {
  setIBANFocused(true);
};

const handleIBANBlur = async () => {
  setIBANFocused(false);
};

  const onFocus = async () =>{

  };

  const clearErrorMessage = () => {
    setIsBICError(false);
    setIsAccountNumberErrpr(false);

    setBICErrorMessage(null);
    setAccountNumberErrorMessage(null);

    setIsCountryError(false);
    setCountryErrorMessage(null);

    setIsAddressError(false);
    setAddressErrorMessage(null);

    setIsIBANError(false);
    setIBANErrorMessage(null);
  };

  const clearFields = ()=> {
    setBIC(null);
    setAccountNumber(null);
    setIBAN(null);
    setAccountType(null);
    setEmailAddress(null);
    setCountry(null);
    setAddress(null);
    setIBAN(null);
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
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 13, marginLeft: 20}}>
                  <TransferTypeIcon transferType={transferType} />
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

                
<Text style={{ color: 'white' , marginTop: 20}}>Currency</Text>
                <TouchableOpacity disabled={!transferType} activeOpacity={0.5} onPress={() => {
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
                  <View style={{flexDirection: 'row'}}>
                  <Image
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        marginRight: 10,
                        marginTop: 12,
                        marginLeft: 15,
                        backgroundColor: '#2A2C29',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={{uri:'data:image/jpeg;base64,' + currency?.currencyFlag}}
                    />
                      <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 22,
                        marginTop: 12,
                      }}>
                      {currency?.currencyName}
                    </Text>

                    
                   
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />
                    </View>

                </View>
             
                </TouchableOpacity>



{((transferType?.transferTypeId == 2 || transferType?.transferTypeId == 5) )&&
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



                {(currency?.currencyId == 3 || currency?.currencyId == 5) && transferType?.transferTypeId == 9 &&
<View>



                  
<Text style={{ color: 'white',marginTop:20 }}>IBAN</Text>
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
                    isIBANError 
                    ? '#FFBDBB'
                    :
                       isIBANFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setIBAN(value);
                  }}
                  value={iban}
                  onFocus={handleIBANFocus}
                  onBlur={handleIBANBlur}
                  selectionColor="#2a80b9"
                />
                        <ErrorMessage
              flag={isIBANError}
              message={
               ibanErrorMessage
              }
            />
            </View>
            
}



{((currency?.currencyId == 2 || currency?.currencyId == 1 || currency?.currencyId == 6) && (transferType?.transferTypeId == 9  || transferType?.transferTypeId == 10)) &&
<View>

{transferType?.transferTypeId != 10 &&
  <View>

  
<Text style={{ color: 'white',marginTop:20 }}> {currency?.currencyId == 1 ? 'Routing Number' : 'BIC/SWIFT'}</Text>
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
                    isBICError 
                    ? '#FFBDBB'
                    :
                       isBICFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setBIC(value);
                  }}
                  value={bic}
                  onFocus={handleBICFocus}
                  onBlur={handleBICBlur}
                  selectionColor="#2a80b9"
                />
               <ErrorMessage
              flag={isBICError}
              message={
               bicErrorMessage
              }
            />
  </View>  
}
     

                  
<Text style={{ color: 'white',marginTop:20 }}>Account Number</Text>
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
                    isAccountNumberError 
                    ? '#FFBDBB'
                    :
                       isAccountNumberFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setAccountNumber(value);
                  }}
                  value={accountNumber}
                  onFocus={handleAccountNumberFocus}
                  onBlur={handleAccountNumberBlur}
                  selectionColor="#2a80b9"
                />
                    <ErrorMessage
              flag={isAccountNumberError}
              message={
               accountNumberErrorMessage
              }
            />



                {currency?.currencyId == 1 &&
                <View>


<Text style={{ color: 'white' , marginTop: 20}}>Account Type</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetAccountTypeModalRef.current.present();
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
      {accountType}

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

                }

                
{currency?.currencyId == 1 &&
<View>
                 
<Text style={{ color: 'white',marginTop:20 }}>Country</Text>
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
                    isCountryError 
                    ? '#FFBDBB'
                    :
                       isCountryFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setCountry(value);
                  }}
                  value={country}
                  onFocus={handleCountryFocus}
                  onBlur={handleCountryBlur}
                  selectionColor="#2a80b9"
                />
                    <ErrorMessage
              flag={isCountryError}
              message={
               countryErrorMessage
              }
            />
  </View>

}

              
{currency?.currencyId == 1 &&
<View>
                 
<Text style={{ color: 'white',marginTop:20 }}>Address</Text>
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
                    isAddressError 
                    ? '#FFBDBB'
                    :
                       isAddressFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setAddress(value);
                  }}
                  value={address}
                  onFocus={handleAddressFocus}
                  onBlur={handleAddressBlur}
                  selectionColor="#2a80b9"
                />
                    <ErrorMessage
              flag={isAddressError}
              message={
               addressErrorMessage
              }
            />
  </View>

}
           
            </View>
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

                clearErrorMessage();
                    let result = await httpRequest('customer/add-recipient', 'post', {
                        firstName: firstName,
                        lastName: lastName,
                        emailAddress: emailAddress,
                        currencyId: currency?.currencyId,
                        transferTypeId: transferType?.transferTypeId,
                        wiseRecipient: {
                          type: currency?.type,
                          currency: currency?.currencyName,
                          details: {
                            accountNumber: currency?.currencyId == 1006 ? emailAddress : accountNumber,
                            bic: currency?.currencyId == 2 ? bic : null,
                            iban: iban,
                            abartn: currency?.currencyId == 1 ? bic : null,
                            accountType: currency?.currencyId == 1 ? accountType : null,
                          },
                          accountHolderName: firstName + ' ' + lastName,
                          name: {
                            fullName: firstName + ' ' + lastName
                          },
                          address: {
                            country: country,
                            firstLine: address
                          },
                          country: country
                        }
                    }, true, setIsLoading, navigation, false);
                   
                    if (result.status == 200) {
                        navigation.goBack();
                    }  else {
                      result = await result.json();
                      result.forEach(e=>{
                        if (e.code == 'NOT_VALID') {
                          if (e.path == 'abartn' || e.path == 'swift-Code' || e.path == 'swiftCode') {
                            setIsBICError(true);
                          setBICErrorMessage(e.message);
                          } else if (e.path == 'accountNumber') {
                            setIsAccountNumberErrpr(true);
                            setAccountNumberErrorMessage(e.message);
                          } else if (e.path == 'address.country' || e.path == 'country') {
                            setIsCountryError(true);
                            setCountryErrorMessage(e.message);
                          } else if (e.path == 'address.firstLine') {
                            setIsAddressError(true);
                            setAddressErrorMessage(e.message);
                          } else if (e.path == 'IBAN') {
                            setIsIBANError(true);
                            setIBANErrorMessage(e.message);
                          }
                        }
                      })
                    }
              }}
              disabled={(!emailAddress && transferType?.transferTypeId == 2) || 
                (!country && transferType?.transferTypeId == 9 && currency?.currencyId == 1) ||
                (!address && transferType?.transferTypeId == 9 && currency?.currencyId == 1) ||
                (!bic && transferType?.transferTypeId == 9 && (currency?.currencyId == 2 || currency?.currencyId == 1)) ||
                (!accountType && transferType?.transferTypeId == 9 && currency?.currencyId == 1) ||
                (!accountNumber && transferType?.transferTypeId == 9 && currency?.currencyId == 2) ||
                (!iban && transferType?.transferTypeId == 9 && (currency?.currencyId == 3 || currency?.currencyId == 5)) ||
                !firstName || 
                !lastName || 
                !currency || 
                !transferType}
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                (!emailAddress && transferType?.transferTypeId == 2)|| 
                (!country && transferType?.transferTypeId == 9 && currency?.currencyId == 1) ||
                (!address && transferType?.transferTypeId == 9 && currency?.currencyId == 1) ||
                (!bic && transferType?.transferTypeId == 9 && (currency?.currencyId == 2 || currency?.currencyId == 1)) ||
                (!accountType && transferType?.transferTypeId == 9 && currency?.currencyId == 1) ||
                (!accountNumber && transferType?.transferTypeId == 9 && (currency?.currencyId == 2 || currency?.currencyId == 1)) ||
                (!iban && transferType?.transferTypeId == 9 && (currency?.currencyId == 3 || currency?.currencyId == 5)) ||
                !firstName || 
                !lastName || 
                !currency || 
                !transferType
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
                    ?.filter(e=> !transferType?.transferTypeId || 
                    (global.transferTypes?.some(t=> (t.transferTypeId == transferType?.transferTypeId) && t.currencyId?.split(',').some(x=>x == e.currencyId))) 
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

                          clearErrorMessage();
                          clearFields();
                        }}
                      />
                    ))}
                </ScrollView>

              </View>
            }
          />
             <BottomSheet
            bottomSheetModalRef={bottomSheetAccountTypeModalRef}
            snapPoints={['24%']}
            title={'Select account type'}
            content={
              <View>
                <ScrollView>
              
                <Pressable
    style={{
      paddingLeft: 20,
      paddingTop: 15,
      paddingBottom: 20,
      paddingRight: 20,
      backgroundColor: '#2A2C29',
    }}
    onPress={() => {
     setAccountType('CHECKING');
     bottomSheetAccountTypeModalRef.current.close();
    }}>
    <View style={{ flexDirection: 'row' }}>
   
      <View style={{ marginTop: 3, flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          CHECKING
        </Text>
      </View>
        <View style={{ marginTop: 15 }}>
          <RadioButton selected={accountType == 'CHECKING'} />
        </View>
    </View>
  </Pressable>

  <Pressable
    style={{
      paddingLeft: 20,
      paddingBottom: 20,
      paddingRight: 20,
      backgroundColor: '#2A2C29',
    }}
    onPress={() => {
     setAccountType('SAVING');
     bottomSheetAccountTypeModalRef.current.close();
    }}>
    <View style={{ flexDirection: 'row' }}>
   
      <View style={{ marginTop: 3, flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          SAVING
        </Text>
      </View>
        <View style={{ marginTop: 15 }}>
          <RadioButton selected={accountType == 'SAVING'} />
        </View>
    </View>
  </Pressable>

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
                    )?.filter((value, index, self) => 
                      index === self.findIndex((t) => t.transferTypeId === value.transferTypeId)
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

                          clearErrorMessage();
                          clearFields();

                          setCurrency(null);
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