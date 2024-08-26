import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import formateDate from '../utils/formatDate';
import { useState } from 'react';

export default function RequestItem({ entityId, requestData, navigation }) {
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
        navigation.navigate('RequestDetail', {
          requestId: requestData.RequestId,
          transactionRequestId: requestData.TransactionRequestId,
          requestTypeId: requestData.RequestTypeId,
          entityId: entityId,
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
            marginRight: entityId == 2 ? 18 : 20,
            borderWidth: entityId == 2 ? 2 : 0,
            borderColor:
              requestData.RequestStatusId == 3
                ? '#2a80b9'
                : requestData.RequestStatusId == 9
                ? '#9EE6A8'
                : '',
            backgroundColor: '#2A2C29',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={
              requestData.RequestTypeId == 1 && entityId == 1
                ? 'arrow-up'
                : requestData.RequestTypeId == 1 && entityId == 2
                ? 'arrow-down'
                : requestData.RequestTypeId == 2 && entityId == 1
                ? 'arrow-down'
                : requestData.RequestTypeId == 2 && entityId == 2
                ? 'arrow-up'
                : requestData.RequestTypeId == 5 && entityId == 2
                ? 'link'
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
                  requestData.RequestTypeId == 1 &&
                  (requestData.RequestStatusId == 3 ||
                    requestData.RequestStatusId == 9) &&
                  !requestData.TransactionStatusId
                    ? 'bold'
                    : requestData.RequestTypeId == 2 &&
                      (requestData.RequestStatusId == 1 ||
                        requestData.RequestStatusId == 9) &&
                      !requestData.TransactionStatusId
                    ? 'bold'
                    : entityId == 2 && requestData.ReceivedAmount > 0
                    ? 'bold'
                    : '',
                fontSize: 18,
              }}>
              {requestData.FirstName ? requestData.FirstName + ' ' : ''}
              {requestData.LastName}
            </Text>
            <Text
              style={{
                color:
                  requestData.RequestStatusId == 3
                    ? '#2a80b9'
                    : requestData?.RequestStatusId == 9
                    ? '#9EE6A8'
                    : 'white',
                fontSize: 18,
                fontWeight:
                  requestData.RequestStatusId == 9 ||
                  requestData.RequestStatusId == 3
                    ? 'bold'
                    : '',
              }}>
              {requestData.RequestStatusId == 9 ||
              requestData.RequestStatusId == 3
                ? '+'
                : ''}
              {requestData.Amount} {requestData.Currency}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
              <Text
                style={{
                  color:
                    requestData?.RequestStatusId == 3
                      ? '#2a80b9'
                      : requestData?.RequestStatusId == 9
                      ? '#9EE6A8'
                      : 'white',
                }}>
                {requestData.RequestStatus}
              </Text>{' '}
              - {formateDate(new Date(requestData.UpdatedDate))}
            </Text>
            {entityId == 1 && requestData?.RequestStatusId != 4 && (
              <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
                {requestData.RequestedAmount} {requestData.Currency}
              </Text>
            )}
            {requestData?.RequestedAmount != requestData.Amount && (
              <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
                {requestData.RequestedAmount} {requestData.Currency}
              </Text>
            )}
            {entityId == 2 &&
              requestData.ApprovedAmount > 0.0 &&
              requestData?.RequestStatusId != 7 &&
              (requestData.RequestTypeId == 1 ||
                requestData.RequestTypeId == 2) && (
                <Text
                  style={{
                    color:
                      requestData?.ReceivedAmount > 0.0 &&
                      requestData.ApprovedAmount > 0.0 &&
                      requestData?.ReceivedAmount == requestData.ApprovedAmount
                        ? 'white'
                        : requestData.ApprovedAmount > 0.0
                        ? '#2a80b9'
                        : 'white',
                    fontWeight:
                      requestData?.ReceivedAmount > 0.0 &&
                      requestData.ApprovedAmount > 0.0 &&
                      requestData?.ReceivedAmount == requestData.ApprovedAmount
                        ? ''
                        : requestData.ApprovedAmount > 0.0
                        ? 'bold'
                        : '',
                    fontSize: 14,
                    marginTop: 10,
                  }}>
                  {requestData?.RequestTypeId == 1 &&
                  requestData?.ReceivedAmount > 0.0 &&
                  requestData.ApprovedAmount > 0.0 &&
                  requestData?.ReceivedAmount == requestData.ApprovedAmount
                    ? requestData.Amount
                    : requestData?.RequestTypeId == 2 &&
                      requestData?.ReceivedAmount > 0.0 &&
                      requestData.ApprovedAmount > 0.0 &&
                      requestData?.ReceivedAmount == requestData.ApprovedAmount
                    ? requestData.ReceivedAmount
                    : Number.isInteger(
                        (
                          requestData.ApprovedAmount -
                          requestData.ReceivedAmount
                        ).toFixed(2)
                      )
                    ? parseInt(
                        (
                          requestData.ApprovedAmount -
                          requestData.ReceivedAmount
                        ).toFixed(2)
                      )
                    : (
                        requestData.ApprovedAmount - requestData.ReceivedAmount
                      ).toFixed(2)}{' '}
                  {requestData.Currency}
                </Text>
              )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
