import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
  Modal,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import Icon from 'react-native-vector-icons/FontAwesome5';

import httpRequest from '../utils/httpRequest';

import pickImage from '../utils/pickImage';

import { useState, useEffect } from 'react';

export default function MerchantRequestDetailScreen({ route, navigation }) {
  const { requestData } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [isRejectPressed, setIsRejectPressed] = useState(false);
  const [isApprovePressed, setIsApprovePressed] = useState(false);

  const handleRejectPressIn = () => {
    setIsRejectPressed(true);
  };

  const handleRejectRelease = () => {
    setIsRejectPressed(false);
  };

  const handleApprovePressIn = () => {
    setIsApprovePressed(true);
  };

  const handleApproveRelease = () => {
    setIsApprovePressed(false);
  };

  const onFocus = () => {};

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener().remove();
    };
  });

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            paddingRight: 20,
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
                source={{
                  uri: requestData.ProfilePic,
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
              {requestData.FirstName} {requestData.LastName}
            </Text>
          </View>
          {requestData.RequestStatusId == 2 && (
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                backgroundColor: '#13150F',
              }}>
              <Pressable
                onPressIn={handleApprovePressIn}
                onPressOut={handleApproveRelease}
                onPress={() => {
                  handleApproveRelease();
                  httpRequest(
                    'update-transaction-request-status',
                    'post',
                    {
                      RequestId: requestData.RequestId,
                      RequestStatusId: 3,
                    },
                    setIsLoading,
                    true,
                    navigation
                  ).then((response) => {
                    if (response.Success) {
                      navigation.goBack();
                    } else {
                      Alert.alert('Error', response.Message);
                    }
                  });
                }}
                style={{
                  marginTop: 'auto',
                  marginBottom: 20,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isApprovePressed ? 'white' : '#2a80b9',
                }}>
                <Text
                  style={{
                    color: isApprovePressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Approve
                </Text>
              </Pressable>
              <Pressable
                onPressIn={handleRejectPressIn}
                onPressOut={handleRejectRelease}
                onPress={() => {
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to reject this request?',
                    [
                      {
                        text: 'Reject',
                        style: 'destructive',
                        onPress: () => {
                          httpRequest(
                            'update-transaction-request-status',
                            'post',
                            {
                              RequestId: requestData.RequestId,
                              RequestStatusId: 5,
                            },
                            setIsLoading,
                        true,
                        navigation
                          ).then((response) => {
                            if (response.Success) {
                              navigation.goBack();
                            }
                          });
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                    ]
                  );
                }}
                style={{
                  fontSize: 18,
                  marginBottom: 40,
                  height: 52,
                  borderRadius: 52,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  backgroundColor: isRejectPressed ? '#FFBDBB' : '#13150F',
                  borderColor: '#FFBDBB',
                }}>
                <Text
                  style={{
                    color: isRejectPressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Reject
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
