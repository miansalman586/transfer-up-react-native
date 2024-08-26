import {
  View,
  ScrollView,
  Text,
  Linking,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import { useState, useEffect, useRef } from 'react';
import ScreenLoader from '../components/ScreenLoader';

import GoBackTopBar from '../components/GoBackTopBar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import BottomSheet from '../components/BottomSheet';
import InputSearch from '../components/InputSearch';
import CountryItem from '../components/CountryItem';
import * as GlobalService from '../services/GlobalService';

import httpRequest from '../utils/httpRequest';

export default function AddPayPalScreen({ navigation }) {
  const [isEmailAddressInputFocus, setIsEmailAddressInputFocus] =
    useState(false);
  const [emailAddressInputValue, setIsEmailAddressInputValue] = useState(null);

  const handleEmailAddressFocus = () => {
    setIsEmailAddressInputFocus(true);
  };

  const handleEmailAddressBlur = () => {
    setIsEmailAddressInputFocus(false);
  };

  const [isFirstNameInputFocus, setIsFirstNameInputFocus] = useState(false);
  const [firstNameInputValue, setFirstNameInputValue] = useState(null);

  const handleFirstNameFocus = () => {
    setIsFirstNameInputFocus(true);
  };

  const handleFirstNameBlur = () => {
    setIsFirstNameInputFocus(false);
  };

  const [isLastNameInputFocus, setIsLastNameInputFocus] = useState(false);
  const [lastNameInputValue, setLastNameInputValue] = useState(null);

  const handleLastNameFocus = () => {
    setIsLastNameInputFocus(true);
  };

  const handleLastNameBlur = () => {
    setIsLastNameInputFocus(false);
  };

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const [countryId, setCountryId] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [countryFlag, setCountryFlag] = useState(null);
  const [bankAccountNumberTypeId, setBankAccountNumberTypeId] = useState(null);

  const [cityId, setCityId] = useState(null);

  const bottomSheetCountryModalRef = useRef(null);
  const bottomSheetCityModalRef = useRef(null);

  const [cities, setCities] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isBankNameErrorInput, setIsBankNameErrorInput] = useState(false);
  const [isIBANErrorInput, setIsIBANErrorInput] = useState(false);
  const [isAccountTitleErrorInput, setIsAccountTitleErrorInput] =
    useState(false);
  const [isAddressErrorInput, setIsAddressErrorInput] = useState(false);
  const [isZipCodeErrorInput, setIsZipCodeErrorInput] = useState(false);
  const [isCountryErrorInput, setIsCountryErrorInput] = useState(false);
  const [isCityErrorInput, setIsCityErrorInput] = useState(false);

  const [bankId, setBankId] = useState(null);

  const [isBankNameInputFocused, setIsBankNameInputFocused] = useState(null);
  const [isIBANInputFocused, setIsIBANInputFocused] = useState(null);
  const [isAccountTitleInputFocused, setIsAccountTitleInputFocused] =
    useState(null);
  const [isAddressInputFocused, setIsAddressInputFocused] = useState(null);
  const [isZipCodeInputFocused, setIsZipCodeInputFocused] = useState(null);

  const [accountStatusId, setAccountStatusId] = useState(null);

  const [isCancelPressed, setIsCancelPressed] = useState(false);

  const handleCancelPressIn = () => {
    setIsCancelPressed(true);
  };

  const handleCancelRelease = () => {
    setIsCancelPressed(false);
  };

  const handleBankNameFocus = () => {
    setIsBankNameInputFocused(true);
  };

  const handleBankNameBlur = () => {
    setIsBankNameInputFocused(false);
  };

  const handleIBANFocus = () => {
    setIsIBANInputFocused(true);
  };

  const handleIBANBlur = () => {
    setIsIBANInputFocused(false);

    if (entityId == 2) {
      httpRequest(
        'has-customer-bank-account-number',
        'post',
        (data = { AccountNumber: IBANInputValue, CountryId: countryId }),
        setIsLoading,
        false,
        navigation
      ).then((data) => {
        setIsIBANExistsErrorInput(!data.Success);
      });
    } else if (entityId == 1) {
      httpRequest(
        'has-merchant-bank-account-number',
        'post',
        (data = { AccountNumber: IBANInputValue, CountryId: countryId }),
        setIsLoading,
        false,
        navigation
      ).then((data) => {
        setIsIBANExistsErrorInput(!data.Success);
      });
    }
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

  const onFocus = () => {};

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
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
          Add PayPal
        </Text>
        <Text style={{ color: 'white', marginBottom: 10 }}>Email Address</Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 18,
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#2A2C29',
            borderColor: isEmailAddressInputFocus ? '#2a80b9' : '#2A2C29',
            borderWidth: 2,
          }}
          onChangeText={(value) => {
            setIsEmailAddressInputValue(value);
          }}
          value={emailAddressInputValue}
          onFocus={handleEmailAddressFocus}
          onBlur={handleEmailAddressBlur}
          selectionColor="#2a80b9"
        />
        <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
          First Name
        </Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 18,
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#2A2C29',
            borderColor: isFirstNameInputFocus ? '#2a80b9' : '#2A2C29',
            borderWidth: 2,
          }}
          onChangeText={(value) => {
            setFirstNameInputValue(value);
          }}
          value={firstNameInputValue}
          onFocus={handleFirstNameFocus}
          onBlur={handleFirstNameBlur}
          selectionColor="#2a80b9"
        />
        <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
          Last Name
        </Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 18,
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#2A2C29',
            borderColor: isLastNameInputFocus ? '#2a80b9' : '#2A2C29',
            borderWidth: 2,
          }}
          onChangeText={(value) => {
            setLastNameInputValue(value);
          }}
          value={lastNameInputValue}
          onFocus={handleLastNameFocus}
          onBlur={handleLastNameBlur}
          selectionColor="#2a80b9"
        />
        <Text style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
          Country
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
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
              borderColor: '#2A2C29',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                flex: 10,
                marginLeft: 15,
              }}></Text>
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
      </ScrollView>
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
        }}>
        <Pressable
          onPressIn={handleContinuePressIn}
          onPressOut={handleContinuePressOut}
          onPress={() => {}}
          disabled={
            !emailAddressInputValue ||
            !firstNameInputValue ||
            !lastNameInputValue
          }
          style={{
            marginTop: 'auto',
            marginBottom: 40,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              !emailAddressInputValue ||
              !firstNameInputValue ||
              !lastNameInputValue
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

                      setCountry(countryData);
                    }}
                  />
                ))}
            </ScrollView>
          </View>
        }
      />
    </View>
  );
}
