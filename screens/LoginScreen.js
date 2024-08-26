import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import * as MerchantService from '../services/user/MerchantService';
import * as CustomerService from '../services/user/CustomerService';

import * as GlobalService from '../services/GlobalService';

export default function LoginScreen({ route, navigation }) {
  const { entityId } = route.params;

  const [isPasswordPressed, setisPasswordPressed] = useState(false);

  const handlePasswordPressIn = () => {
    setisPasswordPressed(true);
  };

  const handlePasswordRelease = () => {
    setisPasswordPressed(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);

  const [isPasswordInputFocused, setisPasswordInputFocused] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [isEmailAddressInputFocused, setIsEmailAddressInputFocused] =
    useState(false);
  const [emailAddressInputValue, setEmailAddressInputValue] = useState(null);
  const [isLoginPressed, setisLoginPressed] = useState(false);

  const handlePasswordFocus = () => setisPasswordInputFocused(true);

  const handlePasswordBlur = async () => {
    setisPasswordInputFocused(false);
  };
  const handleEmailAddressFocus = () => setIsEmailAddressInputFocused(true);
  const handleEmailAddressBlur = async () => {
    setIsEmailAddressInputFocused(false);
  };
  const handleLoginPressIn = () => setisLoginPressed(true);
  const handleLoginRelease = () => setisLoginPressed(false);

  const handleLogin = async () => {
    handleLoginRelease();

    if (entityId == 1) {
      let result = await MerchantService.login(
        emailAddressInputValue,
        passwordInputValue,
        null,
        null,
        setIsLoading,
        navigation
      );
      if (result.Success && result.StatusCode == 201) {
        if (result.Data.TwoStepVerificationId == 1) {
          navigation.navigate('OTP', {
            entityId,
            emailAddress: emailAddressInputValue,
            phoneNumber: result.Data.CountryCode + result.Data.PhoneNumber,
            callBack: async (emailOTP, smsOTP, setIsLoading) => {
              let result = await MerchantService.login(
                emailAddressInputValue,
                passwordInputValue,
                emailOTP,
                smsOTP,
                setIsLoading,
                navigation
              );
              if (
                result.Success &&
                result.StatusCode == 200 &&
                result.Data.AccountStatusId != 7
              ) {
                await GlobalService.login(navigation, result.Data.JwtToken);
              } else if (
                result.Success &&
                result.StatusCode == 200 &&
                result.Data.AccountStatusId == 7
              ) {
                navigation.goBack();
                Alert.alert('Error', result.Data.BlockedReason);
              } else {
                Alert.alert('Error', result.Message);
              }
            },
          });
        } else if (result.Data.TwoStepVerificationId == 2) {
          navigation.navigate('TwoStepVerificationNotification', {
            entityId,
            callBack: async (notificationCode, setIsLoading) => {
              let result = await MerchantService.login(
                emailAddressInputValue,
                passwordInputValue,
                null,
                null,
                setIsLoading,
                navigation,
                notificationCode
              );
              if (
                result.Success &&
                result.StatusCode == 200 &&
                result.Data.AccountStatusId != 7
              ) {
                await GlobalService.login(navigation, result.Data.JwtToken);
              } else if (
                result.Success &&
                result.StatusCode == 200 &&
                result.Data.AccountStatusId == 7
              ) {
                navigation.goBack();
                Alert.alert('Error', result.Data.BlockedReason);
              } else {
                Alert.alert('Error', result.Message);
              }
            },
          });
        } else if (result.Data.TwoStepVerificationId == 3) {
          navigation.navigate('TwoStepVerificationAuthentication', {
            entityId,
            callBack: async (setIsLoading) => {},
          });
        }
      } else {
        Alert.alert('Error', result.Message);
      }
    } else if (entityId == 2) {
      let result = await CustomerService.login(
        emailAddressInputValue,
        passwordInputValue,
        null,
        null,
        setIsLoading,
        navigation
      );
      if (result.Success && result.StatusCode == 201) {
        if (result.Data.TwoStepVerificationId == 1) {
          navigation.navigate('OTP', {
            entityId,
            emailAddress: emailAddressInputValue,
            phoneNumber: result.Data.CountryCode + result.Data.PhoneNumber,
            callBack: async (emailOTP, smsOTP, setIsLoading) => {
              try {
                let result = await CustomerService.login(
                  emailAddressInputValue,
                  passwordInputValue,
                  emailOTP,
                  smsOTP,
                  setIsLoading,
                  navigation
                );
                if (
                  result.Success &&
                  result.StatusCode == 200 &&
                  result.Data.AccountStatusId != 7
                ) {
                  await GlobalService.login(navigation, result.Data.JwtToken);
                } else if (
                  result.Success &&
                  result.StatusCode == 200 &&
                  result.Data.AccountStatusId == 7
                ) {
                  navigation.goBack();
                  Alert.alert('Error', result.Data.BlockedReason);
                } else {
                  Alert.alert('Error', result.Message);
                }
              } catch (e) {
                alert(e);
              }
            },
          });
        } else if (result.Data.TwoStepVerificationId == 2) {
          navigation.navigate('TwoStepVerificationNotification', {
            callback: async (notificationCode, setIsLoading) => {
              let result = await CustomerService.login(
                emailAddressInputValue,
                passwordInputValue,
                null,
                null,
                setIsLoading,
                navigation,
                notificationCode
              );
              if (
                result.Success &&
                result.StatusCode == 200 &&
                result.Data.AccountStatusId != 7
              ) {
                await GlobalService.login(navigation, result.Data.JwtToken);
              } else if (
                result.Success &&
                result.StatusCode == 200 &&
                result.Data.AccountStatusId == 7
              ) {
                navigation.goBack();
                Alert.alert('Error', result.Data.BlockedReason);
              } else {
                Alert.alert('Error', result.Message);
              }
            },
          });
        } else if (result.Data.TwoStepVerificationId == 3) {
          navigation.navigate('TwoStepVerificationAuthentication', {
            entityId,
            callBack: async (setIsLoading) => {},
          });
        }
      } else {
        Alert.alert('Error', result.Message);
      }
    }
  };

  const onFocus = async () => {
    setEmailAddressInputValue(null);
    setPasswordInputValue(null);
  };

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
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} goBackScreen="OnBoarding" />
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 20,
            }}>
            Login
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
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
                    borderColor: isEmailAddressInputFocused
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
                      borderColor: isPasswordInputFocused
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
                      secureTextEntry={passwordSecureTextEntry}
                      onChangeText={(value) => {
                        setPasswordInputValue(value);
                      }}
                      value={passwordInputValue}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      selectionColor="#2a80b9"
                    />
                    <Pressable
                      onPressIn={handlePasswordPressIn}
                      onPressOut={handlePasswordRelease}
                      onPress={() => {
                        setPasswordSecureTextEntry(!passwordSecureTextEntry);
                      }}>
                      {passwordSecureTextEntry && (
                        <Entypo
                          style={{ marginTop: 12, marginLeft: 5 }}
                          name="eye-with-line"
                          size={22}
                          color={isPasswordPressed ? 'white' : '#2a80b9'}
                        />
                      )}
                      {!passwordSecureTextEntry && (
                        <Entypo
                          style={{ marginTop: 12, marginLeft: 5 }}
                          name="eye"
                          size={22}
                          color={isPasswordPressed ? 'white' : '#2a80b9'}
                        />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
              <Pressable
                onPressIn={handleLoginPressIn}
                onPressOut={handleLoginRelease}
                onPress={handleLogin}
                disabled={!passwordInputValue || !emailAddressInputValue}
                style={{
                  marginTop: 25,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    !emailAddressInputValue || !passwordInputValue
                      ? '#2A2C29'
                      : isLoginPressed
                      ? 'white'
                      : '#2a80b9',
                }}>
                <Text
                  style={{
                    color: isLoginPressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Login
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
