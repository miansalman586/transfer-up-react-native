import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import formateDate from '../utils/formatDate';
import { useState } from 'react';

export default function CustomerInitiatedTransactionRequestItem({
  requestData,
  navigation,
  balanceData,
  balances,
  transferType,
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
        navigation.navigate('CustomerInitiatedTransactionRequestDetail', {
          requestId: requestData.RequestId,
          balanceData,
          balances,
          transferType,
        });
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
            uri: requestData.ProfilePic,
          }}
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
              {requestData.FirstName} {requestData.LastName}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>
              {requestData.Amount} {requestData.Currency}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
              {requestData.BankName} -{' '}
              {formateDate(new Date(requestData.UpdatedDate))}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
