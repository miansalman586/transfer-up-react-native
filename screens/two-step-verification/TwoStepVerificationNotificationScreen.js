import { View, Pressable, Text } from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';
import ScreenLoader from '../../components/ScreenLoader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useState, useEffect } from 'react';

export default function TwoStepVerificationNotificationScreen({
  route,
  navigation,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { callback } = route.params;

  const [notificationCode, setNorificationCode] = useState(null);

  const [isNoItsPressed, setIsNoItsPressed] = useState(false);

  const handleNoItsPressIn = () => {
    setIsNoItsPressed(true);
  };

  const handleNoItsRelease = () => {
    setIsNoItsPressed(false);
  };

  const [isYesItsPressed, setIsYesItsPressed] = useState(false);

  const handleYesItsPressIn = () => {
    setIsYesItsPressed(true);
  };

  const handleYesItsRelease = () => {
    setIsYesItsPressed(false);
  };

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
              flex: 1,
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: 'center',
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome5 name="exclamation" size={180} color="#2a80b9" />
            </View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 32,
                textAlign: 'center',
                marginTop: 40,
              }}>
              DO YOU WANT TO APPROVE THIS LOGIN?
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 20,
              }}>
              Someone's trying to log in to your account. All look Ok?
            </Text>
          </View>
          <View
            style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
            <Pressable
              onPress={() => {
                handleYesItsRelease();

                callback(notificationCode, setIsLoading);
              }}
              onPressIn={handleYesItsPressIn}
              onPressOut={handleYesItsRelease}
              style={{
                marginTop: 25,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isYesItsPressed ? 'white' : '#2a80b9',
              }}>
              <Text
                style={{
                  color: isYesItsPressed ? 'black' : 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Yes, it's me
              </Text>
            </Pressable>
            <Pressable
              onPressIn={handleNoItsPressIn}
              onPressOut={handleNoItsRelease}
              style={{
                fontSize: 18,
                marginBottom: 20,
                marginTop: 20,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                backgroundColor: isNoItsPressed ? '#2a80b9' : '#13150F',
                borderColor: '#2a80b9',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                No, it's not me
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
