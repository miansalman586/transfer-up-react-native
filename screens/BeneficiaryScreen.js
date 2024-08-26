import { View, Text, ScrollView } from 'react-native';

import CountryItem from '../components/CountryItem';

import InputSearch from '../components/InputSearch';

import ContentLoad from '../components/ContentLoad';

import { useState, useEffect } from 'react';
import httpRequest from '../utils/httpRequest';

import GoBackTopBar from '../components/GoBackTopBar';
import BeneficiaryItem from '../components/BeneficiaryItem';

export default function BeneficiaryScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState(null);

  const [beneficiary, setBeneficiary] = useState(null);

  const { callback, bankId, entityId, currencyId } = route.params;

  const onFocus = () => {
    setBeneficiary(null);
    httpRequest(
      'get-customer-beneficiary',
      'get',
      null,
      null,
      true,
      navigation
    ).then((data) => {
      if (data.Data) setBeneficiary(data.Data);
      else setBeneficiary([]);
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
        Select beneficiary
      </Text>
      <InputSearch
        searchData={(value) => {
          setSearchText(value);
        }}
      />
      <View style={{ marginTop: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!beneficiary && (
            <View style={{ flex: 'row' }}>
              <ContentLoad count={10} />
            </View>
          )}
          {beneficiary
            ?.filter(
              (x) =>
                !searchText ||
                (x.FirstName + ' ' + x.LastName)
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )
            ?.filter(
              (e) =>
                e.BankId != bankId &&
                e.AccountStatusId == 5 &&
                e.IsVerifiedEmailAddress == 1 &&
                e.CurrencyId == currencyId
            )
            ?.map((beneficiaryData, index) => (
              <BeneficiaryItem
                key={index}
                bankData={beneficiaryData}
                navigation={navigation}
                entityId={entityId}
                callback={callback}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
