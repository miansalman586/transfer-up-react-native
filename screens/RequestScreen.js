import { View, ScrollView } from 'react-native';

import RequestItem from '../components/RequestItem';
import FilterView from '../components/FilterView';
import InputSearch from '../components/InputSearch';

import GoBackTopBar from '../components/GoBackTopBar';

import ContentLoad from '../components/ContentLoad';

import { useEffect, useState } from 'react';

import httpRequest from '../utils/httpRequest';

export default function RequestSreen({ route, navigation }) {
  const { entityId, currencyId } = route.params;

  const [requests, setRequests] = useState(null);

  const getRequests = (currencyId, searchByName) => {
    if (entityId == 1) {
      setRequests(null);

      httpRequest(
        'get-merchant-transaction-request',
        'post',
        {
          Offset: 0,
          Fetch: 100,
          CurrencyId: currencyId,
          SearchByName: searchByName,
        },
        null,
        true,
        navigation
      ).then((data) => {
        if (data.Data) setRequests(data.Data);
        else setRequests([]);
      });
    } else if (entityId == 2) {
      setRequests(null);

      httpRequest(
        'get-customer-transaction-request',
        'post',
        (data = {
          RequestStatusId: '1,7,10',
          Offset: 0,
          Fetch: 100,
          CurrencyId: currencyId,
          SearchByName: searchByName,
        }),
        null,
        true,
        navigation
      ).then((data) => {
        if (data.Data) setRequests(data.Data);
        else setRequests([]);
      });
    }
  };

  const onFocus = () => {
    getRequests(currencyId, null);
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
          getRequests(currencyId, value);
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
            <RequestItem
              key={index}
              navigation={navigation}
              requestData={requestData}
              entityId={entityId}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
