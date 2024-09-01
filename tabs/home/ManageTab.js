import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ScreenLoader from '../../components/ScreenLoader';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PressableButton from '../../components/PressableButton';

import * as Clipboard from 'expo-clipboard';

import Entypo from 'react-native-vector-icons/Entypo';

import * as SecureStore from 'expo-secure-store';

import AntDesign from 'react-native-vector-icons/AntDesign';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import ItemLoader from '../../components/ItemLoader';

import CustomToast from '../../components/CustomToast';

export default function ManageTab({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const onFocus = async () => {
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

  const handleSettingsPressOut = () => {
    setIsSettingsPressed(false);
  };


  const [isHelpPressed, setIsHelpPressed] = useState(false);

  const handleHelpPressIn = () => {
    setIsHelpPressed(true);
  };

  const handleHelpRelease = () => {
    setIsHelpPressed(false);
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


  const [toastVisible, setToastVisible] = useState(false);
  const [toastNessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  
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
             <CustomToast
            message={toastNessage}
            visible={toastVisible}
            onClose={closeToast}
          />
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
                {global.user.firstName + ' ' + global.user.lastName}
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
              <Text style={{ color: 'white' }}>Other account</Text>
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
           
              <View style={{ flex: 'row' }}>
                <ItemLoader count={1} />
              </View>
          
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
              onPressOut={handleSettingsPressOut}
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
                await SecureStore.deleteItemAsync('JwtToken');
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
                       'C' + global.user.id
                      );

                      showToast('Copied!');
                    }}
                  />
                </View>
              </View>
              <Text style={{ color: 'white', fontSize: 14 }}>
                {'C' + global.user.id}
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
