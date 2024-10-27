import { View, TextInput, ScrollView, Text, Pressable } from 'react-native';

import GoBackTopBar from '../../components/GoBackTopBar';

import { useState } from 'react';

import ScreenLoader from '../../components/ScreenLoader';

import ErrorMessage from '../../components/ErrorMessage';

import Entypo from 'react-native-vector-icons/Entypo';
import httpRequest from '../../utils/httpRequest';

export default function ChangePasswordScreen({ route, navigation }) {
const {showToast} = route.params;

  const [isCurrentPasswordPressed, setIsCurrentPasswordPressed] =
    useState(false);

  const handleCurrentPasswordPressIn = () => {
    setIsCurrentPasswordPressed(true);
  };

  const handleOCurrentPasswordRPressOut = () => {
    setIsCurrentPasswordPressed(false);
  };

  const [isNewPasswordPressed, setIsNewPasswordPressed] = useState(false);

  const handleNewPasswordPressIn = () => {
    setIsNewPasswordPressed(true);
  };

  const handleONewPasswordPressOut = () => {
    setIsNewPasswordPressed(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [currentPasswordSecureTextEntry, setCurrentPasswordSecureTextEntry] =
    useState(true);
  const [newPasswordSecureTextEntry, setNewPasswordSecureTextEntry] =
    useState(true);

  const [isNewPasswordErrorInput, setIsNewPasswordErrorInput] = useState(false);
  const [isCurrentPasswordErrorInput, setIsCurrentPasswordErrorInput] =
    useState(false);

  const [isCurrentPasswordInputFocused, setIsCurrentPasswordInputFocused] =
    useState(false);
  const [currentPasswordInputValue, setCurrentPasswordInputValue] =
    useState('');
  const [isNewPasswordInputFocused, setIsNewPasswordInputFocused] =
    useState(false);
  const [newPasswordInputValue, setNewPasswordInputValue] = useState('');
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
  const handleNewPasswordFocus = () => setIsNewPasswordInputFocused(true);
  const handleNewPasswordBlur = () => setIsNewPasswordInputFocused(false);
  const handleContinuePressIn = () => setIsContinuePressed(true);
  const handleContinuePressOut = () => setIsContinuePressed(false);

  

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

  const handleContinue = async () => {
    handleContinuePressOut();

    let result = await httpRequest('customer/change-password', 'put', {
      password: newPasswordInputValue,
      oldPassword: currentPasswordInputValue
    }, true, setIsLoading);
    if (result.status == 200) {
      navigation.goBack();
      showToast('Password has been updated.');
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
              Change your password
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
                <Text style={{ color: 'white' }}>New password</Text>
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
              isNewPasswordErrorInput ||
              !newPasswordInputValue ||
              isCurrentPasswordErrorInput ||
              !currentPasswordInputValue 
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
                isNewPasswordErrorInput ||
                !newPasswordInputValue ||
                isCurrentPasswordErrorInput ||
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
