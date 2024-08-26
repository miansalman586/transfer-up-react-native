import { View, Text, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useState } from 'react';

import formatDate from '../utils/formatDate';

export default function TransactionItem({ navigation, transactionData }) {
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
        navigation.navigate('TransactionDetail', {
          transactionId: transactionData.transactionId,
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
              transactionData.transactionTypeId == 1 &&
              transactionData.transferTypeId != 3
                ? 'arrow-up'
                : transactionData.transactionTypeId == 2 &&
                  transactionData.transferTypeId != 3
                ? 'arrow-down'
                : transactionData.transferTypeId == 3
                ? 'arrows-alt-h'
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
                fontWeight:
                  transactionData.transactionStatusId == 3 ? 'bold' : '',
                fontSize: 18,
              }}>
              {transactionData.name}
            </Text>
            <Text
              style={{
                color:
                  transactionData.transactionTypeId == 1 &&
                  transactionData.transactionStatusId == 3
                    ? '#FFBDBB'
                    : transactionData.transactionTypeId == 2 &&
                      transactionData.transactionStatusId == 3
                    ? '#9EE6A8'
                    : transactionData.transactionStatusId == 2
                    ? '#2a80b9' :
                    transactionData.transactionStatusId == 1 ?
                    '#ecd271'
                    : 'white',
                fontWeight:
                  transactionData.transactionStatusId == 3 ? 'bold' : '',
                fontSize: 18,
              }}>
              {transactionData.transactionTypeId == 2 &&
              (transactionData.transactionStatusId == 3 ||
                transactionData.transactionStatusId == 2 || transactionData.transactionStatusId == 1)
                ? '+'
                : ''}
              {transactionData.totalAmount} {transactionData.currency}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
              <Text style={{}}>{transactionData.transferType}</Text>
              {' - '}
              <Text style={{}}>{transactionData.transactionStatus}</Text>
              {' - '}
              <Text>{formatDate(new Date(transactionData.date))}</Text>
            </Text>
            {(transactionData.transferTypeId == 3 ||
              transactionData.transferTypeId == 4) && (
              <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
                <Text style={{}}>
                  {transactionData.p2PAmount} {transactionData.p2PCurrency}
                </Text>
              </Text>
            )}
            {transactionData.transferTypeId != 3 &&
              transactionData.transferTypeId != 4 && (
                <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
                  <Text style={{}}>
                    {transactionData.amount} {transactionData.currency}
                  </Text>
                </Text>
              )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
