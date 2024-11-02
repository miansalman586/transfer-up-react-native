import { View, ScrollView, Text, Pressable } from 'react-native';

import GoBackTopBar from '../../components/GoBackTopBar';

import { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';

import ScreenLoader from '../../components/ScreenLoader';

export default function RegisterSuccessScreen({route,navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    
  }, []);

  return (
    <View style={{
      height: '100%',
      backgroundColor: '#13150F',
      padding:20,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}>
   
     {route.params.id == 1 && 
      <Ionicons 
      style={{marginTop: 320, fontSize:350, alignItems: 'center', alignContent: 'center'}}
color={'#2a80b9'}
name={'checkmark'}
/>}
{route.params.id == 2 &&
   <AntDesign 
   style={{marginTop: 320, fontSize:350, alignItems: 'center', alignContent: 'center'}}
color={'#2a80b9'}
name={'exclamation'}
/>
}

{route.params.id == 3 &&
   <Entypo 
   style={{marginTop: 320, fontSize:250, alignItems: 'center', alignContent: 'center'}}
color={'#FFBDBB'}
name={'block'}
/>
}
        
            <View style={{marginTop: 80, marginLeft: 20, marginRight: 20 }}>

{(route.params.id == 1 || route.params.id == 2) &&
       <Text
       style={{
         color: 'white',
         fontWeight: 'bold',
         fontSize: 22,
         marginBottom: 80,
         textAlign: 'center',
       
       }}>
YOUR REGISTRATION WAS SUCCESSFUL. PLEASE ALLOW AT LEAST 2 DAYS FOR ACCOUNT APPROVAL AND VERIFICATION   </Text>
}
{route.params.id == 3 &&
       <Text
       style={{
         color: 'white',
         fontWeight: 'bold',
         fontSize: 22,
         marginBottom: 80,
         textAlign: 'center',
       
       }}>
YOUR ACCOUNT HAS BEEN BLOCKED. PLEASE CONTACT CUSTOMER CARE  </Text>
}

          </View>
        
   
      <View style={{
        flexDirection: 'row',
        marginBottom: 40
      }}>
        
  <Pressable
                onPressIn={handlePressIn}
                onPressOut={handleRelease}
                onPress={()=>{
                  navigation.navigate('OnBoarding');
                }}
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                     isPressed
                      ? 'white'
                      : '#2a80b9',
                }}>
                <Text
                  style={{
                    color: isPressed ? 'black' : 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Continue
                </Text>
              </Pressable>
             
      </View>
    

    </View>


  );
}
