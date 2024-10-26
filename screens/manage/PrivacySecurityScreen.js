import {
  View,
  ScrollView,
  Text,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomToast from '../../components/CustomToast';
import ScreenLoader from '../../components/ScreenLoader';

import Entypo from 'react-native-vector-icons/Entypo';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useState, useEffect, useRef } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import httpRequest from '../../utils/httpRequest';
import { getSetting, updateSetting } from '../../utils/common';

export default function PrivacySecurityScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [isPrivacyPressed, setIsPrivacyPressed] = useState(false);

const [isSyncPhoneContact, setIsSyncPhoneContact] = useState(false);

const [toastVisible, setToastVisible] = useState(false);
const [toastNessage, setToastMessage] = useState(null);

const showToast = (message) => {
  setToastMessage(message);
  setToastVisible(true);
};

const closeToast = () => {
  setToastVisible(false);
};


const setSyncPhoneContact = async () => {
  let setting =  await getSetting();
  setting.isSyncPhoneContact = !isSyncPhoneContact;
  await updateSetting(setting);
  setIsSyncPhoneContact(!isSyncPhoneContact);
}

  const handlePrivacyPressIn = () => {
    setIsPrivacyPressed(true);
  };

  const handlePrivacyRelease = () => {
    setIsPrivacyPressed(false);
  };

  const [isFindMeByPressed, setIsFindMeByPressed] = useState(false);

  const handleFindMeByPressIn = () => {
    setIsFindMeByPressed(true);
  };

  const handleFindMeByPressOut = () => {
    setIsFindMeByPressed(false);
  };

  const [isChangePasswordPressed, setIsChangePasswordPressed] = useState(false);

  const handleChangePasswordPressIn = () => {
    setIsChangePasswordPressed(true);
  };

  const handleChangePasswordPressOut = () => {
    setIsChangePasswordPressed(false);
  };

  const [isChangeEmailAddressPressed, setIsChangeEmailAddressPressed] = useState(false);

  const handleChangeEmailAddressPressIn = () => {
    setIsChangeEmailAddressPressed(true);
  };

  const handleChangeEmailAddressPressOut = () => {
    setIsChangeEmailAddressPressed(false);
  };

  const [isLogoutPressed, setIsLogoutPressed] = useState(false);

  const handleLogoutPressIn = () => {
    setIsLogoutPressed(true);
  };

  const handleLogoutRelease = () => {
    setIsLogoutPressed(false);
  };


  const onFocus =async () => {
    let setting=  await getSetting();
    setIsSyncPhoneContact(setting?.isSyncPhoneContact);
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
        
       
            <Pressable
              onPressIn={handleChangePasswordPressIn}
              onPressOut={handleChangePasswordPressOut}
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
                  navigation.navigate('ChangePassword', {
                    showToast: showToast
                  });
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
              onPressIn={handleChangeEmailAddressPressIn}
              onPressOut={handleChangeEmailAddressPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isChangeEmailAddressPressed
                  ? '#2A2C29'
                  : '#13150F',
              }}
              onPress={() => {
                  navigation.navigate('ChangeEmailAddress', {
                    showToast: showToast
                  });
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
                      Change email address
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                    {global.user?.emailAddress}
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isChangeEmailAddressPressed ? 'white' : '#2a80b9'}
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
                Alert.alert(
                  'Confirmation',
                  'Are you sure you want to logout?',
                  [
                    {
                      text: 'Close',
                      style: 'destructive',
                      onPress: async () => {
                     
             
                        let result = await httpRequest('customer/logout', 'put', null, true, setIsLoading);
                        if (result.success) {
        
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
              onPressIn={handleFindMeByPressIn}
              onPressOut={handleFindMeByPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isFindMeByPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={async () => {
                navigation.navigate('FindMeBy');
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
                      }}>
                     Find me by
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                  Set how people on TransferUp can find you to send money.
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isFindMeByPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor:  '#13150F',
              }}
              onPress={() => {

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
            name="people"
            size={28}
            color={ 'white'}
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
                    Sync your contacts
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                 Send from your contacts who have a TransferUp account
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Switch
                      trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                      thumbColor={isSyncPhoneContact ? '#13150F' : '#13150F'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={setSyncPhoneContact}
                      value={isSyncPhoneContact}
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
                      Privacy policy
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
          </ScrollView>
      
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
