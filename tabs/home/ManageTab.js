import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import ScreenLoader from '../../components/ScreenLoader';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CustomToast from '../../components/CustomToast';
import PressableButton from '../../components/PressableButton';

import * as Clipboard from 'expo-clipboard';

import Entypo from 'react-native-vector-icons/Entypo';
import * as SecureStore from 'expo-secure-store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as GlobalService from '../../services/GlobalService';

import * as CustomerService from '../../services/user/CustomerService';
import * as MerchantService from '../../services/user/MerchantService';

import AntDesign from 'react-native-vector-icons/AntDesign';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import httpRequest from '../../utils/httpRequest';
import ItemLoader from '../../components/ItemLoader';

export default function ManageTab({ route, navigation }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastNessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };
  const [otherUserAccount, setOtherUserAccount] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const onFocus = async () => {
    setOtherUserAccount(null);
    if (global.entityId == 1) {
      let result = await MerchantService.getOtherCustomerAccount(navigation);

      if (result.Data) setOtherUserAccount(result.Data);
      else setOtherUserAccount({});
    } else if (global.entityId == 2) {
      let result = await CustomerService.getOtherCustomerAccount(navigation);

      if (result.Data) setOtherUserAccount(result.Data);
      else setOtherUserAccount({});
    }
  };

  const [isOtherAccountPressed, setIsOtherAccountPressed] = useState(false);

  const handleOtherAccountPressIn = () => {
    setIsOtherAccountPressed(true);
  };

  const handleOtherAccountRelease = () => {
    setIsOtherAccountPressed(false);
  };

  const [isSettingsPressed, setIsSettingsPressed] = useState(false);

  const handleSettingsPressIn = () => {
    setIsSettingsPressed(true);
  };

  const handleSettingsRelease = () => {
    setIsSettingsPressed(false);
  };

  const [isReportsPressed, setIsReportsPressed] = useState(false);

  const handleReportsPressIn = () => {
    setIsReportsPressed(true);
  };

  const handleReportsRelease = () => {
    setIsReportsPressed(false);
  };

  const [isHelpPressed, setIsHelpPressed] = useState(false);

  const handleHelpPressIn = () => {
    setIsHelpPressed(true);
  };

  const handleHelpRelease = () => {
    setIsHelpPressed(false);
  };

  const [isPrivacyPressed, setIsPrivacyPressed] = useState(false);

  const handlePrivacyPressIn = () => {
    setIsPrivacyPressed(true);
  };

  const handlePrivacyRelease = () => {
    setIsPrivacyPressed(false);
  };

  const [isAgreementsPressed, setIsAgreementsPressed] = useState(false);

  const handleAgreementsPressIn = () => {
    setIsAgreementsPressed(true);
  };

  const handleAgreementsRelease = () => {
    setIsAgreementsPressed(false);
  };

  const [isLogoutPressed, setIsLogoutPressed] = useState(false);

  const handleLogoutPressIn = () => {
    setIsLogoutPressed(true);
  };

  const handleLogoutRelease = () => {
    setIsLogoutPressed(false);
  };

  const [isNotificationsPressed, setIsNotificationsPressed] = useState(false);

  const handleNotificationsPressIn = () => {
    setIsNotificationsPressed(true);
  };

  const handleNotificationsPressOut = () => {
    setIsNotificationsPressed(false);
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
          <View
            style={{
              height: '13%',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
              marginLeft: 'auto',
            }}>
            <Pressable
              onPress={() => {

              }}
              onPressIn={handleNotificationsPressIn}
              onPressOut={handleNotificationsPressOut}
              style={{ marginTop: 40 }}>
              <Ionicons
                name="notifications-outline"
                size={32}
                color={isNotificationsPressed ? 'white' : '#2a80b9'}
              />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  pickImage()
                    .then((img) => {
                      if (img) {
                        setImageSize({ width: img.width, height: img.height });
                        setImageBase64(img.base64);
                        if (global.entityId == 1) {
                          httpRequest(
                            'update-merchant-account',
                            'post',
                            {
                              ProfilePic: img.base64,
                            },
                            setIsLoading
                          ).then((e) => {
                            if (e.Success) {
                              setImageUri(img.uri);
                            }
                          });
                        } else if (global.entityId == 2) {
                          httpRequest(
                            'update-customer-account',
                            'post',
                            {
                              ProfilePic: img.base64,
                            },
                            setIsLoading
                          ).then((e) => {
                            if (e.Success) {
                              setImageUri(img.uri);
                            }
                          });
                        }
                      }
                    })
                    .catch((e) => {
                      alert(e.toString());
                    });
                }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                  source={{
                    uri: global.profilePic,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    right: -2,
                    backgroundColor: '#2A2C29',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon name="camera" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 15,
                  color: 'white',
                  fontSize: 28,
                }}>
                {global.fullName}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 16,
                }}>
               Your customer account
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>Other accounts</Text>
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
            {!otherUserAccount && (
              <View style={{ flex: 'row' }}>
                <ItemLoader count={1} />
              </View>
            )}
            {otherUserAccount && (
              <Pressable
                onPressIn={handleOtherAccountPressIn}
                onPressOut={handleOtherAccountRelease}
                style={{
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 20,
                  paddingRight: 20,
                  backgroundColor: isOtherAccountPressed
                    ? '#2A2C29'
                    : '#13150F',
                }}
                onPress={() => {
                  handleOtherAccountRelease();

                  if (global.entityId == 1) {
                    if (
                      !(otherUserAccount.FirstName && otherUserAccount.LastName)
                    ) {
                      httpRequest(
                        'open-other-customer-account',
                        'get',
                        null,
                        setIsLoading,
                        true,
                        navigation
                      ).then((data) => {
                        if (data.Success) {
                          httpRequest(
                            'authenticate-other-customer',
                            'get',
                            null,
                            setIsLoading,
                            true,
                            navigation
                          ).then(async (data) => {
                            if (
                              data.Success &&
                              data.StatusCode == 200 &&
                              data.Data.AccountStatusId != 7
                            ) {
                              await SecureStore.setItemAsync(
                                'JwtToken',
                                data.Data.JwtToken
                              );
                              navigation.navigate('Home');
                            } else if (
                              result.Success &&
                              result.StatusCode == 200 &&
                              result.Data.AccountStatusId == 7
                            ) {
                              Alert.alert('Error', result.Data.BlockedReason);
                            } else {
                              Alert.alert('Error', data.Message);
                            }
                          });
                        }
                      });
                    } else {
                      httpRequest(
                        'authenticate-other-customer',
                        'get',
                        null,
                        setIsLoading,
                        true,
                        navigation
                      ).then(async (data) => {
                        if (
                          data.Success &&
                          data.StatusCode == 200 &&
                          data.Data.AccountStatusId != 7
                        ) {
                          await SecureStore.setItemAsync(
                            'JwtToken',
                            data.Data.JwtToken
                          );
                          navigation.navigate('Home');
                        } else if (
                          result.Success &&
                          result.StatusCode == 200 &&
                          result.Data.AccountStatusId == 7
                        ) {
                          Alert.alert('Error', result.Data.BlockedReason);
                        } else {
                          Alert.alert('Error', data.Message);
                        }
                      });
                    }
                  } else if (global.entityId == 2) {
                    if (
                      !(otherUserAccount.FirstName && otherUserAccount.LastName)
                    ) {
                      httpRequest(
                        'open-other-merchant-account',
                        'get',
                        null,
                        setIsLoading,
                        true,
                        navigation
                      ).then((data) => {
                        if (data.Success) {
                          httpRequest(
                            'authenticate-other-merchant',
                            'get',
                            null,
                            setIsLoading,
                            true,
                            navigation
                          ).then(async (data) => {
                            if (
                              data.Success &&
                              data.StatusCode == 200 &&
                              data.Data.AccountStatusId != 7
                            ) {
                              await SecureStore.setItemAsync(
                                'JwtToken',
                                data.Data.JwtToken
                              );
                              navigation.navigate('Home');
                            } else if (
                              result.Success &&
                              result.StatusCode == 200 &&
                              result.Data.AccountStatusId == 7
                            ) {
                              Alert.alert('Error', result.Data.BlockedReason);
                            } else {
                              Alert.alert('Error', data.Message);
                            }
                          });
                        }
                      });
                    } else {
                      httpRequest(
                        'authenticate-other-merchant',
                        'get',
                        null,
                        setIsLoading,
                        true,
                        navigation
                      ).then(async (data) => {
                        if (
                          data.Success &&
                          data.StatusCode == 200 &&
                          data.Data.AccountStatusId != 7
                        ) {
                          await SecureStore.setItemAsync(
                            'JwtToken',
                            data.Data.JwtToken
                          );
                          navigation.navigate('Home');
                        } else if (
                          result.Success &&
                          result.StatusCode == 200 &&
                          result.Data.AccountStatusId == 7
                        ) {
                          Alert.alert('Error', result.Data.BlockedReason);
                        } else {
                          Alert.alert('Error', data.Message);
                        }
                      });
                    }
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
                    {otherUserAccount?.FirstName && otherUserAccount?.LastName && (
                      <Image
                        style={{ width: 55, height: 55, borderRadius: 27.5 }}
                        source={{
                          uri: otherUserAccount?.ProfilePic,
                        }}
                      />
                    )}
                    {!otherUserAccount?.FirstName &&
                      !otherUserAccount?.LastName && (
                        <Icon name={'plus'} size={27.5} color="white" />
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
                          marginTop: !(
                            otherUserAccount.FirstName &&
                            otherUserAccount.LastName
                          )
                            ? 15
                            : 0,
                        }}>
                        {otherUserAccount.FirstName && otherUserAccount.LastName
                          ? otherUserAccount.FirstName +
                            ' ' +
                            otherUserAccount.LastName
                          : global.entityId == 1
                          ? 'Open customer account'
                          : global.entityId == 2
                          ? 'Open merchant account'
                          : ''}
                      </Text>
                      {otherUserAccount.FirstName && otherUserAccount.LastName && (
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            marginTop: 10,
                          }}>
                          {global.entityId == 1
                            ? 'Your customer account'
                            : global.entityId == 2
                            ? 'Your merchant account'
                            : ''}
                        </Text>
                      )}
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Entypo
                        name="chevron-right"
                        size={26}
                        color={isOtherAccountPressed ? 'white' : '#2a80b9'}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
            <View style={{ marginLeft: 20, marginTop: 40 }}>
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
              onPressIn={handleSettingsPressIn}
              onPressOut={handleSettingsRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isSettingsPressed ? '#2A2C29' : '#13150F',
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
                  <EvilIcons size={32} color="white" name="gear" />
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
                      Settings
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isSettingsPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPressIn={handleHelpPressIn}
              onPressOut={handleHelpRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isHelpPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {}}>
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
                  <AntDesign size={28} color="white" name="questioncircleo" />
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
                      Help
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isHelpPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
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
                navigation.navigate('PrivacySecurity', {
                  isToast: false,
                  toastMessage: null,
                });
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
                  <MaterialIcons size={27.5} color="white" name="security" />
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
                      Privacy and security
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
              onPressIn={handleAgreementsPressIn}
              onPressOut={handleAgreementsRelease}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isAgreementsPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {}}>
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
                      Our agreements
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isAgreementsPressed ? 'white' : '#2a80b9'}
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
                await GlobalService.logout(navigation, global.entityId);
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
                        marginTop: 15,
                      }}>
                      Logout
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
            <View
              style={{
                marginLeft: 20,
                marginTop: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                  Membership ID
                </Text>
                <View style={{ marginRight: 20 }}>
                  <PressableButton
                    text="Copy"
                    onPress={async () => {
                      await Clipboard.setStringAsync(
                        global.entityId == 1
                          ? 'M' + global.userId
                          : global.entityId == 2
                          ? 'C' + global.userId
                          : ''
                      );

                      showToast('Copied!');
                    }}
                  />
                </View>
              </View>
              <Text style={{ color: 'white', fontSize: 14 }}>
                {global.entityId == 1
                  ? 'M' + global.userId
                  : global.entityId == 2
                  ? 'C' + global.userId
                  : ''}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  marginTop: 30,
                  marginBottom: 20,
                }}>
                TransferUp v1.0.0
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
