import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState, useEffect, useRef } from 'react';

import NoItemYet from '../../components/NoItemYet';
import { jwtDecode } from "jwt-decode";

import * as SecureStore from 'expo-secure-store';

import TransactionItem from '../../components/TransactionItem';
import ScreenLoader from '../../components/ScreenLoader';
import CurrencyItem from '../../components/CurrencyItem';
import InputSearch from '../../components/InputSearch';
import BottomSheet from '../../components/BottomSheet';
import ItemLoader from '../../components/ItemLoader';
import BalanceCard from '../../components/BalanceCard';
import httpRequest from '../../utils/httpRequest';
import { updateSetting } from '../../utils/common';

export default function HomeTab({ navigation }) {
  const [balances, setBalances] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const bottomSheetCurrencyModalRef = useRef(null);


  const [isLoading, setIsLoading] = useState(false);
  const [currencySearchText, setCurrencySearchText] = useState(null);

  const [isSeeAllPressed, setIsSeeAllPressed] = useState(false);

  const handleSeeAllPressIn = () => {
    setIsSeeAllPressed(true);
  };

  const handleSeeAllRPressOut = () => {
    setIsSeeAllPressed(false);
  };

  const getAvailableCurrencies = () => {
    return global.currencies?.filter(
      (e) => !balances?.some((t) => t.currencyId == e.currencyId)
    );
  };

  const onFocus = async () => {
    setBalances(null);
    let balances = await httpRequest('customer/get-balance', 'get', null, true);
    balances = await balances.json();
    if (balances) {
      setBalances(balances);
      global.balances = balances;
    } else setBalances([]);

    setTransactions(null);
    let transactions = await httpRequest(
      'customer/get-transaction?pageNumber=1&pageSize=3',
      'get',
      null,
      true
    );
    transactions = await transactions.json();
    if (transactions) setTransactions(transactions);
    else setTransactions([]);

    httpRequest(
      'customer/get-setting',
      'get',
      null,
      true
    ).then(async result=>{

     let setting = await result.json();
     await updateSetting(setting);
    });
  };

  const onInit = async () => {
     httpRequest(
      'public/get-currency',
      'get',
      null,
      false
    ).then(currencies=>{
      global.currencies = currencies.data;
    });

     httpRequest(
      'public/get-transfer-type',
      'get',
      null,
      false
    ).then(transferTypes=>{
      global.transferTypes = transferTypes.data;
    });

  

    SecureStore.getItemAsync('JwtToken').then(token=>{
      const decodedToken = jwtDecode(token);
      const keys = Object.keys(decodedToken);

      const role = decodedToken[keys[0]];
      const id = decodedToken[keys[1]];
      const firstName = decodedToken[keys[2]];
      const lastName = decodedToken[keys[3]];

      global.user = {
        role: role,
        id: id,
        firstName: firstName,
        lastName: lastName
      }
    })
  };

  useEffect(() => {
    onInit();

    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <View
            style={{
              marginTop: 25,
            }}>
            <ContentLoader
              height={95}
              width={95}
              speed={0}
              backgroundColor={'#333'}
              foregroundColor={'#999'}>
              <Circle cx="45" cy="55" r="27.5" />
            </ContentLoader>
          </View>
          <StatusBar barStyle="light-content" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                marginTop: 5,
                marginLeft: 20,
                marginBottom: 10,
                color: 'white',
                fontSize: 28,
                fontWeight: 'bold',
              }}>
              Customer Account
            </Text>
            {balances?.some((e) => e.isPrimary) && (
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'white',
                    fontSize: 26,
                    fontWeight: 'bold',
                  }}>
                  {balances?.find((e) => e.isPrimary).primaryBalance.toFixed(2)}{' '}
                  {balances?.find((e) => e.isPrimary).currency}
                </Text>
                <Pressable
                  onPress={() => {
                    Alert.alert(
                      'Total Balance',
                      "This is the sum of all the money in your account. It's showing in the currency of the primary balance.\n\nIf you have more than one balance in your account, your total balance will vary because of changes in the exchange rates."
                    );
                  }}
                  style={{
                    paddingLeft: 5,
                    paddingBottom: 10,
                    paddingRight: 20,
                  }}>
                  <View
                    style={{
                      width: 17,
                      height: 17,
                      marginTop: 5,
                      borderRadius: 8.5,
                      borderWidth: 1,
                      padding: 2,
                      marginLeft: 5,
                      borderColor: '#2a80b9',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5 name="info" size={9} color="#2a80b9" />
                  </View>
                </Pressable>
              </View>
            )}
            {!balances && (
              <View
                style={{
                  height: 240,
                }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    <ContentLoader
                      height={240}
                      width={240}
                      speed={0}
                      backgroundColor={'#333'}
                      foregroundColor={'#999'}>
                      <Rect rx="25" ry="25" width={220} height={220} />
                    </ContentLoader>
                    <ContentLoader
                      height={240}
                      width={240}
                      speed={0}
                      backgroundColor={'#333'}
                      foregroundColor={'#999'}>
                      <Rect rx="25" ry="25" width={220} height={220} />
                    </ContentLoader>
                    <ContentLoader
                      height={240}
                      width={240}
                      speed={0}
                      backgroundColor={'#333'}
                      foregroundColor={'#999'}>
                      <Rect rx="25" ry="25" width={220} height={220} />
                    </ContentLoader>
                  </View>
                </ScrollView>
              </View>
            )}
            {balances && (
              <View style={{ height: 240 }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    {balances.map((balanceData, index) => (
                      <BalanceCard
                        key={index}
                        navigation={navigation}
                        balanceData={balanceData}
                      />
                    ))}
                    {getAvailableCurrencies()?.length > 0 && (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          bottomSheetCurrencyModalRef.current.present();
                          setCurrencySearchText(null);
                        }}
                        style={{
                          padding: 20,
                          height: 220,
                          width: 220,
                          marginRight: 20,
                          borderRadius: 25,
                          backgroundColor: '#2A2C29',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: '#3F413E',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesome5 name="plus" size={30} color="white" />
                        </View>
                        <View>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 22,
                            }}>
                            Open
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              marginTop: 5,
                            }}>
                            {getAvailableCurrencies()?.length}{' '}
                            {getAvailableCurrencies()?.length > 1
                              ? 'currencies'
                              : 'currency'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
            <View
              style={{
                marginTop: 30,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
                Transactions
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('Transaction');
                }}
                onPressIn={handleSeeAllPressIn}
                onPressOut={handleSeeAllRPressOut}>
                <Text
                  style={{
                    color: isSeeAllPressed ? 'white' : '#2a80b9',
                    fontSize: 20,
                    textDecorationLine: 'underline',
                  }}>
                  See all
                </Text>
              </Pressable>
            </View>
            {!transactions && (
              <View style={{ flex: 'row' }}>
                <ItemLoader count={3} />
              </View>
            )}
            {transactions && transactions.length == 0 && (
              <NoItemYet desc="No transactions yet" />
            )}
            {transactions?.map((transactionData, index) => (
              <TransactionItem
                key={transactionData.transactionId}
                navigation={navigation}
                transactionData={transactionData}
              />
            ))}
          </ScrollView>
          <BottomSheet
            bottomSheetModalRef={bottomSheetCurrencyModalRef}
            snapPoints={['90%']}
            title={'Select currency'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setCurrencySearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {getAvailableCurrencies()
                    ?.filter(
                      (x) =>
                        !currencySearchText ||
                        x.description
                          .toLowerCase()
                          .includes(currencySearchText.toLowerCase())
                    )
                    ?.map((currencyData, index) => (
                      <CurrencyItem
                        key={currencyData.currencyId}
                        currencyData={currencyData}
                        callback={async () => {
                          bottomSheetCurrencyModalRef.current.close();
                          let result = await httpRequest(
                            'customer/open-balance',
                            'post',
                            { currencyId: currencyData.currencyId },
                            true,
                            setIsLoading
                          );
                          if (result.success) {
                            onFocus();
                          }
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
