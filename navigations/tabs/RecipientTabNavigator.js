import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';

import InputSearch from '../../components/InputSearch';

import PayPalTab from '../../tabs/recipient/PayPalTab';

const Tab = createMaterialTopTabNavigator();

function TabBarCustom({ navigation, currentScreen, setCurrentScreen }) {
  const [isAddPressed, setIsAddPressed] = useState(false);

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
          marginTop: 20,
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
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            paddingTop: 25,
            paddingBottom: 20,
            marginLeft: 20,
            marginRight:20,
            flex: 1,
            borderBottomColor: currentScreen == 'PayPal' ? '#2a80b9' : '#2A2C29',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              color: currentScreen == 'PayPal' ? '#2a80b9' : 'white',
              fontSize: 18,
              fontWeight: currentScreen == 'PayPal' ? 'bold' : '',
            }}>
            PayPal
          </Text>
        </TouchableOpacity>
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
      )}>
     <Tab.Screen
        name="PayPalTab"
        component={PayPalTab}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
