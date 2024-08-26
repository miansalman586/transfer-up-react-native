import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';
import * as SecureStore from 'expo-secure-store';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import CustomToast from '../../components/CustomToast';

import ScreenLoader from '../../components/ScreenLoader';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from '../../components/BottomSheet';

import { useState, useEffect, useRef } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ContentLoad from '../../components/ContentLoad';

import * as MerchantService from '../../services/user/MerchantService';
import * as CustomerService from '../../services/user/CustomerService';

import * as GlobalService from '../../services/GlobalService';

import * as MerchantSettingService from '../../services/settings/MerchantSettingService';
import * as CustomerSettingService from '../../services/settings/CustomerSettingService';

export default function PrivacySecurityScreen({ route, navigation }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastNessage, setToastMessage] = useState(null);

  const [appSecurity, setAppSecurity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isRefresh, setIsRefresh] = useState(false);

  const [twoStepVerificationId, setTwoStepVerificationId] = useState(null);

  const [unverifiedEmailAddress, setUnverifiedEmailAddress] = useState(null);

  const { toastMessage } = route.params;

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  const [isPrivacyPressed, setIsPrivacyPressed] = useState(false);

  const handlePrivacyPressIn = () => {
    setIsPrivacyPressed(true);
  };

  const handlePrivacyRelease = () => {
    setIsPrivacyPressed(false);
  };

  const [isVerificationPressed, setIsVerificationPressed] = useState(false);

  const handleVerificationPressIn = () => {
    setIsVerificationPressed(true);
  };

  const handleVerificationRelease = () => {
    setIsVerificationPressed(false);
  };

  const [isAppSecurityPressed, setIsAppSecurityPressed] = useState(false);

  const handleAppSecurityPressIn = () => {
    setIsAppSecurityPressed(true);
  };

  const handleAppSecurityRelease = () => {
    setIsAppSecurityPressed(false);
  };

  const [isChangeEmailPressed, setIsChangeEmailPressed] = useState(false);

  const handleChangeEmailPressIn = () => {
    setIsChangeEmailPressed(true);
  };

  const handleChangeEmailRelease = () => {
    setIsChangeEmailPressed(false);
  };

  const [isChangePasswordPressed, setIsChangePasswordPressed] = useState(false);

  const handleChangePasswordPressIn = () => {
    setIsChangePasswordPressed(true);
  };

  const handleChangePasswordRelease = () => {
    setIsChangePasswordPressed(false);
  };

  const [isLogoutPressed, setIsLogoutPressed] = useState(false);

  const handleLogoutPressIn = () => {
    setIsLogoutPressed(true);
  };

  const handleLogoutRelease = () => {
    setIsLogoutPressed(false);
  };

  const [isSyncContactPressed, setIsSyncContactPressed] = useState(false);

  const handleSyncContactPressIn = () => {
    setIsSyncContactPressed(true);
  };

  const handleSyncContactRelease = () => {
    setIsSyncContactPressed(false);
  };

  const [isBiometricPressed, setIsBiometricPressed] = useState(false);

  const handleBiometricPressIn = () => {
    setIsBiometricPressed(true);
  };

  const handleBiometricRelease = () => {
    setIsBiometricPressed(false);
  };

  const onFocus = () => {
    setTwoStepVerificationId(global.settings?.TwoStepVerificationId);

    setAppSecurity(null);
    GlobalService.getAppSecurity(navigation).then((result) => {
      setAppSecurity(result.Data);
    });

    if (route.params.isToast) {
      showToast(toastMessage);
      route.params.isToast = false;
    }

    if (global.entityId == 1) {
      setUnverifiedEmailAddress(null);

      MerchantService.getUnverifiedEmailAddress(navigation).then((result) => {
        if (result.Data && result.Data.EmailAddress) {
          setUnverifiedEmailAddress(result.Data.EmailAddress);
        } else {
          setUnverifiedEmailAddress('-');
        }
      });
    } else if (global.entityId == 2) {
      setUnverifiedEmailAddress(null);

      CustomerService.getUnverifiedEmailAddress(navigation).then((result) => {
        if (result.Data && result.Data.EmailAddress) {
          setUnverifiedEmailAddress(result.Data.EmailAddress);
        } else {
          setUnverifiedEmailAddress('-');
        }
      });
    }
  };
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, [route.params]);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <CustomToast
            message={toastNessage}
            visible={toastVisible}
            onClose={closeToast}
          />
          <GoBackTopBar navigation={navigation} />
          <Text
            style={{
              color: 'white',
              paddingLeft: 20,
              paddingRight: 20,
              marginBottom: 20,
              fontSize: 28,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            Privacy and security
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ color: 'white' }}>Security</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                borderWidth: 1,
                marginLeft: 20,
                marginRight: 20,
                borderColor: '#2A2C29',
              }}></View>
            {!appSecurity && (
              <View style={{ flex: 'row' }}>
                <ContentLoad count={1} />
              </View>
            )}
            {appSecurity && (
              <Pressable
                onPressIn={handleAppSecurityPressIn}
                onPressOut={handleAppSecurityRelease}
                style={{
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 20,
                  paddingRight: 20,
                  backgroundColor: isAppSecurityPressed ? '#2A2C29' : '#13150F',
                }}
                onPress={() => {
                  bottomSheetModalRef.current.present();
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 27.5,
                      marginRight: 20,
                      backgroundColor: '#2A2C29',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {global.settings?.AppSecurityId == 1 && (
                      <Image
                        style={{ height: 32, width: 32 }}
                        source={require('../../assets/icons/face-id.png')}
                      />
                    )}
                    {global.settings?.AppSecurityId == 2 && (
                      <Entypo name={'dial-pad'} size={26} color={'white'} />
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
                        App Security
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          marginTop: 10,
                        }}>
                        {appSecurity
                          ?.find(
                            (e) =>
                              e.AppSecurityId == global.settings?.AppSecurityId
                          )
                          ?.Description?.replace(
                            'Biometric',
                            Platform.OS == 'ios'
                              ? 'Face ID'
                              : Platform.OS == 'android'
                              ? 'Touch ID'
                              : ''
                          )}
                      </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Entypo
                        name="chevron-right"
                        size={26}
                        color={isAppSecurityPressed ? 'white' : '#2a80b9'}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
            {!unverifiedEmailAddress && (
              <View style={{ flex: 'row' }}>
                <ContentLoad count={1} />
              </View>
            )}
            {unverifiedEmailAddress && (
              <Pressable
                onPressIn={handleChangeEmailPressIn}
                onPressOut={handleChangeEmailRelease}
                style={{
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 20,
                  paddingRight: 20,
                  backgroundColor: isChangeEmailPressed ? '#2A2C29' : '#13150F',
                }}
                onPress={() => {
                  navigation.navigate('ChangeEmailAddress');
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
                        Change your email address
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          marginTop: 10,
                        }}>
                        {unverifiedEmailAddress != '-'
                          ? unverifiedEmailAddress + ' (Unverified)'
                          : global.emailAddress + ' (Verified)'}
                      </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Entypo
                        name="chevron-right"
                        size={26}
                        color={isChangeEmailPressed ? 'white' : '#2a80b9'}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
            <Pressable
              onPressIn={handleChangePasswordPressIn}
              onPressOut={handleChangePasswordRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isChangePasswordPressed
                  ? '#2A2C29'
                  : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('ChangePassword');
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
                  <EvilIcons name="unlock" size={40} color="white" />
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
                      Change password
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                      ********
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isChangePasswordPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleVerificationPressIn}
              onPressOut={handleVerificationRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isVerificationPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('TwoStepVerification');
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="tablet-mobile-combo" size={26} color="white" />
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
                      2-step verification
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                      {twoStepVerificationId == 1
                        ? 'Action required'
                        : 'Status: On'}
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isVerificationPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleLogoutPressIn}
              onPressOut={handleLogoutRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isLogoutPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={async () => {
                handleLogoutRelease();

                Alert.alert(
                  'Logout everywhere',
                  'Are you sure you want to logout of your TransferUp account on all devices?\n\nKeep in mind --once you are logged out, you shall be asked to reset your password the next time you login.',
                  [
                    {
                      text: 'Confirm logout',
                      style: 'destructive',
                      onPress: async () => {
                        if (global.entityId == 1) {
                          let result = await MerchantService.logoutAll(
                            setIsLoading,
                            navigation
                          );
                          if (result.Success) {
                            await GlobalService.logout(
                              navigation,
                              global.entityId
                            );
                          } else {
                            Alert.alert('Error', result.Message);
                          }
                        } else if (global.entityId == 2) {
                          let result = await CustomerService.logoutAll(
                            setIsLoading,
                            navigation
                          );
                          if (result.Success) {
                            await GlobalService.logout(
                              navigation,
                              global.entityId
                            );
                          } else {
                            Alert.alert('Error', result.Message);
                          }
                        }
                      },
                    },
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                  ]
                );
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons size={27.5} color="white" name="logout" />
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
                      Logout of everywhere
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                      If you notice any suspicious activity log out of
                      TransferUp across all devices
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isLogoutPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>Privacy</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                borderWidth: 1,
                marginLeft: 20,
                marginRight: 20,
                borderColor: '#2A2C29',
              }}></View>
            <Pressable
              onPressIn={handlePrivacyPressIn}
              onPressOut={handlePrivacyRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isPrivacyPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign size={28} color="white" name="infocirlceo" />
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
                        marginTop: 15,
                      }}>
                      Privacy Policy
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isPrivacyPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleSyncContactPressIn}
              onPressOut={handleSyncContactRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isSyncContactPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('SyncContact');
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather name="eye" size={28} color="white" />
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
                        marginTop: 15,
                      }}>
                      Contacts on TransferUp
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isSyncContactPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleBiometricPressIn}
              onPressOut={handleBiometricRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isBiometricPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    marginRight: 20,
                    backgroundColor: '#2A2C29',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="idcard" size={28} color="white" />
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
                      Biometric data
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                      Allow TransferUp to store and use your selfie and ID for
                      automated verification
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Switch
                      trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                      thumbColor={true ? '#13150F' : '#13150F'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {}}
                      value={true}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          </ScrollView>
          <BottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={[
              global.settings?.AppSecurityId == 1
                ? '23%'
                : global.settings?.AppSecurityId == 2
                ? '30%'
                : '',
            ]}
            title={'App Security'}
            content={
              <View>
                {global.settings?.AppSecurityId == 1 && (
                  <Pressable
                    style={{
                      paddingTop: 20,
                      paddingBottom: 15,
                      paddingRight: 25,
                      paddingLeft: 25,
                    }}
                    onPress={() => {
                      navigation.navigate('Passcode', {
                        currentPasscode: null,
                      });

                      bottomSheetModalRef.current.close();
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: 55,
                          height: 55,
                          borderRadius: 27.5,
                          marginRight: 20,
                          backgroundColor: '#2A2C29',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Entypo name={'dial-pad'} size={26} color={'white'} />
                      </View>
                      <View
                        style={{
                          marginTop: 3,
                          flex: 1,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <View>
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            Switch to{' '}
                            {
                              appSecurity?.find((e) => e.AppSecurityId == 2)
                                ?.AppSecurity
                            }
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              marginTop: 10,
                            }}>
                            {
                              appSecurity?.find((e) => e.AppSecurityId == 2)
                                ?.Description
                            }
                          </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                          <Entypo
                            name="chevron-right"
                            size={26}
                            color={'#2a80b9'}
                          />
                        </View>
                      </View>
                    </View>
                  </Pressable>
                )}
                {global.settings?.AppSecurityId == 2 && (
                  <View>
                    <Pressable
                      style={{
                        paddingTop: 20,
                        paddingRight: 25,
                        paddingLeft: 25,
                      }}
                      onPress={() => {
                        navigation.navigate('ChangePasscode');

                        bottomSheetModalRef.current.close();
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            width: 55,
                            height: 55,
                            borderRadius: 27.5,
                            marginRight: 20,
                            backgroundColor: '#2A2C29',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Entypo name={'dial-pad'} size={26} color={'white'} />
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
                                marginTop: 10,
                              }}>
                              Change Passcode
                            </Text>
                          </View>
                          <View style={{ marginTop: 10 }}>
                            <Entypo
                              name="chevron-right"
                              size={26}
                              color={'#2a80b9'}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <Pressable
                      style={{
                        paddingTop: 20,
                        paddingBottom: 15,
                        paddingRight: 25,
                        paddingLeft: 25,
                      }}
                      onPress={async () => {
                        if (global.entityId == 1) {
                          let result =
                            await MerchantSettingService.setAppSecurity(
                              1,
                              'abc',
                              setIsLoading,
                              navigation
                            );
                          if (result.Success) {
                            global.settings.AppSecurityId = 1;

                            await SecureStore.setItemAsync(
                              'AppSecurityId',
                              '1'
                            );

                            setIsRefresh(!isRefresh);
                          } else {
                            Alert.alert('Error', result.Message);
                          }
                        } else if (global.entityId == 2) {
                          let result =
                            await CustomerSettingService.setAppSecurity(
                              1,
                              'abc',
                              setIsLoading,
                              navigation
                            );
                          if (result.Success) {
                            global.settings.AppSecurityId = 1;

                            await SecureStore.setItemAsync(
                              'AppSecurityId',
                              '1'
                            );

                            setIsRefresh(!isRefresh);
                          } else {
                            Alert.alert('Error', result.Message);
                          }
                        }

                        bottomSheetModalRef.current.close();
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            width: 55,
                            height: 55,
                            borderRadius: 27.5,
                            marginRight: 20,
                            backgroundColor: '#2A2C29',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{ height: 32, width: 32 }}
                            source={require('../../assets/icons/face-id.png')}
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
                            <Text style={{ color: 'white', fontSize: 18 }}>
                              Use{' '}
                              {appSecurity
                                ?.find((e) => e.AppSecurityId == 1)
                                ?.AppSecurity?.replace(
                                  'Biometric',
                                  Platform.OS == 'ios'
                                    ? 'Face ID'
                                    : Platform.OS == 'android'
                                    ? 'Touch ID'
                                    : ''
                                )}{' '}
                              instead
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 14,
                                marginTop: 10,
                              }}>
                              {appSecurity
                                ?.find((e) => e.AppSecurityId == 1)
                                ?.Description?.replace(
                                  'Biometric',
                                  Platform.OS == 'ios'
                                    ? 'Face ID'
                                    : Platform.OS == 'android'
                                    ? 'Touch ID'
                                    : ''
                                )}
                            </Text>
                          </View>
                          <View style={{ marginTop: 15 }}>
                            <Entypo
                              name="chevron-right"
                              size={26}
                              color={'#2a80b9'}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                )}
              </View>
            }
          />
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
