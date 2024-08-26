import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import { useState } from 'react';

export default function BeneficiaryItem({ bankData, navigation, callback }) {
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
        callback(bankData);
      }}
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: isPressed ? '#2A2C29' : '#13150F',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            marginRight: 20,
            backgroundColor: '#2A2C29',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{ uri: bankData.Flag }}
        />
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
              {bankData.FirstName} {bankData.LastName}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>
              {bankData.CountryName}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
              {bankData.AccountStatus} - {bankData.BankName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: 'white',
              }}>
              {bankData.Currency}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
