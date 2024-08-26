import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import InputSearch from '../../components/InputSearch';
import * as SecureStore from 'expo-secure-store';

import { useEffect, useState } from 'react';


import BeneficiaryItem from '../../components/BeneficiaryItem';
import FilterView from '../../components/FilterView';

import httpRequest from '../../utils/httpRequest';

import * as BeneficiaryService from '../../services/BeneficiaryService';

export default function BeneficiaryTab({ route, navigation }) {
  const [searchText, setSearchText] = useState(null);
  const [banks, setBanks] = useState(null);

  const onFocus = async () => {
    setBanks(null);
    let data = await BeneficiaryService.getBeneficiaries();
    if (data.Data) setBanks(data.Data);
    else setBanks([]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          {!banks && (
            <View style={{ flex: 'row' }}>
            </View>
          )}
          {banks
            ?.filter(
              (x) =>
                !searchText ||
                (x.FirstName + ' ' + x.LastName)
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )
            ?.map((bankData, index) => (
              <BeneficiaryItem
                key={index}
                bankData={bankData}
                navigation={navigation}
                callback={(bankData) => {
                  if (
                    bankData.AccountStatusId == 4 ||
                    bankData.AccountStatusId == 6
                  ) {
                    navigation.navigate('AddBeneficiary', {
                      bankId: bankData.BankId,
                      title: 'Edit beneficiary',
                    });
                  } else if (
                    bankData.AccountStatusId == 1 ||
                    bankData.AccountStatusId == 2 ||
                    bankData.AccountStatusId == 5 ||
                    bankData.AccountStatusId == 7 ||
                    bankData.AccountStatusId == 8
                  ) {
                    navigation.navigate('BeneficiaryDetail', {
                      bankId: bankData.BankId,
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
