import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import formatDate from '../utils/formatDate';

import { useState } from 'react';

export default function SecurityItem({
  balances,
  currencies,
  securityData,
  navigation,
  param,
  callback,
}) {
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
        callback();
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
          source={{
            uri: global.currencies?.find(
              (e) => e.CurrencyId == securityData?.CurrencyId
            )?.Image,
          }}
        />
        <View style={{ marginTop: 3, flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: securityData.IsActive ? 'bold' : '',
              }}>
              {securityData.Description}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: securityData.IsActive ? 'bold' : '',
                color: securityData.IsActive ? '#9EE6A8' : 'white',
              }}>
              {securityData.IsActive ? '+' : ''}
              {securityData.Security} {securityData.Currency}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
              {securityData.MerchantSecurityStatus} -{' '}
              {formatDate(new Date(securityData.UpdatedDate))}
            </Text>
            {securityData.AdditionalMerchantSecurity && (
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  color: 'white',
                }}>
                {securityData.AdditionalMerchantSecurity}{' '}
                {securityData.Currency}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
