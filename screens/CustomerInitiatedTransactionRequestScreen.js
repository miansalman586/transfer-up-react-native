import { View, ScrollView } from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import InputSearch from '../components/InputSearch';

import CustomerInitiatedTransactionRequestItem from '../components/CustomerInitiatedTransactionRequestItem';

import { useEffect, useState } from 'react';

import httpRequest from '../utils/httpRequest';

import ContentLoad from '../components/ContentLoad';

export default function CustomerInitiatedTransactionRequestScreen({
  route,
  navigation,
}) {
  const [requests, setRequests] = useState(null);

  const { balances, transferType, requestTypeId } = route.params;

  const getRequests = (searchByName) => {
    setRequests(null);
    httpRequest(
      'get-customer-initiated-transaction-request',
      'post',
      {
        RequestTypeId: requestTypeId,
        TransferTypeId: transferType.TransferTypeId,
        SearchByName: searchByName,
      },
      null,
      true,
      navigation
    ).then((data) => {
      if (data.Data) setRequests(data.Data);
      else setRequests([]);
    });
  };

  const onFocus = () => {
    getRequests(null);
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13150F',
      }}>
      <GoBackTopBar navigation={navigation} />
      <InputSearch
        onBlur={(value) => {
          getRequests(value);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          {!requests && (
            <View style={{ flex: 'row' }}>
              <ContentLoad count={10} />
            </View>
          )}
          {requests?.map((requestData, index) => (
            <CustomerInitiatedTransactionRequestItem
              key={index}
              requestData={requestData}
              navigation={navigation}
              balances={balances}
              transferType={transferType}
              balanceData={balances.find(
                (e) => e.CurrencyId == requestData.CurrencyId
              )}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
