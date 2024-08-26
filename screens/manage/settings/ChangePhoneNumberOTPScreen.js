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
import ScreenLoader from '../../../components/ScreenLoader';

import * as MerchantSettingService from '../../../services/settings/MerchantSettingService';
import * as CustomerSettingService from '../../../services/settings/CustomerSettingService';

import * as GlobalService from '../../../services/GlobalService';

import GoBackTopBar from '../../../components/GoBackTopBar';
import httpRequest from '../../../utils/httpRequest';

export default function ChangePhoneNumberOTPScreen({ route, navigation }) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [phoneCode, setPhoneCode] = useState(Array(6).fill(''));
  const [newPhoneCode, setNewPhoneCode] = useState(Array(6).fill(''));

  const {
    newPhoneNumber,
    newCountryCode,
    appSecurityData,
    cityId,
    address,
    zipCode,
    addressVerificationDocumentId,
    addressVerificationDocument,
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

      if (global.entityId == 1) {
        let result = await MerchantSettingService.changePhoneNumber(
          appSecurityData,
          phoneCode.join(''),
          newPhoneCode.join(''),
          newPhoneNumber,
          newCountryCode,
          cityId,
          address,
          zipCode,
          addressVerificationDocumentId,
          addressVerificationDocument,
          setIsLoading,
          navigation
        );
        if (result.Success) {
          await GlobalService.logout(navigation, global.entityId);
        } else {
          Alert.alert('Error', result.Message);
        }
      } else if (global.entityId == 2) {
        let result = await CustomerSettingService.changePhoneNumber(
          appSecurityData,
          phoneCode.join(''),
          newPhoneCode.join(''),
          newPhoneNumber,
          newCountryCode,
          cityId,
          address,
          zipCode,
          addressVerificationDocumentId,
          addressVerificationDocument,
          setIsLoading,
          navigation
        );
        if (result.Success) {
          await GlobalService.logout(navigation, global.entityId);
        } else {
          Alert.alert('Error', result.Message);
        }
      }
    }
  };

  const sendOTP = async () => {
    if (global.entityId == 1) {
      await MerchantSettingService.changePhoneNumberOTP(
        newPhoneNumber,
        newCountryCode,
        setIsLoading,
        navigation
      );
    } else if (global.entityId == 2) {
      await CustomerSettingService.changePhoneNumberOTP(
        newPhoneNumber,
        newCountryCode,
        setIsLoading,
        navigation
      );
    }
  };

  const onFocus = async () => {
    sendOTP();

    setPhoneNumber(global.countryCode + global.phoneNumber);
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
