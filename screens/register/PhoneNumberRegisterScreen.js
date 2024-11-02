import { View, TextInput, ScrollView, Text, Pressable } from 'react-native';

import GoBackTopBar from '../../components/GoBackTopBar';

import { useState, useRef , useEffect} from 'react';
import Swiper from 'react-native-swiper';

import ScreenLoader from '../../components/ScreenLoader';

import ErrorMessage from '../../components/ErrorMessage';

import httpRequest from '../../utils/httpRequest';


export default function PhoneNumberRegisterScreen({ route, navigation }) {

const [countries, setCountries] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] =
      useState(false);
    const [isCountryCodeInputFocused, setIsCountryCodeInputFocused] =
      useState(false);
    const [isPhoneNumberExistsError, setIsPhoneNumberExistsError] =
      useState(false);
      const [isCountryCodeError, setIsCountryCodeError] =
      useState(false);
    const phoneNumberRef = useRef(null);
    const [countryCodeInputValue, setCountryCodeInputValue] = useState('+');
    const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(null);
  
    const [isContinuePressed, setIsContinuePressed] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState(null);
  
    const handlePhoneNumberFocus = () => setIsPhoneNumberInputFocused(true);
    const handlePhoneNumberBlur = async () => {
      setIsPhoneNumberInputFocused(false);
    };
  
    const handleCountryCodeFocus = () => {
      setIsCountryCodeInputFocused(true);
    };
    const handleCountryCodeBlur = async () => {
      setIsCountryCodeInputFocused(false);
      handlePhoneNumberBlur();
  
      if (countryCodeInputValue.replace(/\+/g, '')) {
        if (!countries?.some(e=>e.countryCode == countryCodeInputValue)) {
          setIsCountryCodeError(true);
        } else {
          setIsCountryCodeError(false);
          setSelectedCountry(countries?.find(e=>e.countryCode == countryCodeInputValue));
        }
      } 
    };
  
    const handleContinuePressIn = () => setIsContinuePressed(true);
    const handleContinuePressOut = () => setIsContinuePressed(false);
  
    const handleContinue = async () => {
        handleContinuePressOut();
        if (
            phoneNumberInputValue
          ) {
            let result = await httpRequest('public/has-customer-phone-number?countryCode=' + encodeURIComponent(countryCodeInputValue) + '&phoneNumber=' + phoneNumberInputValue, 'get', null, false, setIsLoading, navigation, true);
            if (result.status == 200) {
              setIsPhoneNumberExistsError(true);
            } else {
              setIsPhoneNumberExistsError(false);

                navigation.navigate('PersonalDetailRegister', {
                    emailAddress: route.params.emailAddress,
                    password: route.params.password,
                    phoneNumber:  phoneNumberInputValue,
                    countries: countries,
                    country: selectedCountry
                })
            }
          }
    };


    useEffect(() => {

        httpRequest(
            'public/get-country',
            'get',
            null,
            false,
            null,
            navigation,
            true
          ).then(async countries => {
            countries = await countries.json();
            setCountries(countries);
          });
      
       
        return () => {
      
        };
      }, []);


  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation}  />

          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{  paddingHorizontal: 20 }}>
        <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Enter your phone number
                </Text>
              </View>
                <View style={{ }}>
                <View>
                <Text style={{ color: 'white' }}>Phone number</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={4}
                    style={{
                      flex: 1,
                      color: 'white',
                      fontSize: 18,
                      height: 50,
                      paddingLeft: 20,
                      paddingRight: 20,
                      marginRight: 20,
                      backgroundColor: '#2A2C29',
                      borderColor:
                      isCountryCodeError
                          ? '#FFBDBB'
                          : isCountryCodeInputFocused
                          ? '#2a80b9'
                          : '#2A2C29',
                      borderWidth: 2,
                      marginTop: 10,
                    }}
                    onChangeText={(value) => {
                      value = value.replace(/\+/g, '');
                      setCountryCodeInputValue('+' + value);

                      if (value.length === 3) {
                        phoneNumberRef.current.focus();
                      }

                      setIsPhoneNumberExistsError(false);

                    }}
                    value={countryCodeInputValue}
                    onFocus={handleCountryCodeFocus}
                    onBlur={handleCountryCodeBlur}
                    selectionColor="#2a80b9"
                  />
                  <TextInput
                    ref={phoneNumberRef}
                    keyboardType="numeric"
                    style={{
                      flex: 5,
                      color: 'white',
                      fontSize: 18,
                      height: 50,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: '#2A2C29',
                      borderColor: isPhoneNumberExistsError
                        ? '#FFBDBB'
                        : isPhoneNumberInputFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                      borderWidth: 2,
                      marginTop: 10,
                    }}
                    onChangeText={(value) => {
                      setPhoneNumberInputValue(value);
                    }}
                    value={phoneNumberInputValue}
                    onFocus={handlePhoneNumberFocus}
                    onBlur={handlePhoneNumberBlur}
                    selectionColor="#2a80b9"
                  />
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <ErrorMessage
                  flag={isCountryCodeError}
                  message={'Country code is invalid.'}
                />
                <ErrorMessage
                  flag={isPhoneNumberExistsError}
                  message={'Phone number already exists.'}
                />
              </View>
                </View>
              </View>

</ScrollView>
        
              <Pressable
            onPressIn={handleContinuePressIn}
            onPressOut={handleContinuePressOut}
            onPress={handleContinue}
            disabled={
              !phoneNumberInputValue ||
              isCountryCodeError 
            }
            style={{
              marginTop: 40,
              marginRight: 40,
              bottom: 40,
              left: 20,
              right: 20,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                !phoneNumberInputValue ||
              isCountryCodeError 
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
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
