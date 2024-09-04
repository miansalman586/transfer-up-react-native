import { View, TextInput, ScrollView, Text, Pressable } from 'react-native';

import GoBackTopBar from '../../components/GoBackTopBar';

import { useState } from 'react';

import ScreenLoader from '../../components/ScreenLoader';

import ErrorMessage from '../../components/ErrorMessage';

import Entypo from 'react-native-vector-icons/Entypo';
import httpRequest from '../../utils/httpRequest';

export default function ChangeEmailAddressScreen({ route, navigation }) {
const {showToast} = route.params;

  const [isCurrentPasswordPressed, setIsCurrentPasswordPressed] =
    useState(false);

  const handleCurrentPasswordPressIn = () => {
    setIsCurrentPasswordPressed(true);
  };

  const handleOCurrentPasswordRPressOut = () => {
    setIsCurrentPasswordPressed(false);
  };

  const [isEmailAddressPressed, setIsEmailAddressPressed] = useState(false);

  const handleEmailAddressPressIn = () => {
    setIsEmailAddressPressed(true);
  };

  const handleOEmailAddressPressOut = () => {
    setIsEmailAddressPressed(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [currentPasswordSecureTextEntry, setCurrentPasswordSecureTextEntry] =
    useState(true);

  const [isEmailAddressErrorInput, setIsEmailAddressErrorInput] = useState(false);
  const [isCurrentPasswordErrorInput, setIsCurrentPasswordErrorInput] =
    useState(false);

  const [isCurrentPasswordInputFocused, setIsCurrentPasswordInputFocused] =
    useState(false);
  const [currentPasswordInputValue, setCurrentPasswordInputValue] =
    useState('');
  const [isEmailAddressInputFocused, setIsEmailAddressInputFocused] =
    useState(false);
  const [emailAddressInputValue, setEmailAddressInputValue] = useState('');
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleCurrentPasswordFocus = () =>
    setIsCurrentPasswordInputFocused(true);

  const handleCurrentPasswordBlur = async () => {
    setIsCurrentPasswordInputFocused(false);

    if (currentPasswordInputValue) {
      let result = await httpRequest('customer/verify-password?password=' + currentPasswordInputValue, 'get', null, true, setIsLoading);
      if (result.status == 200) {
        setIsCurrentPasswordErrorInput(false);
      } else {
        setIsCurrentPasswordErrorInput(true);
      }
    }
  };
  const handleEmailAddressFocus = () => setIsEmailAddressInputFocused(true);
  const handleEmailAddressBlur = async () => {
    setIsEmailAddressInputFocused(false);
  
    if (emailAddressInputValue) {
      let result = await httpRequest('customer/has-email-address?emailAddress=' + emailAddressInputValue, 'get', null, true, setIsLoading);
      if (result.status == 404) {
        setIsEmailAddressErrorInput(false);
      } else {
        setIsEmailAddressErrorInput(true);
      }
    }
  }
  const handleContinuePressIn = () => setIsContinuePressed(true);
  const handleContinuePressOut = () => setIsContinuePressed(false);

  const handleContinue = async () => {
    handleContinuePressOut();

    let result = await httpRequest('customer/change-email-address', 'put', {
      emailAddress: emailAddressInputValue,
      oldPassword: currentPasswordInputValue
    }, true, setIsLoading);
    if (result.status == 200) {
      navigation.goBack();
      showToast('Email verification link sent to this email address. This link is only valid for 20 minutes.');
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
          <GoBackTopBar navigation={navigation} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 20,
              }}>
              Change your email address
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <View>
                <Text style={{ color: 'white' }}>Current password</Text>
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
                      isCurrentPasswordErrorInput && currentPasswordInputValue
                        ? '#FFBDBB'
                        : isCurrentPasswordInputFocused
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
                    secureTextEntry={currentPasswordSecureTextEntry}
                    onChangeText={(value) => {
                      setCurrentPasswordInputValue(value);
                      setIsCurrentPasswordErrorInput(false);
                    }}
                    value={currentPasswordInputValue}
                    onFocus={handleCurrentPasswordFocus}
                    onBlur={handleCurrentPasswordBlur}
                    selectionColor="#2a80b9"
                  />
                  <Pressable
                    onPressIn={handleCurrentPasswordPressIn}
                    onPressOut={handleOCurrentPasswordRPressOut}
                    onPress={() => {
                      setCurrentPasswordSecureTextEntry(
                        !currentPasswordSecureTextEntry
                      );
                    }}>
                    {currentPasswordSecureTextEntry && (
                      <Entypo
                        style={{ marginTop: 12, marginLeft: 5 }}
                        name="eye-with-line"
                        size={22}
                        color={isCurrentPasswordPressed ? 'white' : '#2a80b9'}
                      />
                    )}
                    {!currentPasswordSecureTextEntry && (
                      <Entypo
                        style={{ marginTop: 12, marginLeft: 5 }}
                        name="eye"
                        size={22}
                        color={isCurrentPasswordPressed ? 'white' : '#2a80b9'}
                      />
                    )}
                  </Pressable>
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <ErrorMessage
                  flag={
                    isCurrentPasswordErrorInput && currentPasswordInputValue
                  }
                  message={'Password do not matched with current password.'}
                />
              </View>
              <View style={{ marginTop: 20 }}>
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
          </ScrollView>
          <Pressable
            onPressIn={handleContinuePressIn}
            onPressOut={handleContinuePressOut}
            onPress={handleContinue}
            disabled={
              isEmailAddressErrorInput ||
              isCurrentPasswordErrorInput ||
              !currentPasswordInputValue ||
              !emailAddressInputValue
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
                isEmailAddressErrorInput ||
                isCurrentPasswordErrorInput ||
                !emailAddressInputValue ||
                !currentPasswordInputValue
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
