import { View, Text, Image, Pressable } from 'react-native';


import { useState } from 'react';
import formatDate from '../utils/formatDate';

export default function NotificationItem({ notificationData, navigation }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handleRelease}
      style={{
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: isPressed ? '#2A2C29' : '#13150F',
      }}
      onPress={() => {
        navigation.navigate(notificationData.navigationScreen, JSON.parse(notificationData.navigationParam));
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            marginRight: 20,
            marginTop: 3,
            backgroundColor: '#2A2C29',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>
              {notificationData.notificationSubject}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
              }}>
                {formatDate(new Date(notificationData.createdDate))}
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              marginTop: 10,
              lineHeight: 25,
            }}>
            {notificationData.notificationMessage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
