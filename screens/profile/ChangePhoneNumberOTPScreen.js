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

export default function ChangePhoneNumberOTPScreen({ route, navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [phoneCode, setPhoneCode] = useState(Array(6).fill(''));
  const [newPhoneCode, setNewPhoneCode] = useState(Array(6).fill(''));

  const {
    newPhoneNumber,
    newCountryCode,
  } = route.params;

  const newPhoneRefs = useRef(
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

  const handlePress = async () => {
    if (
      newPhoneCode.every((digit) => digit !== '') &&
      phoneCode.every((digit) => digit !== '')
    ) {
      handleRelease();

      let result = await httpRequest('customer/change-phone-number', 'post', {
        oldOTPCode: parseInt(phoneCode.toString().replace(/,/g, '')),
        newOTPCode: parseInt(newPhoneCode.toString().replace(/,/g, '')),
        countryCode: newCountryCode,
        newPhoneNumber: parseInt(newPhoneNumber)
      }, true, setIsLoading);
      if (result.status == 200) {
        navigation.goBack();
      } else if (result.status == 400) {
        Alert.alert('Error', 'OTP Code expired or not found.');
      }
    }
  };

  const sendOTP = async () => {
   httpRequest('public/generate-otp-code?otpType=' + encodeURIComponent((global.user?.countryCode + global.user?.phoneNumber)), 'get', null, false, null);
  httpRequest('public/generate-otp-code?otpType=' + encodeURIComponent((newCountryCode + newPhoneNumber)), 'get', null, false, null);
  };

  const onFocus = async () => {
    sendOTP();
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
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
                Enter the OTP sent to your existing Phone Number
              </Text>
              <View style={{ marginTop: 40, flexDirection: 'row' }}>
                {phoneCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    value={digit}
                    ref={newPhoneRefs.current[index]}
                    onChangeText={(value) =>
                      handleCodeChange(
                        phoneCode,
                        setPhoneCode,
                        newPhoneRefs.current,
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
                      paddingLeft: 20,
                      fontSize: 20,
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
                {newCountryCode + newPhoneNumber}
              </Text>
              <View style={{ marginTop: 20, flexDirection: 'row' }}>
                {newPhoneCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    value={digit}
                    ref={phoneRefs.current[index]}
                    onChangeText={(value) =>
                      handleCodeChange(
                        newPhoneCode,
                        setNewPhoneCode,
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
                      paddingLeft: 20,
                      fontSize: 20,
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
                  onPress={async () => {
                    await sendOTP();
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
                  newPhoneCode.every((digit) => digit !== '') &&
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
                  newPhoneCode.every((digit) => digit !== '') &&
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
