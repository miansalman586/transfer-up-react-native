import ScreenLoader from '../components/ScreenLoader';

import { View, StatusBar } from 'react-native';

import { useEffect } from 'react';
import * as GlobalService from '../services/GlobalService';
import * as SecureStore from 'expo-secure-store';

export default function StartScreen({ navigation }) {
  const onFocus = async () => {
    let isLoggedIn = await GlobalService.isLoggedIn();
    if (isLoggedIn) {
      navigation.navigate('Tab');
    } else {
      navigation.navigate('Login', { entityId: 2 });
    }
  };

  useEffect(() => {
    onFocus();
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <ScreenLoader />
    </View>
  );
}
