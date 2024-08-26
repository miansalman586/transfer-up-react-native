import { View, ScrollView, Text, Pressable } from 'react-native';
import GoBackTopBar from '../../../../components/GoBackTopBar';

import { useState, useEffect, useRef } from 'react';
import ScreenLoader from '../../../../components/ScreenLoader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';

export default function TwoStepOTPCodeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [isChangeEmailPressed, setIsChangeEmailPressed] = useState(false);

  const handleChangeEmailPressIn = () => {
    setIsChangeEmailPressed(true);
  };

  const handleChangeEmailRelease = () => {
    setIsChangeEmailPressed(false);
  };

  const [isChangeNumberPressed, setIsChangeNumberPressed] = useState(false);

  const handleChangeNumberPressIn = () => {
    setIsChangeNumberPressed(true);
  };

  const handleChangeNumberRelease = () => {
    setIsChangeNumberPressed(false);
  };

  const onFocus = async () => {};

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

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
              color: 'white',
              paddingLeft: 20,
              paddingRight: 20,
              marginBottom: 10,
              fontSize: 28,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            OTP Code
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 18, marginBottom: 40 }}>
                Manage the phone number and email address you use to receive OTP
                code for 2-step verification.
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ color: 'white' }}>Primary phone number</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('ChangePhoneNumber');
                  }}
                  onPressIn={handleChangeNumberPressIn}
                  onPressOut={handleChangeNumberRelease}>
                  <Text
                    style={{
                      color: isChangeNumberPressed ? 'white' : '#2a80b9',
                      textDecorationLine: 'underline',
                    }}>
                    Change
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: '#2A2C29',
                }}></View>
            </View>
            <Pressable
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingRight: 20,
                backgroundColor: '#13150F',
              }}
              onPress={() => {}}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    flexDirection: 'row',
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="message-outline"
                    size={28}
                    color="white"
                  />
                </View>
                <View
                  style={{
                    marginTop: 3,
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                      }}>
                      {global.countryCode + global.phoneNumber}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                        lineHeight: 24,
                      }}>
                      When OTP code is your default 2-step verification method,
                      w'll send a code here first.
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 40 }}>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ color: 'white' }}>Primary email address</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('ChangeEmailAddress');
                  }}
                  onPressIn={handleChangeEmailPressIn}
                  onPressOut={handleChangeEmailRelease}>
                  <Text
                    style={{
                      color: isChangeEmailPressed ? 'white' : '#2a80b9',
                      textDecorationLine: 'underline',
                    }}>
                    Change
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: '#2A2C29',
                }}></View>
            </View>
            <Pressable
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: '#13150F',
              }}
              onPress={() => {}}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    flexDirection: 'row',
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="email-open-outline"
                    size={32}
                    color="white"
                  />
                </View>
                <View
                  style={{
                    marginTop: 3,
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                      }}>
                      {global.emailAddress}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                        lineHeight: 24,
                      }}>
                      When OTP code is your default 2-step verification method,
                      w'll send a code here first.
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
