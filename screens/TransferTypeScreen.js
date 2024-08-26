import { View, Text, ScrollView } from 'react-native';

import TransferTypeItem from '../components/TransferTypeItem';

import InputSearch from '../components/InputSearch';

import { useState, useEffect } from 'react';

import GoBackTopBar from '../components/GoBackTopBar';

import ContentLoad from '../components/ContentLoad';

import httpRequest from '../utils/httpRequest';

export default function TransferTypeScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState(null);

  const [transferTypes, setTransferTypes] = useState(null);

  const {
    balanceData,
    callback,
    requestTypeId,
    hideTransferTypes,
    showTransferTypes,
    filter,
  } = route.params;

  const onFocus = () => {
    setTransferTypes(null);
    httpRequest(
      'get-transfer-type',
      'post',
      {
        RequestTypeId: requestTypeId,
        CurrencyId: balanceData?.CurrencyId,
        CountryId: balanceData?.CountryId,
      },
      null,
      false
    ).then((data) => {
      if (data.Data) setTransferTypes(data.Data);
      else setTransferTypes([]);
    });
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
      <Text
        style={{
          color: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 20,
          fontSize: 28,
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        Select transfer type
      </Text>
      <InputSearch
        searchData={(value) => {
          setSearchText(value);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          {!transferTypes && (
            <View style={{ flex: 'row' }}>
              <ContentLoad count={10} />
            </View>
          )}
          {transferTypes
            ?.filter((e) =>
              showTransferTypes
                ? showTransferTypes.includes(e.TransferTypeId)
                : true
            )
            ?.filter((e) =>
              hideTransferTypes
                ? !hideTransferTypes.includes(e.TransferTypeId)
                : true
            )
            ?.filter(filter ? filter : () => true)
            ?.filter(
              (x) =>
                !searchText ||
                x.TransferType.toLowerCase().includes(searchText.toLowerCase())
            )
            ?.map((transferTypeData, index) => (
              <TransferTypeItem
                key={index}
                transferTypeData={transferTypeData}
                navigation={navigation}
                callback={callback}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
