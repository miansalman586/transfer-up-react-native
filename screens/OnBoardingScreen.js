import ScreenLoader from '../components/ScreenLoader';

import { View, StatusBar } from 'react-native';

import { useEffect } from 'react';

export default function OnBoardingScreen({ navigation }) {
  const onFocus = async () => {};

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <ScreenLoader />
    </View>
  );
}
