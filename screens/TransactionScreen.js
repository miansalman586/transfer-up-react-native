import { View, ScrollView } from 'react-native';

import TransactionItem from '../components/TransactionItem';

import InputSearch from '../components/InputSearch';
import GoBackTopBar from '../components/GoBackTopBar';
import ItemLoader from '../components/ItemLoader';

import NoItemYet from '../components/NoItemYet';

import httpRequest from '../utils/httpRequest';

import { useEffect, useState } from 'react';

export default function TransactionSreen({ navigation }) {
  const [transactions, setTransactions] = useState(null);

  const [searchTerm, setSearchTerm] = useState(null);

  const getTransactions = async (searchTerm) => {
    setTransactions(null);
    if (searchTerm) {
    let transactions = await httpRequest(
      'customer/get-transaction?pageNumber=1&pageSize=100&searchTerm=' + searchTerm,
      'get',
      null,
      true
    );
    transactions = await transactions.json();
    if (transactions) setTransactions(transactions);
    else setTransactions([]);
  } else {
    let transactions = await httpRequest(
      'customer/get-transaction?pageNumber=1&pageSize=100',
      'get',
      null,
      true
    );
    transactions = await transactions.json();
    if (transactions) setTransactions(transactions);
    else setTransactions([]);
  }
  };

  const onFocus = () =>{
    getTransactions(searchTerm);
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13150F',
      }}>
      <GoBackTopBar navigation={navigation} />
      <InputSearch
        searchData={(value) => {
          setSearchTerm(value);
          getTransactions(value);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          {!transactions && (
            <View style={{ flex: 'row' }}>
              <ItemLoader count={10} />
            </View>
          )}
        
          {transactions?.map((transactionData, index) => (
            <TransactionItem
              key={index}
              navigation={navigation}
              transactionData={transactionData}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
