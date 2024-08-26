import { View, ScrollView, Text, Pressable } from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';

import { useState, useEffect, useRef } from 'react';
import ScreenLoader from '../../../components/ScreenLoader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import TwoStepContentLoad from '../../../components/TwoStepContentLoad';

import BottomSheet from '../../../components/BottomSheet';
import RadioButton from '../../../components/RadionButton';
import Entypo from 'react-native-vector-icons/Entypo';

import * as GlobalService from '../../../services/GlobalService';

import * as CustomerSettingService from '../../../services/settings/CustomerSettingService';
import * as MerchantSettingService from '../../../services/settings/MerchantSettingService';

export default function TwoStepVerificationScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [twoStepVerification, setTwoStepVerification] = useState(null);
  const [twoStepVerificationId, setTwoStepVerificationId] = useState(
    global.settings.TwoStepVerificationId
  );

  const [isChangeMethodPressed, setIsChangeMethodPressed] = useState(false);

  const handleChangeMethodPressIn = () => {
    setIsChangeMethodPressed(true);
  };

  const handleChangeMethodRelease = () => {
    setIsChangeMethodPressed(false);
  };
  const bottomSheetModalRef = useRef(null);

  const onFocus = async () => {
    setTwoStepVerification(null);
    let result = await GlobalService.getTwoStepVerification(navigation);
    setTwoStepVerification(result.Data);
  };

  const [isTwoStepOTPPressed, setIsTwoStepOTPPressed] = useState(false);
  const [isTwoStepAppPressed, setIsTwoStepAppPressed] = useState(false);
  const [isTwoStepAuthPressed, setIsTwoStepAuthPressed] = useState(false);

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
            2-step verification
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 18, marginBottom: 40 }}>
                Manage how you complete 2-step verification. It's an extra layer
                of security on your account, on top of your password.
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ color: 'white' }}>
                  Your verification methods
                </Text>

                {twoStepVerification && (
                  <Pressable
                    onPress={() => {
                      bottomSheetModalRef.current.present();
                    }}
                    onPressIn={handleChangeMethodPressIn}
                    onPressOut={handleChangeMethodRelease}>
                    <Text
                      style={{
                        color: isChangeMethodPressed ? 'white' : '#2a80b9',
                        textDecorationLine: 'underline',
                      }}>
                      Change method
                    </Text>
                  </Pressable>
                )}
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: '#2A2C29',
                }}></View>
            </View>
            {!twoStepVerification && (
              <View style={{ flex: 'row' }}>
                <TwoStepContentLoad count={3} />
              </View>
            )}
            {twoStepVerification?.map((tsv, index) => (
              <Pressable
                key={index}
                onPressIn={() => {
                  if (tsv.TwoStepVerificationId == 1) {
                    setIsTwoStepOTPPressed(true);
                  } else if (tsv.TwoStepVerificationId == 2) {
                    setIsTwoStepAppPressed(true);
                  } else if (tsv.TwoStepVerificationId == 3) {
                    setIsTwoStepAuthPressed(true);
                  }
                }}
                onPressOut={() => {
                  if (tsv.TwoStepVerificationId == 1) {
                    setIsTwoStepOTPPressed(false);
                  } else if (tsv.TwoStepVerificationId == 2) {
                    setIsTwoStepAppPressed(false);
                  } else if (tsv.TwoStepVerificationId == 3) {
                    setIsTwoStepAuthPressed(false);
                  }
                }}
                style={{
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 20,
                  paddingRight: 20,
                  backgroundColor:
                    (tsv.TwoStepVerificationId == 1 && isTwoStepOTPPressed) ||
                    (tsv.TwoStepVerificationId == 2 && isTwoStepAppPressed) ||
                    (tsv.TwoStepVerificationId == 3 && isTwoStepAuthPressed)
                      ? '#2A2C29'
                      : '#13150F',
                }}
                onPress={() => {
                  if (tsv.TwoStepVerificationId == 1) {
                    navigation.navigate('TwoStepOTPCode');
                  } else if (tsv.TwoStepVerificationId == 2) {
                  } else if (tsv.TwoStepVerificationId == 3) {
                  }
                }}>
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
                    {tsv.TwoStepVerificationId == 3 && (
                      <Entypo name={'dial-pad'} size={26} color={'white'} />
                    )}
                    {tsv.TwoStepVerificationId == 1 && (
                      <MaterialCommunityIcons
                        name="message-outline"
                        size={28}
                        color="white"
                      />
                    )}
                    {tsv.TwoStepVerificationId == 2 && (
                      <Octicons name="device-mobile" size={28} color="white" />
                    )}
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
                        {tsv.TwoStepVerification}{' '}
                        {tsv.TwoStepVerificationId == twoStepVerificationId
                          ? '(default)'
                          : ''}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          marginTop: 10,
                          lineHeight: 24,
                        }}>
                        {tsv.Description}
                      </Text>
                      <Text
                        style={{
                          color: tsv.IsSecure ? '#2a80b9' : 'white',
                          fontSize: 14,
                          marginTop: 10,
                        }}>
                        {tsv.Secure}
                      </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Entypo
                        name="chevron-right"
                        size={26}
                        color={
                          (tsv.TwoStepVerificationId == 1 &&
                            isTwoStepOTPPressed) ||
                          (tsv.TwoStepVerificationId == 2 &&
                            isTwoStepAppPressed) ||
                          (tsv.TwoStepVerificationId == 3 &&
                            isTwoStepAuthPressed)
                            ? 'white'
                            : '#2a80b9'
                        }
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <BottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={['43%']}
            title={'Change default method'}
            description={
              "Choose the method you prefer to use for 2-step verification, and w'll use this one first."
            }
            content={
              <View>
                {twoStepVerification?.map((tsv, index) => (
                  <Pressable
                    key={index}
                    onPress={async () => {
                      bottomSheetModalRef.current.close();

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
                              let result =
                                await MerchantSettingService.setTwoStepVerification(
                                  tsv.TwoStepVerificationId,
                                  passcode,
                                  setIsLoading,
                                  navigation
                                );
                              if (!result.Success) {
                                setIsErrorPasscode(true);

                                if (errorCount >= 3) {
                                  await GlobalService.logout(
                                    navigation,
                                    global.entityId
                                  );
                                }

                                setErrorCount(errorCount + 1);
                              } else {
                                await GlobalService.logout(
                                  navigation,
                                  global.entityId
                                );
                              }
                            } else if (global.entityId == 2) {
                              let result =
                                await CustomerSettingService.setTwoStepVerification(
                                  tsv.TwoStepVerificationId,
                                  passcode,
                                  setIsLoading,
                                  navigation
                                );
                              if (!result.Success) {
                                setIsErrorPasscode(true);

                                if (errorCount >= 3) {
                                  await GlobalService.logout(
                                    navigation,
                                    global.entityId
                                  );
                                }

                                setErrorCount(errorCount + 1);
                              } else {
                                await GlobalService.logout(
                                  navigation,
                                  global.entityId
                                );
                              }
                            }
                          },
                        });
                      }
                    }}
                    style={{
                      paddingTop: 25,
                      paddingBottom: 10,
                      paddingRight: 25,
                      paddingLeft: 25,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{ color: 'white', fontSize: 18 }}>
                        {tsv.TwoStepVerification}
                      </Text>
                      <Text
                        style={{
                          color: tsv.IsSecure ? '#2a80b9' : 'white',
                          fontSize: 14,
                          marginTop: 10,
                        }}>
                        {tsv.Secure}
                      </Text>
                    </View>
                    <RadioButton
                      selected={
                        twoStepVerificationId == tsv.TwoStepVerificationId
                      }
                    />
                  </Pressable>
                ))}
              </View>
            }
          />
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
