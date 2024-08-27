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

  const getTransactions = async (searchTerm) => {
    setTransactions(null);
    let transactions = await httpRequest(
      'customer/get-transaction?pageNumber=1&pageSize=100&searchTerm=' + searchTerm,
      'get',
      null,
      true
    );
    if (transactions.success) setTransactions(transactions.data);
    else setTransactions([]);
  };

  useEffect(() => {
    getTransactions('');
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
