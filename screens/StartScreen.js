import ScreenLoader from '../components/ScreenLoader';

import { View, StatusBar,Text} from 'react-native';

import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function StartScreen({ navigation }) {
  useEffect(() => {


    setTimeout(function(){
      SecureStore.getItemAsync('JwtToken').then(token=> {
        if (token)
          navigation.navigate('HomeTab');
        else
        navigation.navigate('OnBoarding');
      });
    }, 1000);
 
   


  }, []);

  return (
    <View style={{
      height: '100%',
      backgroundColor: '#13150F',
      justifyContent: 'center', 
      alignItems: 'center', 
    }}>
      <StatusBar barStyle="light-content" />
     
      <Text
              style={{
                textAlign: 'center',
                color: '#2a80b9',
                fontSize: 32,
                fontWeight: 'bold',
              }}>
              TRANSFERUP
            </Text>

    </View>
  );
}
