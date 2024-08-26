import {
  View,
  ScrollView,
  Image,
  Text,
  Alert,
  Pressable,
} from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import formateFullDate from '../utils/formateFullDate';

import * as ContactService from '../services/ContactService';

import { useState, useEffect } from 'react';

export default function ContactDetailScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [contact, setContact] = useState(null);

  const { entityId, customerId, merchantId, emailAddress } = route.params;

  const onFocus = async () => {
    if (entityId == 1) {
      let data = await ContactService.getContactDetail(
        merchantId,
        null,
        entityId,
        setIsLoading
      );
      if (data.Data) {
        setContact(data.Data);
      }
    } else if (entityId == 2) {
      let data = await ContactService.getContactDetail(
        null,
        customerId,
        entityId,
        setIsLoading
      );
      if (data.Data) {
        setContact(data.Data);
      }
    }
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
              <View>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                  source={{
                    uri: contact?.ProfilePic,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 15,
                  color: 'white',
                  fontSize: 28,
                }}>
                {contact?.FirstName} {contact?.LastName}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 16,
                }}>
                {entityId == 1
                  ? 'Merchant Account'
                  : entityId == 2
                  ? 'Customer Account'
                  : ''}
              </Text>
              <Pressable
                style={{ marginTop: 15 }}
                onPress={() => {
                  if (global.balances.length == 0) {
                    Alert.alert('Alert', 'You have no open balance.');
                  } else if (
                    !global.balances.some((e) => e.TotalAmount > 0.0)
                  ) {
                    Alert.alert('Alert', 'You have no funds in your balance.');
                  } else {
                    navigation.navigate('SendMoney', {
                      balanceData: global.balances[0],
                      transferType: { TransferTypeId: 11 },
                    });
                  }
                }}>
                <View
                  style={{
                    width: 90,
                    height: 35,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      global.balances.length == 0 ||
                      !global.balances.some((e) => e.TotalAmount > 0.0)
                        ? '#2A2C29'
                        : '#2a80b9',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Send
                  </Text>
                </View>
              </Pressable>
            </View>
            {emailAddress && (
              <View>
                <View style={{ marginLeft: 20, marginTop: 40 }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>
                    Email Address
                  </Text>
                </View>
                <View style={{ marginLeft: 20, marginTop: 5 }}>
                  <Text style={{ color: 'white' }}>{emailAddress}</Text>
                </View>
              </View>
            )}
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Phone Number</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{contact?.PhoneNumber}</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Country</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{contact?.CountryName}</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Created Date</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(contact?.CreatedDate))}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
