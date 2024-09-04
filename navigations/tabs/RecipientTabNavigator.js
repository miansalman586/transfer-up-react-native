import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { useState } from 'react';

import InputSearch from '../../components/InputSearch';

import PayPalTab from '../../tabs/recipient/PayPalTab';
import httpRequest from '../../utils/httpRequest';

import {useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AliPayTab from '../../tabs/recipient/AliPayTab';
import { StatusBar } from 'expo-status-bar';

const Tab = createMaterialTopTabNavigator();

function TabBarCustom({ navigation, currentScreen, setCurrentScreen }) {
  const [isAddPressed, setIsAddPressed] = useState(false);

  const [transferTypes, setTransferTypes ] = useState(null);

  const getTransferTypes = async ()=>{
let result = await httpRequest('customer/get-recipient-transfer-type', 'get', null, true, null);
if (result.success) {
  setTransferTypes(result.data);
}
  };

  useEffect(() => {
    getTransferTypes();
  }, []);

  const handleAddPressIn = () => {
    setIsAddPressed(true);
  };

  const handleAddRelease = () => {
    setIsAddPressed(false);
  };

  return (
    <View style={{ paddingTop: 60, backgroundColor: '#13150F' }}>

      <View
        style={{
          height: '13%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPressIn={handleAddPressIn}
          onPressOut={handleAddRelease}
          style={{ marginRight: 20, marginLeft: 'auto' }}
          onPress={() => {
            navigation.navigate('AddRecipient');
          }}>
          <View
            style={{
          marginTop:20,
              width: 70,
              height: 35,
              borderRadius: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isAddPressed ? 'white' : '#2a80b9',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: isAddPressed ? 'black' : 'white',
              }}>
              Add
            </Text>
          </View>
        </Pressable>
      </View>

      <Text
        style={{
          marginTop: 40,
          marginLeft: 20,
          marginBottom: 10,
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
        }}>
        Recipient
      </Text>
      <InputSearch searchData={(value) => {}} />
      <View style={{ marginBottom: -70, flexDirection: 'row' }}>
      <ScrollView contentContainerStyle={{
     
        }} showsHorizontalScrollIndicator={false}
        horizontal={true}>
         <View style={{flexDirection: 'row'}}>

         
      {transferTypes?.map((transferType, index) => (
     

     
                         <TouchableOpacity
                         index={index}
                         onPress={() => {
                            if (transferType.transferTypeId == 2) {
                              setCurrentScreen('PayPal');
                              navigation.navigate('PayPalTab');
                            } else if (transferType.transferTypeId == 5) {
                              setCurrentScreen('AliPay');
                              navigation.navigate('AliPayTab');
                            }
                        
                         }}
                         activeOpacity={0.5}
                         style={{
                           alignItems: 'center',
                           paddingTop: 25,
                           paddingBottom: 20,
                           marginLeft: 20,
                           width: (Dimensions.get('window').width - 60) / 2,
                           marginRight: index == transferTypes.length - 1 ? 25 : 0,
                           borderBottomColor: currentScreen == transferType.transferTypeName.replace(' ', '') ? '#2a80b9' : '#2A2C29',
                           borderBottomWidth: 2,
                         }}>
                         <Text
                           style={{
                             color: currentScreen == transferType.transferTypeName.replace(' ', '') ? '#2a80b9' : 'white',
                             fontSize: 18,
                             fontWeight: currentScreen == transferType.transferTypeName.replace(' ', '') ? 'bold' : '',
                           }}>
                           {transferType.transferTypeName}
                         </Text>
                       </TouchableOpacity>
                     
                    ))}
                    </View>
                      </ScrollView>
                   
      </View>
    </View>
  );
}

export default function RecipientTabNavigator() {
  const [currentScreen, setCurrentScreen] = useState('PayPal');

  return (
    <Tab.Navigator
      initialRouteName="PayPalTab"
      tabBar={(props) => (
        <TabBarCustom
          {...props}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      screenOptions={{
        swipeEnabled: false, 
      }}
      >
     <Tab.Screen 
        name="PayPalTab"
        component={PayPalTab}
        options={{
          headerShown: false,
        }}
      />
        <Tab.Screen
        name="AliPayTab"
        component={AliPayTab}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
