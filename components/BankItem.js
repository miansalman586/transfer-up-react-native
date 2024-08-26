import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import { useState } from 'react';

export default function BankItem({ entityId, bankData, navigation }) {
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
        if (bankData.AccountStatusId == 4 || bankData.AccountStatusId == 6) {
          navigation.navigate('AddBank', {
            bankId: bankData.BankId,
            entityId,
            title: 'Edit bank',
          });
        } else if (
          bankData.AccountStatusId == 1 ||
          bankData.AccountStatusId == 2 ||
          bankData.AccountStatusId == 5 ||
          bankData.AccountStatusId == 7 ||
          bankData.AccountStatusId == 8
        ) {
          navigation.navigate('BankDetail', {
            bankId: bankData.BankId,
            entityId,
          });
        }
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
              {bankData.BankName}
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
              {bankData.IsPrimary ? 'Primary' : bankData.AccountStatus} -{' '}
              {bankData.IBAN.substr(0, 12)}
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
