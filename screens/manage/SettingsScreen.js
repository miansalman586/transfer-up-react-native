import { View, ScrollView, Text, Pressable, Alert } from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet from '../../components/BottomSheet';

import RadioButton from '../../components/RadionButton';

import ContentLoad from '../../components/ContentLoad';

import httpRequest from '../../utils/httpRequest';
import ScreenLoader from '../../components/ScreenLoader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as CustomerSettingService from '../../services/settings/CustomerSettingService';
import * as MerchantSettingService from '../../services/settings/MerchantSettingService';
import * as GlobalService from '../../services/GlobalService';

import { useState, useRef, useEffect } from 'react';

export default function SettingsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [appearances, setAppearances] = useState(null);

  const [appearance, setAppearance] = useState(global.settings?.AppearanceId);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['35%'];

  const [isNotificationsPressed, setIsNotificationsPressed] = useState(false);

  const handleNotificationsPressIn = () => {
    setIsNotificationsPressed(true);
  };

  const handleONotificationsRelease = () => {
    setIsNotificationsPressed(false);
  };

  const [isAppearancePressed, setIsAppearancePressed] = useState(false);

  const handleAppearancePressIn = () => {
    setIsAppearancePressed(true);
  };

  const handleAppearanceRelease = () => {
    setIsAppearancePressed(false);
  };

  const [isReportBugPressed, setIsReportBugPressed] = useState(false);

  const handleReportBugPressIn = () => {
    setIsReportBugPressed(true);
  };

  const handleReportBugRelease = () => {
    setIsReportBugPressed(false);
  };

  const [isAboutPressed, setIsAboutPressed] = useState(false);

  const handleAboutPressIn = () => {
    setIsAboutPressed(true);
  };

  const handleOAboutRelease = () => {
    setIsAboutPressed(false);
  };

  const [isAccountDetailsPressed, setIsAccountDetailsPressed] = useState(false);

  const handleAccountDetailsPressIn = () => {
    setIsAccountDetailsPressed(true);
  };

  const handleAccountDetailstRelease = () => {
    setIsAccountDetailsPressed(false);
  };

  const [isCloserAccountPressed, setIsCloserAccountPressed] = useState(false);

  const handleCloseAccountPressIn = () => {
    if (
      global.balances.some((e) => e.TotalAmount == 0.0) &&
      !global.balances.some((e) => e.IsPendingRequest)
    )
      setIsCloserAccountPressed(true);
  };

  const handleCloseAccountRelease = () => {
    setIsCloserAccountPressed(false);
  };

  const onFocus = async () => {
    setAppearances(null);
    let result = await GlobalService.getAppearance(navigation);
    setAppearances(result.Data);
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
            Settings
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ color: 'white' }}>General</Text>
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
              onPressIn={handleNotificationsPressIn}
              onPressOut={handleONotificationsRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isNotificationsPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('NotificationSettings');
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
                  <Ionicons
                    name="notifications-outline"
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
                        marginTop: 15,
                      }}>
                      Notifications
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isNotificationsPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            {!appearances && (
              <View style={{ flex: 'row' }}>
                <ContentLoad count={1} />
              </View>
            )}
            {appearances && (
              <Pressable
                onPressIn={handleAppearancePressIn}
                onPressOut={handleAppearanceRelease}
                style={{
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 20,
                  paddingRight: 20,
                  backgroundColor: isAppearancePressed ? '#2A2C29' : '#13150F',
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
                      flexDirection: 'row',
                      backgroundColor: '#2A2C29',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="moon-first-quarter"
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
                        Appearance
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          marginTop: 10,
                        }}>
                        {
                          appearances?.find((e) => e.AppearanceId == appearance)
                            ?.Appearance
                        }
                      </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Entypo
                        name="chevron-right"
                        size={26}
                        color={isAppearancePressed ? 'white' : '#2a80b9'}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
            <Pressable
              onPressIn={handleReportBugPressIn}
              onPressOut={handleReportBugRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isReportBugPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('Settings');
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
                  <MaterialCommunityIcons
                    name="comment-text-outline"
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
                        marginTop: 15,
                      }}>
                      Report a bug
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isReportBugPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleAboutPressIn}
              onPressOut={handleOAboutRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isAboutPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('Settings');
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
                  <AntDesign name="question" size={28} color="white" />
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
                      About
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isAboutPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>Account actions</Text>
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
              onPressIn={handleAccountDetailsPressIn}
              onPressOut={handleAccountDetailstRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isAccountDetailsPressed
                  ? '#2A2C29'
                  : '#13150F',
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
                  <Ionicons name="person-outline" size={28} color="white" />
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
                      {global.entityId == 1
                        ? 'Merchant details'
                        : global.entityId == 2
                        ? 'Customer details'
                        : ''}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                      {global.entityId == 1
                        ? 'View and edit your merchant information'
                        : global.entityId == 2
                        ? 'View and edit your customer information'
                        : ''}
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isAccountDetailsPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleCloseAccountPressIn}
              onPressOut={handleCloseAccountRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isCloserAccountPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                if (global.balances.some((e) => e.TotalAmount > 0.0)) {
                  Alert.alert('Alert', 'You have funds in your balance.');
                } else if (global.balances.some((e) => e.IsPendingRequest)) {
                  Alert.alert('Alert', 'You have a pending request.');
                } else {
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to close this account?',
                    [
                      {
                        text: 'Close',
                        style: 'destructive',
                        onPress: () => {
                          if (global.entityId == 1) {
                            httpRequest(
                              'update-merchant-account-status',
                              'post',
                              {
                                AccountStatusId: 8,
                              },
                              setIsLoading,
                              true,
                              navigation
                            ).then((response) => {
                              if (response.Success) {
                              }
                            });
                          } else if (global.entityId == 2) {
                            httpRequest(
                              'update-customer-account-status',
                              'post',
                              {
                                AccountStatusId: 8,
                              },
                              setIsLoading,
                              true,
                              navigation
                            ).then((response) => {
                              if (response.Success) {
                              }
                            });
                          }
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                    ]
                  );
                }
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
                  <AntDesign
                    name="closecircleo"
                    size={28}
                    color={
                      global.balances.some(
                        (e) => e.IsPendingRequest || e.TotalAmount > 0.0
                      )
                        ? '#636562'
                        : 'white'
                    }
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
                        color: global.balances.some(
                          (e) => e.IsPendingRequest || e.TotalAmount > 0.0
                        )
                          ? '#636562'
                          : 'white',
                        fontSize: 18,
                      }}>
                      Close account
                    </Text>
                    <Text
                      style={{
                        color: global.balances.some(
                          (e) => e.IsPendingRequest || e.TotalAmount > 0.0
                        )
                          ? '#636562'
                          : 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                      {global.entityId == 1
                        ? 'Close your merchant account'
                        : global.entityId == 2
                        ? 'Close your customer account'
                        : ''}
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={
                        global.balances.some(
                          (e) => e.IsPendingRequest || e.TotalAmount > 0.0
                        )
                          ? '#636562'
                          : isCloserAccountPressed
                          ? 'white'
                          : '#2a80b9'
                      }
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          </ScrollView>
          <BottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
            title={'Appearance'}
            content={
              <View>
                {appearances?.map((appr, index) => (
                  <Pressable
                    key={index}
                    onPress={async () => {
                      global.settings.AppearanceId = appr.AppearanceId;
                      setAppearance(global.settings.AppearanceId);

                      bottomSheetModalRef.current.close();

                      if (global.entityId == 1) {
                        await MerchantSettingService.setAppearance(
                          appr.AppearanceId,
                          setIsLoading,
                          navigation
                        );
                      } else if (global.entityId == 2) {
                        await CustomerSettingService.setAppearance(
                          appr.AppearanceId,
                          setIsLoading,
                          navigation
                        );
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
                        {appr.Appearance}
                      </Text>
                      {appr.Description && (
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          {appr.Description}
                        </Text>
                      )}
                    </View>
                    <RadioButton selected={appearance == appr.AppearanceId} />
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
