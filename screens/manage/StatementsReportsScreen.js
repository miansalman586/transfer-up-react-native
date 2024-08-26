import { View, ScrollView, Text } from 'react-native';
import GoBackTopBar from '../../components/GoBackTopBar';

import { useEffect } from 'react';

export default function StatementsReportsScreen({ navigation }) {
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
          marginBottom: 40,
          fontSize: 28,
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        Download statements and reports
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: 'white' }}>Select a balance</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            borderWidth: 1,
            marginLeft: 20,
            marginRight: 20,
            borderColor: '#2A2C29',
          }}></View>
      </ScrollView>
    </View>
  );
}
