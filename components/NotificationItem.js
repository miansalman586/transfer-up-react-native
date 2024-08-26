import { View, Text, Image, Pressable } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import formateDate from '../utils/formatDate';

import { useState } from 'react';

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
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: isPressed ? '#2A2C29' : '#13150F',
      }}
      onPress={() => {}}>
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
              {notificationData.Subject}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
              }}>
              {formateDate(new Date(notificationData.CreatedDate))}
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              marginTop: 10,
              lineHeight: 25,
            }}>
            {notificationData.Description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
