import ScreenLoader from '../components/ScreenLoader';

import { View, StatusBar, Pressable, Text,Image} from 'react-native';
import Swiper from 'react-native-swiper';
import { useEffect, useState } from 'react';

export default function OnBoardingScreen({ navigation }) {

  const handleLoginPressIn = () => setisLoginPressed(true);
  const handleLoginRelease = () => setisLoginPressed(false);
  const [isLoginPressed, setisLoginPressed] = useState(false);

  const handleRegisterPressIn = () => setisRegisterPressed(true);
  const handleRegisterRelease = () => setisRegisterPressed(false);
  const [isRegisterPressed, setisRegisterPressed] = useState(false);



  useEffect(() => {
   
  }, []);

  return (
    <View style={{
      height: '100%',
      backgroundColor: '#13150F',
      padding:20,
      justifyContent: 'flex-end',
    }}>
      <StatusBar barStyle="light-content" />
      <View style={{flexDirection:'row', marginTop:'25%',textAlign: 'center',justifyContent:'center'}}>
      <Image
            style={{   width: 48, height: 42, marginRight:15}}
            source={require('../assets/icons/transfer-up-theme.png')}
          />
            <Text
              style={{
                color: '#2a80b9',
                fontSize: 30,
                marginTop:2,

                fontWeight: 'bold',
                marginBottom: 30,
              }}>
              TRANSFERUP
            </Text>
      </View>
    
      <Swiper  style={{marginTop: 420}}
      dotColor="#2A2C29"           
      activeDotColor="#2a80b9"      
      showsPagination={true} autoplay >
      <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'center',
              
              }}>
              ONE ACCOUNT FOR ALL CURRENCIES
            </Text>
      <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'center',
              }}>
              ONE ACCOUNT FOR ALL WALLETS
            </Text>
      <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'center',
              }}>
             NO HIDDEN FEES AND MID MARKET EXCHANGE RATES
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'center',
              }}>
            SAFE AND FAST TRANSFER YOUR MONEY
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'center',
              }}>
           ACCESS YOUR FUNDS ANYWHERE ANYTIME
            </Text>
    </Swiper>
   
      <View style={{
        flexDirection: 'row',
        marginBottom: 40
      }}>
        
  <Pressable
                onPressIn={handleLoginPressIn}
                onPressOut={handleLoginRelease}
                onPress={()=>{
                  navigation.navigate('Login');
                }}
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                     isLoginPressed
                      ? 'white'
                      : '#2a80b9',
                }}>
                <Text
                  style={{
                    color: isLoginPressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Login
                </Text>
              </Pressable>
              <Pressable
                onPressIn={handleRegisterPressIn}
                onPressOut={handleRegisterRelease}
                onPress={()=>{
                  navigation.navigate('EmailAddressRegister');
                }}
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 50,
                  marginLeft: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                     isRegisterPressed
                      ? 'white'
                      : '#2a80b9',
                }}>
                <Text
                  style={{
                    color: isRegisterPressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Register
                </Text>
              </Pressable>
      </View>
    

    </View>
  );
}
