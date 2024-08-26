import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import ScreenLoader from '../../components/ScreenLoader';

import GoBackTopBar from '../../components/GoBackTopBar';
import httpRequest from '../../utils/httpRequest';

export default function TwoStepVerificationAuthenticationScreen({ route, navigation }) {
  const [emailAddress, setEmailAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailCode, setEmailCode] = useState(Array(6).fill(''));
  const [phoneCode, setPhoneCode] = useState(Array(6).fill(''));

  const { callBack } = route.params;

  const emailRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );
  const phoneRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    if (
      emailCode.every((digit) => digit !== '') &&
      phoneCode.every((digit) => digit !== '')
    ) {
      handleRelease();
      callBack(emailCode.join(''), phoneCode.join(''), setIsLoading);
    }
  };

  const sendOTP = async () => {
    const EmailAddress = global.emailAddress ?? route.params.emailAddress;
    setEmailAddress(EmailAddress);

    if (route.params.entityId == 1 || global.entityId == 1) {
      await httpRequest(
        'generate-merchant-otp-code',
        'post',
        { EmailAddress },
        setIsLoading,
        false,
        navigation
      );
    } else if (route.params.entityId == 2 || global.entityId == 2) {
      await httpRequest(
        'generate-customer-otp-code',
        'post',
        { EmailAddress },
        setIsLoading,
        false,
        navigation
      );
    }
  };

  const onFocus = async () => {
    sendOTP();

    if (global.countryCode && global.phoneNumber) {
      setPhoneNumber(global.countryCode + global.phoneNumber);
    } else {
      setPhoneNumber(route.params.phoneNumber);
    }
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, []);

  const handleCodeChange = (codeArray, setCodeArray, refs, index, value) => {
    setCodeArray((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;

      if (index < 5 && value !== '') {
        refs[index + 1].current.focus();
      }

      return newCode;
    });
  };

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
            <View style={{ alignItems: 'center', marginTop: '25%' }}>
              <Text
                style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
                OTP Verification
              </Text>
              <Text style={{ fontSize: 16, marginTop: 40, color: 'white' }}>
                Enter the OTP sent to Email
              </Text>
              <Text
                style={{ marginTop: 5, color: 'white', fontWeight: 'bold' }}>
                {emailAddress}
              </Text>
              <View style={{ marginTop: 20, flexDirection: 'row' }}>
                {emailCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    value={digit}
                    ref={emailRefs.current[index]}
                    onChangeText={(value) =>
                      handleCodeChange(
                        emailCode,
                        setEmailCode,
                        emailRefs.current,
                        index,
                        value
                      )
                    }
                    selectionColor="#2a80b9"
                    keyboardType="numeric"
                    textContentType="numeric"
                    maxLength={1}
                    style={{
                      backgroundColor: '#2A2C29',
                      marginRight: 10,
                      paddingTop: 15,
                      paddingBottom: 15,
                      paddingLeft: 25,
                      paddingRight: 20,
                      flex: 1,
                      height: 60,
                      color: 'white',
                    }}
                  />
                ))}
              </View>
              <Text style={{ fontSize: 16, marginTop: 60, color: 'white' }}>
                Enter the OTP sent to Phone Number
              </Text>
              <Text
                style={{ marginTop: 5, color: 'white', fontWeight: 'bold' }}>
                {phoneNumber}
              </Text>
              <View style={{ marginTop: 20, flexDirection: 'row' }}>
                {phoneCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    value={digit}
                    ref={phoneRefs.current[index]}
                    onChangeText={(value) =>
                      handleCodeChange(
                        phoneCode,
                        setPhoneCode,
                        phoneRefs.current,
                        index,
                        value
                      )
                    }
                    selectionColor="#2a80b9"
                    keyboardType="numeric"
                    textContentType="numeric"
                    maxLength={1}
                    style={{
                      backgroundColor: '#2A2C29',
                      marginRight: 10,
                      paddingTop: 15,
                      paddingBottom: 15,
                      paddingLeft: 25,
                      paddingRight: 20,
                      flex: 1,
                      height: 60,
                      color: 'white',
                    }}
                  />
                ))}
              </View>
              <Text style={{ fontSize: 16, marginTop: 40, color: 'white' }}>
                Don't receive OTP?{' '}
                <TouchableOpacity
                  onPress={() => {
                    sendOTP();
                    Alert.alert('Success', 'OTP sent.');
                  }}>
                  <Text style={{ color: '#2a80b9', fontWeight: 'bold' }}>
                    RESEND
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </ScrollView>
          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handleRelease}
              onPress={handlePress}
              disabled={
                !(
                  emailCode.every((digit) => digit !== '') &&
                  phoneCode.every((digit) => digit !== '')
                )
              }
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: !(
                  emailCode.every((digit) => digit !== '') &&
                  phoneCode.every((digit) => digit !== '')
                )
                  ? '#2A2C29'
                  : isPressed
                  ? 'white'
                  : '#2a80b9',
              }}>
              <Text
                style={{
                  color: isPressed ? 'black' : 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
