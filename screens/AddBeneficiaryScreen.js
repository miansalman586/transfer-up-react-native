import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import RadioButton from '../components/RadionButton';
import ScreenLoader from '../components/ScreenLoader';
import InputSearch from '../components/InputSearch';
import CountryItem from '../components/CountryItem';
import BottomSheet from '../components/BottomSheet';
import * as GlobalService from '../services/GlobalService';

import { useState, useEffect, useRef } from 'react';

import GoBackTopBar from '../components/GoBackTopBar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ErrorMessage from '../components/ErrorMessage';

import httpRequest from '../utils/httpRequest';

export default function AddBeneficiaryScreen({ route, navigation }) {
  const [bankNameInputValue, setBankNameInputValue] = useState(null);
  const [firstNameInputValue, setFirstNameInputValue] = useState(null);
  const [lastNameInputValue, setLastNameInputValue] = useState(null);
  const [emailAddressInputValue, setEmailAddressInputValue] = useState(null);

  const [IBANInputValue, setIBANInputValue] = useState(null);
  const [accountTitleInputValue, setAccountTitleInputValue] = useState(null);
  const [addressInputValue, setAddressInputValue] = useState(null);
  const [zipCodeInputValue, setZipCodeInputValue] = useState(null);
  const [rejectedReasonInputValue, setRejectedReasonInputValue] =
    useState(null);
  const [accountStatusId, setAccountStatusId] = useState(null);

  const [countryId, setCountryId] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [countryFlag, setCountryFlag] = useState(null);
  const [bankAccountNumberTypeId, setBankAccountNumberTypeId] = useState(null);

  const [cityId, setCityId] = useState(null);
  const bottomSheetCountryModalRef = useRef(null);
  const bottomSheetCityModalRef = useRef(null);
  const [isBankNameErrorInput, setIsBankNameErrorInput] = useState(false);
  const [isFirstNameErrorInput, setIsFirstNameErrorInput] = useState(false);
  const [isLastNameErrorInput, setIsLastNameErrorInput] = useState(false);
  const [isEmailAddressErrorInput, setIsEmailAddressErrorInput] =
    useState(false);
  const [cities, setCities] = useState(null);

  const [countrySearchText, setCountrySearchText] = useState(null);
  const [citySearchText, setCitySearchText] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isIBANErrorInput, setIsIBANErrorInput] = useState(false);
  const [isIBANExistsErrorInput, setIsIBANExistsErrorInput] = useState(false);

  const [isAccountTitleErrorInput, setIsAccountTitleErrorInput] =
    useState(false);
  const [isAddressErrorInput, setIsAddressErrorInput] = useState(false);
  const [isZipCodeErrorInput, setIsZipCodeErrorInput] = useState(false);
  const [isCountryErrorInput, setIsCountryErrorInput] = useState(false);
  const [isCityErrorInput, setIsCityErrorInput] = useState(false);

  const [isBankNameInputFocused, setIsBankNameInputFocused] = useState(null);
  const [isFirstNameInputFocused, setIsFirstNameInputFocused] = useState(null);
  const [isLastNameInputFocused, setIsLastNameInputFocused] = useState(null);
  const [isEmailAddressInputFocused, setIsEmailAddressInputFocused] =
    useState(null);

  const [isIBANInputFocused, setIsIBANInputFocused] = useState(null);
  const [bankId, setBankId] = useState(null);

  const [isAccountTitleInputFocused, setIsAccountTitleInputFocused] =
    useState(null);
  const [isAddressInputFocused, setIsAddressInputFocused] = useState(null);
  const [isZipCodeInputFocused, setIsZipCodeInputFocused] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleBankNameFocus = () => {
    setIsBankNameInputFocused(true);
  };

  const handleBankNameBlur = () => {
    setIsBankNameInputFocused(false);
  };

  const handleFirstNameFocus = () => {
    setIsFirstNameInputFocused(true);
  };

  const handleFirstNameBlur = () => {
    setIsFirstNameInputFocused(false);
  };

  const handleLastNameFocus = () => {
    setIsLastNameInputFocused(true);
  };

  const handleLastNameBlur = () => {
    setIsLastNameInputFocused(false);
  };

  const handleEmailAddressFocus = () => {
    setIsEmailAddressInputFocused(true);
  };

  const handleEmailAddressBlur = () => {
    setIsEmailAddressInputFocused(false);
  };

  const handleIBANFocus = () => {
    setIsIBANInputFocused(true);
  };

  const handleIBANBlur = () => {
    setIsIBANInputFocused(false);

    httpRequest(
      'has-customer-beneficiary-account-number',
      'post',
      (data = { AccountNumber: IBANInputValue, CountryId: countryId }),
      setIsLoading,
      false,
      navigation
    ).then((data) => {
      setIsIBANExistsErrorInput(!data.Success);
    });
  };
  const handleAccountTitleFocus = () => {
    setIsAccountTitleInputFocused(true);
  };

  const handleAccountTitleBlur = () => {
    setIsAccountTitleInputFocused(false);
  };
  const handleAddressFocus = () => {
    setIsAddressInputFocused(true);
  };

  const handleAddressBlur = () => {
    setIsAddressInputFocused(false);
  };
  const handleZipCodeFocus = () => {
    setIsZipCodeInputFocused(true);
  };

  const handleZipCodeBlur = () => {
    setIsZipCodeInputFocused(false);
  };

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinueRelease = () => {
    setIsContinuePressed(false);
  };

  const [isCancelPressed, setIsCancelPressed] = useState(false);

  const handleCancelPressIn = () => {
    setIsCancelPressed(true);
  };

  const handleCancelRelease = () => {
    setIsCancelPressed(false);
  };

  const handleContinuePressed = () => {
    if (!bankNameInputValue) {
      setIsBankNameErrorInput(true);
    }
    if (!firstNameInputValue) {
      setIsFirstNameErrorInput(true);
    }
    if (!lastNameInputValue) {
      setIsLastNameErrorInput(true);
    }
    if (!emailAddressInputValue) {
      setIsEmailAddressErrorInput(true);
    }
    if (!IBANInputValue) {
      setIsIBANErrorInput(true);
    }
    if (!accountTitleInputValue) {
      setIsAccountTitleErrorInput(true);
    }
    if (!addressInputValue) {
      setIsAddressErrorInput(true);
    }
    if (!zipCodeInputValue) {
      setIsZipCodeErrorInput(true);
    }
    if (!countryId) {
      setIsCountryErrorInput(true);
    }
    if (!cityId) {
      setIsCityErrorInput(true);
    }

    if (
      bankNameInputValue &&
      firstNameInputValue &&
      lastNameInputValue &&
      emailAddressInputValue &&
      IBANInputValue &&
      accountTitleInputValue &&
      addressInputValue &&
      zipCodeInputValue &&
      countryId &&
      cityId &&
      !isIBANExistsErrorInput
    ) {
      if (bankId) {
        handleContinueRelease();
        httpRequest(
          'update-customer-beneficiary-account',
          'post',
          {
            BankId: bankId,
            BankName: bankNameInputValue,
            FirstName: firstNameInputValue,
            LastName: lastNameInputValue,
            EmailAddress: emailAddressInputValue,
            IBAN: IBANInputValue,
            AccountTitle: accountTitleInputValue,
            Address: addressInputValue,
            ZipCode: zipCodeInputValue,
            CityId: cityId,
            CountryId: countryId,
          },
          setIsLoading,
          true,
          navigation
        ).then((response) => {
          if (response.Success) {
            httpRequest(
              'update-customer-beneficiary-account-status',
              'post',
              {
                BankId: bankId,
                AccountStatusId: 1,
              },
              setIsLoading,
              true,
              navigation
            ).then((response) => {
              if (response.Success) {
                navigation.goBack();
              } else {
                Alert.alert('Error', response.Message);
              }
            });
          } else {
            Alert.alert('Error', response.Message);
          }
        });
      } else {
        handleContinueRelease();
        httpRequest(
          'add-customer-beneficiary-account',
          'post',
          {
            BankName: bankNameInputValue,
            FirstName: firstNameInputValue,
            LastName: lastNameInputValue,
            EmailAddress: emailAddressInputValue,
            IBAN: IBANInputValue,
            AccountTitle: accountTitleInputValue,
            Address: addressInputValue,
            ZipCode: zipCodeInputValue,
            CityId: cityId,
            CountryId: countryId,
          },
          setIsLoading,
          true,
          navigation
        ).then((response) => {
          if (response.Success) {
            navigation.goBack();
          } else {
            Alert.alert('Error', response.Message);
          }
        });
      }
    }
  };

  const onFocus = () => {
    if (route.params.bankId) {
      setBankId(route.params.bankId);

      httpRequest(
        'get-customer-beneficiary-detail',
        'post',
        {
          BankId: route.params.bankId,
        },
        setIsLoading,
        true,
        navigation
      ).then((data) => {
        setFirstNameInputValue(data.Data.FirstName);
        setLastNameInputValue(data.Data.LastName);
        setEmailAddressInputValue(data.Data.EmailAddress);
        setBankNameInputValue(data.Data.BankName);
        setCountryId(data.Data.CountryId);
        setCountryName(data.Data.CountryName);
        setCityId(data.Data.CityId);
        setCityName(data.Data.CityName);
        setIBANInputValue(data.Data.IBAN);
        setAccountTitleInputValue(data.Data.AccountTitle);
        setAddressInputValue(data.Data.Address);
        setZipCodeInputValue(data.Data.ZipCode.toString());
        setBankAccountNumberTypeId(data.Data.BankAccountNumberTypeId);
        setAccountStatusId(data.Data.AccountStatusId);
        setRejectedReasonInputValue(data.Data.RejectedReason);
      });
    }
  };

  const { title } = route.params;

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, []);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            paddingRight: 20,
            height: '100%',
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
              {title}
            </Text>
            <Text style={{ color: 'white' }}>First Name</Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isFirstNameErrorInput
                  ? '#FFBDBB'
                  : isFirstNameInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
                marginTop: 10,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsFirstNameErrorInput(true);
                } else {
                  setIsFirstNameErrorInput(false);
                }

                setFirstNameInputValue(value);
              }}
              value={firstNameInputValue}
              onFocus={handleFirstNameFocus}
              onBlur={handleFirstNameBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isFirstNameErrorInput}
              message="Please enter first name."
            />
            <Text style={{ color: 'white', marginTop: 20 }}>Last Name</Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isLastNameErrorInput
                  ? '#FFBDBB'
                  : isLastNameInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
                marginTop: 10,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsLastNameErrorInput(true);
                } else {
                  setIsLastNameErrorInput(false);
                }

                setLastNameInputValue(value);
              }}
              value={lastNameInputValue}
              onFocus={handleLastNameFocus}
              onBlur={handleLastNameBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isLastNameErrorInput}
              message="Please enter last name."
            />
            <Text style={{ color: 'white', marginTop: 20 }}>Email Address</Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isEmailAddressErrorInput
                  ? '#FFBDBB'
                  : isEmailAddressInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
                marginTop: 10,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsEmailAddressErrorInput(true);
                } else {
                  setIsEmailAddressErrorInput(false);
                }

                setEmailAddressInputValue(value);
              }}
              value={emailAddressInputValue}
              onFocus={handleEmailAddressFocus}
              onBlur={handleEmailAddressBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isEmailAddressErrorInput}
              message="Please enter email address."
            />
            <Text style={{ color: 'white', marginTop: 20 }}>Bank Name</Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isBankNameErrorInput
                  ? '#FFBDBB'
                  : isBankNameInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
                marginTop: 10,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsBankNameErrorInput(true);
                } else {
                  setIsBankNameErrorInput(false);
                }

                setBankNameInputValue(value);
              }}
              value={bankNameInputValue}
              onFocus={handleBankNameFocus}
              onBlur={handleBankNameBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isBankNameErrorInput}
              message="Please enter bank name."
            />
            <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
              Country
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                bottomSheetCountryModalRef.current.present();
                setCountrySearchText(null);
              }}>
              <View
                style={{
                  alignItems: 'center',
                  height: 50,
                  paddingLeft: 5,
                  color: 'white',
                  paddingRight: 20,
                  backgroundColor: '#2A2C29',
                  borderWidth: 2,
                  fontSize: 18,
                  flexDirection: 'row',
                  borderColor: isCountryErrorInput ? '#FFBDBB' : '#2A2C29',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 10,
                    marginLeft: 15,
                  }}>
                  {countryName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {countryFlag && (
                    <View>
                      <Image
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          marginRight: 10,
                          marginTop: 5,
                          marginLeft: 15,
                          backgroundColor: '#2A2C29',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={{ uri: countryFlag }}
                      />
                    </View>
                  )}
                  <FontAwesome5
                    style={{ marginTop: 9, marginLeft: 5 }}
                    name="chevron-down"
                    size={18}
                    color="#2a80b9"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <ErrorMessage
              flag={isCountryErrorInput}
              message="Please select country."
            />
            <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
              City
            </Text>
            <TouchableOpacity
              disabled={!countryId}
              activeOpacity={0.5}
              onPress={() => {
                bottomSheetCityModalRef.current.present();
                setCitySearchText(null);
              }}>
              <View
                style={{
                  alignItems: 'center',
                  height: 50,
                  paddingLeft: 5,
                  color: 'white',
                  paddingRight: 20,
                  backgroundColor: '#2A2C29',
                  borderWidth: 2,
                  fontSize: 18,
                  flexDirection: 'row',
                  borderColor: isCityErrorInput ? '#FFBDBB' : '#2A2C29',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 10,
                    marginLeft: 15,
                  }}>
                  {cityName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5
                    style={{ marginTop: 9, marginLeft: 5 }}
                    name="chevron-down"
                    size={18}
                    color="#2a80b9"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <ErrorMessage
              flag={isCityErrorInput}
              message="Please select city."
            />
            {bankAccountNumberTypeId == 1 && (
              <View>
                <Text
                  style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
                  IBAN
                </Text>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                      isIBANErrorInput || isIBANExistsErrorInput
                        ? '#FFBDBB'
                        : isIBANInputFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                  }}
                  onChangeText={(value) => {
                    if (!value) {
                      setIsIBANErrorInput(true);
                    } else {
                      setIsIBANErrorInput(false);
                    }

                    setIBANInputValue(value);
                  }}
                  value={IBANInputValue}
                  onFocus={handleIBANFocus}
                  onBlur={handleIBANBlur}
                  selectionColor="#2a80b9"
                />
                <ErrorMessage
                  flag={isIBANErrorInput}
                  message="Please enter IBAN."
                />
                <ErrorMessage
                  flag={isIBANExistsErrorInput}
                  message="IBAN already exists."
                />
              </View>
            )}
            <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
              Account Title
            </Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isAccountTitleErrorInput
                  ? '#FFBDBB'
                  : isAccountTitleInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsAccountTitleErrorInput(true);
                } else {
                  setIsAccountTitleErrorInput(false);
                }

                setAccountTitleInputValue(value);
              }}
              value={accountTitleInputValue}
              onFocus={handleAccountTitleFocus}
              onBlur={handleAccountTitleBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isAccountTitleErrorInput}
              message="Please enter account title."
            />
            <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
              Address
            </Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isAddressErrorInput
                  ? '#FFBDBB'
                  : isAddressInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsAddressErrorInput(true);
                } else {
                  setIsAddressErrorInput(false);
                }

                setAddressInputValue(value);
              }}
              value={addressInputValue}
              onFocus={handleAddressFocus}
              onBlur={handleAddressBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isAddressErrorInput}
              message="Please enter address."
            />
            <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
              Zip Code
            </Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderColor: isZipCodeErrorInput
                  ? '#FFBDBB'
                  : isZipCodeInputFocused
                  ? '#2a80b9'
                  : '#2A2C29',
                borderWidth: 2,
              }}
              onChangeText={(value) => {
                if (!value) {
                  setIsZipCodeErrorInput(true);
                } else {
                  setIsZipCodeErrorInput(false);
                }

                setZipCodeInputValue(value);
              }}
              value={zipCodeInputValue}
              keyboardType="numeric"
              textContentType="numeric"
              onFocus={handleZipCodeFocus}
              onBlur={handleZipCodeBlur}
              selectionColor="#2a80b9"
            />
            <ErrorMessage
              flag={isZipCodeErrorInput}
              message="Please enter zip code."
            />
            {accountStatusId == 4 && (
              <View>
                <Text
                  style={{
                    color: '#FFBDBB',
                    marginTop: 20,
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}>
                  Rejected Reason
                </Text>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {rejectedReasonInputValue}
                </Text>
              </View>
            )}
          </ScrollView>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}>
            <Pressable
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinueRelease}
              onPress={handleContinuePressed}
              style={{
                marginTop: 'auto',
                marginBottom: accountStatusId == 4 ? 20 : 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isContinuePressed ? 'white' : '#2a80b9',
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
            {accountStatusId == 4 && (
              <Pressable
                onPressIn={handleCancelPressIn}
                onPressOut={handleCancelRelease}
                onPress={() => {
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to cancel this account?',
                    [
                      {
                        text: 'Cancel',
                        style: 'destructive',
                        onPress: () => {
                          handleCancelRelease();
                          httpRequest(
                            'update-customer-beneficiary-account-status',
                            'post',
                            {
                              BankId: bankId,
                              AccountStatusId: 6,
                            },
                            setIsLoading,
                            true,
                            navigation
                          ).then((response) => {
                            if (response.Success) {
                              navigation.goBack();
                            } else {
                              Alert.alert('Error', response.Message);
                            }
                          });
                        },
                      },
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                    ]
                  );
                }}
                style={{
                  fontSize: 18,
                  marginBottom: 40,
                  height: 52,
                  borderRadius: 52,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  backgroundColor: isCancelPressed ? '#FFBDBB' : '#13150F',
                  borderColor: '#FFBDBB',
                }}>
                <Text
                  style={{
                    color: isCancelPressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Cancel
                </Text>
              </Pressable>
            )}
          </View>
          <BottomSheet
            bottomSheetModalRef={bottomSheetCountryModalRef}
            snapPoints={['90%']}
            title={'Select country'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setCountrySearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.countries
                    ?.filter(
                      (x) =>
                        !countrySearchText ||
                        x.CountryName.toLowerCase().includes(
                          countrySearchText.toLowerCase()
                        )
                    )
                    ?.map((countryData, index) => (
                      <CountryItem
                        key={index}
                        countryId={countryId}
                        countryData={countryData}
                        navigation={navigation}
                        callback={async () => {
                          bottomSheetCountryModalRef.current.close();

                          setCountryId(countryData.CountryId);
                          setCityId(null);
                          setCityName(null);
                          setIsCountryErrorInput(false);

                          setCountryName(countryData.CountryName);
                          setCountryFlag(countryData.Flag);
                          setBankAccountNumberTypeId(
                            countryData.BankAccountNumberTypeId
                          );

                          let result = await GlobalService.getCityByCountryId(
                            countryData.CountryId,
                            setIsLoading,
                            navigation
                          );
                          setCities(result.Data);
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
          <BottomSheet
            bottomSheetModalRef={bottomSheetCityModalRef}
            snapPoints={['90%']}
            title={'Select city'}
            content={
              <View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setCitySearchText(value);
                    }}
                  />
                </View>
                {cities
                  ?.filter(
                    (x) =>
                      !citySearchText ||
                      x.CityName.toLowerCase().includes(
                        citySearchText.toLowerCase()
                      )
                  )
                  ?.map((city, index) => (
                    <ScrollView>
                      <Pressable
                        key={index}
                        onPress={async () => {
                          bottomSheetCityModalRef.current.close();

                          setCityId(city.CityId);
                          setIsCityErrorInput(false);

                          setCityName(city.CityName);
                        }}
                        style={{
                          paddingTop: 25,
                          paddingBottom: 10,
                          paddingRight: 25,
                          paddingLeft: 25,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            {city.CityName}
                          </Text>
                        </View>
                        <RadioButton selected={cityId == city.CityId} />
                      </Pressable>
                    </ScrollView>
                  ))}
              </View>
            }
          />
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
