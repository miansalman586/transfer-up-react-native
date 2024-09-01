import { View, ScrollView, Text, Pressable, Alert } from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';

import AntDesign from 'react-native-vector-icons/AntDesign';

import ScreenLoader from '../../components/ScreenLoader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useState, useRef, useEffect } from 'react';
import httpRequest from '../../utils/httpRequest';

export default function SettingsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [isReportBugPressed, setIsReportBugPressed] = useState(false);

  const handleReportBugPressIn = () => {
    setIsReportBugPressed(true);
  };

  const handleReportBugPressOut = () => {
    setIsReportBugPressed(false);
  };

  const [isOurStoryPressed, setIsOurStoryPressed] = useState(false);

  const handleOurStoryPressIn = () => {
    setIsOurStoryPressed(true);
  };

  const handleOurStoryPressOut = () => {
    setIsOurStoryPressed(false);
  };

  const [isRateUsPressed, setIsRateUsPressed] = useState(false);

  const handleRateUsPressIn = () => {
    setIsRateUsPressed(true);
  };

  const handleRateUsPressOut = () => {
    setIsRateUsPressed(false);
  };

  const [isCloserAccountPressed, setIsCloserAccountPressed] = useState(false);

  const handleCloseAccountPressIn = () => {
      setIsCloserAccountPressed(true);
  };

  const handleCloseAccountPressOut = () => {
    setIsCloserAccountPressed(false);
  };

  const [isPrivacyPressed, setIsPrivacyPressed] = useState(false);

  const handlePrivacyPressIn = () => {
    setIsPrivacyPressed(true);
  };

  const handlePrivacyPressOut = () => {
    setIsPrivacyPressed(false);
  };


  const onFocus = async () => {

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
              onPressIn={handlePrivacyPressIn}
              onPressOut={handlePrivacyPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isPrivacyPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={() => {
                navigation.navigate('PrivacySecurity');
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
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>Account action</Text>
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
              onPressIn={handleCloseAccountPressIn}
              onPressOut={handleCloseAccountPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isCloserAccountPressed ? '#2A2C29' : '#13150F',
              }}
              onPress={async () => {
                Alert.alert(
                  'Confirmation',
                  'Are you sure you want to close this account?',
                  [
                    {
                      text: 'Close',
                      style: 'destructive',
                      onPress: async () => {
                     
                let result = await httpRequest('customer/update-account-status', 'put', {
                  accountStatusId: 4
                }, true, setIsLoading);
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
                  <AntDesign
                    name="closecircleo"
                    size={28}
                    color={
                    'white'
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
                        color:  'white',
                        fontSize: 18,
                      }}>
                      Close account
                    </Text>
                    <Text
                      style={{
                        color:
                          'white',
                        fontSize: 14,
                        marginTop: 10,
                      }}>
                    Close your customer account
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={
                         isCloserAccountPressed
                          ? 'white'
                          : '#2a80b9'
                      }
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>More</Text>
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
              onPressIn={handleRateUsPressIn}
              onPressOut={handleRateUsPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isRateUsPressed ? '#2A2C29' : '#13150F',
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
                  <MaterialCommunityIcons
                    name="star-outline"
                    size={30}
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
                    Rate us
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isRateUsPressed ? 'white' : '#2a80b9'}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
              <Pressable
              onPressIn={handleReportBugPressIn}
              onPressOut={handleReportBugPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isReportBugPressed ? '#2A2C29' : '#13150F',
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
              onPressIn={handleOurStoryPressIn}
              onPressOut={handleOurStoryPressOut}
              style={{
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 20,
                paddingRight: 20,
                backgroundColor: isOurStoryPressed ? '#2A2C29' : '#13150F',
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
                    name="book-outline"
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
                      Our story
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Entypo
                      name="chevron-right"
                      size={26}
                      color={isOurStoryPressed ? 'white' : '#2a80b9'}
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
