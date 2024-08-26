import { View, ScrollView, Text } from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';

import { useState, useEffect } from 'react';

import NotificationLoader from '../../../components/NotificationLoader';

import NotificationItem from '../../../components/NotificationItem';


export default function NotificationSettingsScreen({ navigation }) {
  const onFocus = () => {};

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
          marginBottom: 10,
          fontSize: 28,
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        Notifications
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 20, marginRight:20 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>
            Choose what you want to hear about
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
