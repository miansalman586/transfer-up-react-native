import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StatusBar,
  Text,
  Pressable,
  Alert,
  Image
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Entypo from 'react-native-vector-icons/Entypo';

import ScreenLoader from '../components/ScreenLoader';
import GoBackTopBar from '../components/GoBackTopBar';
import httpRequest from '../utils/httpRequest';

export default function LoginScreen({ route, navigation }) {

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
    handleEmailAddressBlur();
    handlePasswordBlur();
    
    handleLoginRelease();

    setIsLoading(true);

    let result = await httpRequest('token/customer', 'post', {
      emailAddress: emailAddressInputValue,
      password: passwordInputValue
     }, false, setIsLoading, navigation, true);

      if (result.status == 200) {
    result = await result.json();

        await SecureStore.setItemAsync('JwtToken', result.token);
        navigation.navigate('HomeTab');
      } else {
    result = await result.json();

        if(result.message == 'Your account is not verified yet.' || result.message == "Your account is in process for verification.") {
          navigation.navigate('RegisterSuccess', {
            id: 2
          });
        } else if (result.message == 'Your account is blocked. Please contact customer care.') {
          navigation.navigate('RegisterSuccess', {
            id: 3
          });
        } else {
          Alert.alert('Error', result.message)
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
          <GoBackTopBar navigation={navigation} callback={()=>{
            navigation.navigate('OnBoarding');
          }} />

              <StatusBar barStyle="light-content" />
              <View style={{flexDirection:'row', marginBottom:20, marginTop:20, textAlign: 'center',justifyContent:'center'}}>
      <Image
            style={{   width: 48, height: 42, marginRight:15}}
            source={require('../assets/icons/transfer-up-theme.png')}
          />
            <Text
              style={{
                color: '#2a80b9',
                fontSize: 30,
                marginTop:2,
                fontWeight: 'bold',
                marginBottom: 30,
              }}>
              TRANSFERUP
            </Text>
      </View>
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login
          </Text>
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
                  marginTop: 30,
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
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
