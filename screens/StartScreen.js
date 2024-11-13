import ScreenLoader from '../components/ScreenLoader';

import { View, StatusBar,Image} from 'react-native';

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
     
      <Image
            style={{  width: 110, height: 100,  textAlign: 'center'}}
            source={require('../assets/icons/transfer-up-theme.png')}
          />

     

    </View>
  );
}
