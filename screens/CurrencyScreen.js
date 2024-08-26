import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ScreenLoader from '../components/ScreenLoader';

import CurrencyItem from '../components/CurrencyItem';

import InputSearch from '../components/InputSearch';

import { useState, useEffect } from 'react';

import GoBackTopBar from '../components/GoBackTopBar';


export default function CurrencyScreen({ route, navigation }) {
  const { title, callback, filter } = route.params;

  const [searchText, setSearchText] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [currencies, setCurrencies] = useState(null);

  const onFocus = () => {};

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    setCurrencies(global.currencies);

    return () => {
      onFocusListener()?.remove();
    };
  }, []);

  return (
    <View>
      {!isLoading && (
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
            {title}
          </Text>
          <InputSearch
            searchData={(value) => {
              setSearchText(value);
            }}
          />
          <View style={{ marginTop: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {currencies
                ?.filter(filter ? filter : () => true)
                ?.filter(
                  (x) =>
                    !searchText ||
                    x.Description.toLowerCase().includes(
                      searchText.toLowerCase()
                    )
                )
                ?.map((currencyData, index) => (
                  <CurrencyItem
                    key={index}
                    currencyData={currencyData}
                    navigation={navigation}
                    callback={callback}
                    setIsLoading={setIsLoading}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
