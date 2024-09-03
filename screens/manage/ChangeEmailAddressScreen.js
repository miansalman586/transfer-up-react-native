import {
  View,
  TextInput,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';

import { useState } from 'react';

import ScreenLoader from '../../../components/ScreenLoader';
import Entypo from 'react-native-vector-icons/Entypo';

import * as CustomerService from '../../../services/user/CustomerService';
import * as MerchantService from '../../../services/user/MerchantService';
import * as GlobalService from '../../../services/GlobalService';

import ErrorMessage from '../../../components/ErrorMessage';

export default function ChangeEmailAddressScreen({ navigation }) {
  const [isCurrentPasswordPressed, setIsCurrentPasswordPressed] =
    useState(false);

  const handleCurrentPasswordPressIn = () => {
    setIsCurrentPasswordPressed(true);
  };

  const handleOCurrentPasswordRelease = () => {
    setIsCurrentPasswordPressed(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [currentPasswordSecureTextEntry, setCurrentPasswordSecureTextEntry] =
    useState(true);
  const [isCurrentPasswordErrorInput, setIsCurrentPasswordErrorInput] =
    useState(false);

  const [isEmailAddressErrorInput, setIsEmailAddressErrorInput] =
    useState(false);

  const [isCurrentPasswordInputFocused, setIsCurrentPasswordInputFocused] =
    useState(false);
  const [currentPasswordInputValue, setCurrentPasswordInputValue] =
    useState('');
  const [isEmailAddressInputFocused, setIsEmailAddressInputFocused] =
    useState(false);
  const [emailAddressInputValue, setEmailAddressInputValue] = useState(null);
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleCurrentPasswordFocus = () =>
    setIsCurrentPasswordInputFocused(true);

  const handleCurrentPasswordBlur = async () => {
    setIsCurrentPasswordInputFocused(false);

    if (currentPasswordInputValue) {
      if (global.entityId == 1) {
        let data = await MerchantService.verifyPassword(
          currentPasswordInputValue,
          setIsLoading,
          navigation
        );
        if (data.Success) {
          setIsCurrentPasswordErrorInput(false);
        } else {
          setIsCurrentPasswordErrorInput(true);
        }
      } else if (global.entityId == 2) {
        let data = await CustomerService.verifyPassword(
          currentPasswordInputValue,
          setIsLoading,
          navigation
        );
        if (data.Success) {
          setIsCurrentPasswordErrorInput(false);
        } else {
          setIsCurrentPasswordErrorInput(true);
        }
      }
    }
  };
  const handleEmailAddressFocus = () => setIsEmailAddressInputFocused(true);
  const handleEmailAddressBlur = async () => {
    setIsEmailAddressInputFocused(false);

    if (emailAddressInputValue) {
      if (global.entityId == 1) {
        let data = await MerchantService.verifyEmailAddress(
          emailAddressInputValue,
          setIsLoading,
          navigation
        );
        if (data.Success) {
          setIsEmailAddressErrorInput(false);
        } else {
          setIsEmailAddressErrorInput(true);
        }
      } else if (global.entityId == 2) {
        let data = await CustomerService.verifyEmailAddress(
          emailAddressInputValue,
          setIsLoading,
          navigation
        );
        if (data.Success) {
          setIsEmailAddressErrorInput(false);
        } else {
          setIsEmailAddressErrorInput(true);
        }
      }
    }
  };
  const handleContinuePressIn = () => setIsContinuePressed(true);
  const handleContinueRelease = () => setIsContinuePressed(false);

  const handleContinue = async () => {
    if (global.settings.AppSecurityId == 2) {
      navigation.navigate('UnlockPasscode2', {
        callBack: async (
          passcode,
          setIsLoading,
          setIsErrorPasscode,
          errorCount,
          setErrorCount
        ) => {
          if (global.entityId == 1) {
            let data = await MerchantService.changeEmailAddress(
              emailAddressInputValue,
              currentPasswordInputValue,
              passcode,
              setIsLoading,
              navigation
            );
            if (data.Success) {
              navigation.navigate('PrivacySecurity', {
                isToast: true,
                toastMessage: 'Email address updated for verification!',
              });
            } else {
              setIsErrorPasscode(true);

              if (errorCount >= 3) {
                await GlobalService.logout(navigation, global.entityId);
              }

              setErrorCount(errorCount + 1);
            }
          } else if (global.entityId == 2) {
            let data = await CustomerService.changeEmailAddress(
              emailAddressInputValue,
              currentPasswordInputValue,
              passcode,
              setIsLoading,
              navigation
            );
            if (data.Success) {
              navigation.navigate('PrivacySecurity', {
                isToast: true,
                toastMessage: 'Email address updated for verification!',
              });
            } else {
              setIsErrorPasscode(true);

              if (errorCount >= 3) {
                await GlobalService.logout(navigation, global.entityId);
              }

              setErrorCount(errorCount + 1);
            }
          }
        },
      });
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
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}>
            Change your email address
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>
                Enter the email address you'd like to use with your account.
              </Text>
              <View>
                <Text style={{ color: 'white' }}>Email address</Text>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                      isEmailAddressErrorInput && emailAddressInputValue
                        ? '#FFBDBB'
                        : isEmailAddressInputFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
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
              <View style={{ marginRight: 20 }}>
                <ErrorMessage
                  flag={isEmailAddressErrorInput && emailAddressInputValue}
                  message={'Email address already exists.'}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
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
                      onPressOut={handleOCurrentPasswordRelease}
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
              </View>
            </View>
          </ScrollView>
          <Pressable
            onPressIn={handleContinuePressIn}
            onPressOut={handleContinueRelease}
            onPress={handleContinue}
            disabled={
              isCurrentPasswordErrorInput ||
              !currentPasswordInputValue ||
              !emailAddressInputValue ||
              isEmailAddressErrorInput
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
                isCurrentPasswordErrorInput ||
                !emailAddressInputValue ||
                !currentPasswordInputValue ||
                isEmailAddressErrorInput
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
