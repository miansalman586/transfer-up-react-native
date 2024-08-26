import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useState } from 'react';

export default function TransferTypeItem2({
  transferTypeData,
  isDisabled,
  callback,
  close,
}) {
  return (
    <Pressable
      disabled={isDisabled}
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: '#13150F',
      }}
      onPress={() => {
        callback(transferTypeData);
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
          {(transferTypeData.TransferTypeId == 1 ||
            transferTypeData.TransferTypeId == 2) && (
            <FontAwesome
              name={
                transferTypeData.TransferTypeId == 1
                  ? 'bank'
                  : transferTypeData.TransferTypeId == 2
                  ? 'paypal'
                  : ''
              }
              size={23.5}
              color="white"
            />
          )}
          {transferTypeData.TransferTypeId == 3 && (
            <Image
              style={{ height: 26, width: 26 }}
              source={require('../assets/icons/transfer-wise.png')}
            />
          )}
          {transferTypeData.TransferTypeId == 5 && (
            <Image
              style={{ height: 36, width: 36 }}
              source={require('../assets/icons/apple-pay.png')}
            />
          )}
          {transferTypeData.TransferTypeId == 4 && (
            <Image
              style={{ height: 36, width: 36 }}
              source={require('../assets/icons/google-pay.png')}
            />
          )}
        </View>
        <View style={{ marginTop: 3, flex: 1 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop:
                  transferTypeData.TransferTypeId == 11 ||
                  transferTypeData.TotalTransaction ||
                  transferTypeData.AverageDuration
                    ? 0
                    : 15,
              }}>
              {transferTypeData.TransferType}
            </Text>
            {close && (
              <TouchableOpacity
                style={{ paddingLeft: 13, marginTop: 15 }}
                onPress={() => {
                  if (close) close();
                }}>
                <FontAwesome name="close" size={24} color="#2a80b9" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
            {transferTypeData.TransferTypeId == 11
              ? 'Instant Transfer'
              : transferTypeData.TotalTransaction
              ? transferTypeData.TotalTransaction + ' Transactions'
              : ''}
            {transferTypeData.AverageDuration
              ? ' - ' + transferTypeData.AverageDuration
              : ''}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
