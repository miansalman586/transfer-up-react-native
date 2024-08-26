import { View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import InputSearch from '../components/InputSearch';

import SecurityItem from '../components/SecurityItem';

import { useState, useEffect } from 'react';

import httpRequest from '../utils/httpRequest';

import ContentLoad from '../components/ContentLoad';

export default function SecurityScreen({ route, navigation }) {
  const [securities, setSecurities] = useState(null);

  const [searchText, setSearchText] = useState(null);

  const { balances, currencies, goBackScreen, callback } = route.params;

  const onFocus = () => {
    callback(setSecurities);
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
      <GoBackTopBar
        goBackScreen={goBackScreen}
        data={{
          securities: securities,
          currencies,
          balances,
          title: 'Choose a balance to open',
          type: 'open',
        }}
        navigation={navigation}
      />
      <InputSearch
        searchData={(value) => {
          setSearchText(value);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          {!securities && (
            <View style={{ flex: 'row' }}>
              <ContentLoad count={10} />
            </View>
          )}
          {securities
            ?.filter((e) => e.MerchantSecurityStatusId != 6)
            ?.filter(
              (x) =>
                !searchText ||
                x.Description.toLowerCase().includes(searchText.toLowerCase())
            )
            ?.map((securityData, index) => (
              <SecurityItem
                key={index}
                navigation={navigation}
                securityData={securityData}
                callback={() => {
                  if (securityData.MerchantSecurityDocumentId) {
                    navigation.navigate('SecurityDetail', {
                      merchantSecurityDocumentId:
                        securityData.MerchantSecurityDocumentId,
                    });
                  } else {
                    setSecurities(null);
                    httpRequest(
                      'get-merchant-security-document',
                      'post',
                      {
                        merchantSecurityId: securityData.MerchantSecurityId,
                      },
                      null,
                      true,
                      navigation
                    ).then((data) => {
                      if (data.Data) setSecurities(data.Data);
                      else setSecurities([]);
                    });
                  }
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
