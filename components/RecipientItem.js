import { View, Text, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useState } from 'react';

export default function RecipientItem({ navigation, recipientData }) {
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
      onPress={() => {
        navigation.navigate('RecipientDetail', {
          recipientId: recipientData.customerRecipientId,
        })
      }}
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: isPressed ? '#2A2C29' : '#13150F',
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
          <Icon
            name={
              recipientData.transferTypeId == 1
                ? 'bank'
                : recipientData.transferTypeId == 2
                ? 'paypal'
                : ''
            }
            size={27.5}
            color="white"
          />
        </View>
        <View style={{ marginTop: 3, flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                marginRight: 7,
                color: 'white',
                fontSize: 18,
              }}>
              {recipientData.fullName}
            </Text>
            <Text
              style={{
                color:
                'white',
                fontSize: 18,
              }}>
             {recipientData.currency}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
            <Text>{recipientData.transferType} - {recipientData.emailAddress}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
