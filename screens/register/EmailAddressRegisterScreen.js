import { View, TextInput, ScrollView, Text, Pressable } from 'react-native';

import GoBackTopBar from '../../components/GoBackTopBar';

import { useState, useRef } from 'react';
import Swiper from 'react-native-swiper';

import ScreenLoader from '../../components/ScreenLoader';

import ErrorMessage from '../../components/ErrorMessage';

import httpRequest from '../../utils/httpRequest';
import Entypo from 'react-native-vector-icons/Entypo';


export default function EmailAddressRegisterScreen({ route, navigation }) {
    const [isNewPasswordErrorInput, setIsNewPasswordErrorInput] = useState(false);

    const [isNewPasswordInputFocused, setIsNewPasswordInputFocused] =
    useState(false);

    const [newPasswordSecureTextEntry, setNewPasswordSecureTextEntry] =
    useState(true);

    const isStrongPassword = (password) => {
        if (!password || password.trim().length < 8) {
          return false;
        }
        if (!/[A-Z]/.test(password)) {
          return false;
        }
        if (!/[a-z]/.test(password)) {
          return false;
        }
        if (!/\d/.test(password)) {
          return false;
        }
        if (!/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) {
          return false;
        }
        return true;
      };
  
  const [newPasswordInputValue, setNewPasswordInputValue] = useState('');

    const [isNewPasswordPressed, setIsNewPasswordPressed] = useState(false);

    const handleNewPasswordPressIn = () => {
      setIsNewPasswordPressed(true);
    };
  
    const handleONewPasswordPressOut = () => {
      setIsNewPasswordPressed(false);
    };

    const handleNewPasswordFocus = () => setIsNewPasswordInputFocused(true);
    const handleNewPasswordBlur = () => setIsNewPasswordInputFocused(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isEmailAddressErrorInput, setIsEmailAddressErrorInput] = useState(false);
  const [isEmailAddressInputFocused, setIsEmailAddressInputFocused] =
    useState(false);
  const [emailAddressInputValue, setEmailAddressInputValue] = useState('');
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleEmailAddressFocus = () => setIsEmailAddressInputFocused(true);
  const handleEmailAddressBlur = async () => {
    setIsEmailAddressInputFocused(false);
  }
  const handleContinuePressIn = () => setIsContinuePressed(true);
  const handleContinuePressOut = () => setIsContinuePressed(false);


  const handleContinue = async () => {
    handleContinuePressOut();
    if (emailAddressInputValue) {
        let result = await httpRequest('public/has-customer-email-address?emailAddress=' + emailAddressInputValue, 'get', null, false, setIsLoading, null, true);
        if (result.status == 404) {
          setIsEmailAddressErrorInput(false);
          navigation.navigate('PhoneNumberRegister', {
            emailAddress: emailAddressInputValue,
            password: newPasswordInputValue
          })
        } else {
          setIsEmailAddressErrorInput(true);
        }
    }
  
  };


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
                  Enter your email address
                </Text>
              </View>
                <View style={{ }}>
                  <View style={{  }}>
                    <Text style={{ color: 'white' }}>Email Address</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isEmailAddressErrorInput && emailAddressInputValue
                            ? '#FFBDBB'
                            : isEmailAddressInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                          setEmailAddressInputValue(value);
                        }}
                        value={emailAddressInputValue}
                        onFocus={handleEmailAddressFocus}
                        onBlur={handleEmailAddressBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <ErrorMessage
                      flag={isEmailAddressErrorInput && emailAddressInputValue}
                      message={
                        'Email address already exists.'
                      }
                    />
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                <Text style={{ color: 'white' }}>Password</Text>
                <View
                  style={{
                    height: 50,
                    paddingLeft: 5,
                    color: 'white',
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                    borderColor:
                      isNewPasswordErrorInput && newPasswordInputValue
                        ? '#FFBDBB'
                        : isNewPasswordInputFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    fontSize: 18,
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    style={{
                      color: 'white',
                      fontSize: 18,
                      flex: 10,
                      marginLeft: 15,
                    }}
                    secureTextEntry={newPasswordSecureTextEntry}
                    onChangeText={(value) => {
                      if (!isStrongPassword(value)) {
                        setIsNewPasswordErrorInput(true);
                      } else {
                        setIsNewPasswordErrorInput(false);
                      }

                      setNewPasswordInputValue(value);
                    }}
                    value={newPasswordInputValue}
                    onFocus={handleNewPasswordFocus}
                    onBlur={handleNewPasswordBlur}
                    selectionColor="#2a80b9"
                  />
                  <Pressable
                    onPressIn={handleNewPasswordPressIn}
                    onPressOut={handleONewPasswordPressOut}
                    onPress={() => {
                      setNewPasswordSecureTextEntry(
                        !newPasswordSecureTextEntry
                      );
                    }}>
                    {newPasswordSecureTextEntry && (
                      <Entypo
                        style={{ marginTop: 12, marginLeft: 5 }}
                        name="eye-with-line"
                        size={22}
                        color={isNewPasswordPressed ? 'white' : '#2a80b9'}
                      />
                    )}
                    {!newPasswordSecureTextEntry && (
                      <Entypo
                        style={{ marginTop: 12, marginLeft: 5 }}
                        name="eye"
                        size={22}
                        color={isNewPasswordPressed ? 'white' : '#2a80b9'}
                      />
                    )}
                  </Pressable>
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <ErrorMessage
                  flag={isNewPasswordErrorInput && newPasswordInputValue}
                  message={
                    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.'
                  }
                />
              </View>
              </View>

</ScrollView>
        
          <Pressable
            onPressIn={handleContinuePressIn}
            onPressOut={handleContinuePressOut}
            onPress={handleContinue}
            disabled={
              !emailAddressInputValue||
              isNewPasswordErrorInput ||
              !newPasswordInputValue 
            }
            style={{
              position: 'absolute',
              bottom: 40,
              left: 20,
              right: 20,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                !emailAddressInputValue ||
                isNewPasswordErrorInput ||
                !newPasswordInputValue 
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
