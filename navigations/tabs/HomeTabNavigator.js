import { View, Pressable, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

import HomeTab from '../../tabs/home/HomeTab';
import RecipientTab from '../../tabs/home/RecipientTab';
import ManageTab from '../../tabs/home/ManageTab';

const Tab = createBottomTabNavigator();

function TabBarCustom({ navigation, currentScreen, setCurrentScreen }) {
  return (
    <View
      style={{
        backgroundColor: '#13150F',
        height: 100,
        borderTopWidth: 2,
        borderTopColor: '#2A2C29',
      }}>
      <View style={{ padding: 20, flexDirection: 'row' }}>
        <Pressable
          style={{ alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('Home');
            setCurrentScreen('Home');
          }}>
          <FontAwesome5
            name="home"
            size={28}
            color={currentScreen == 'Home' ? '#2a80b9' : 'white'}
          />
          <Text
            style={{
              color: currentScreen == 'Home' ? '#2a80b9' : 'white',
              fontSize: 16,
              marginTop: 10,
            }}>
            Home
          </Text>
        </Pressable>
        <Pressable
          style={{ alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('Recipient');
            setCurrentScreen('Recipient');
          }}>
          <Ionicons
            name="people"
            size={28}
            color={currentScreen == 'Recipient' ? '#2a80b9' : 'white'}
          />
          <Text
            style={{
              color: currentScreen == 'Recipient' ? '#2a80b9' : 'white',
              fontSize: 16,
              marginTop: 10,
            }}>
            Recipient
          </Text>
        </Pressable>
        <Pressable
          style={{ alignItems: 'center', flex: 1 }}
          onPress={() => {
            navigation.navigate('Manage');
            setCurrentScreen('Manage');
          }}>
          <FontAwesome5
            name="bars"
            size={28}
            color={currentScreen == 'Manage' ? '#2a80b9' : 'white'}
          />
          <Text
            style={{
              color: currentScreen == 'Manage' ? '#2a80b9' : 'white',
              fontSize: 16,
              marginTop: 10,
            }}>
            Manage
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeTabNavigator() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => (
        <TabBarCustom
          {...props}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Recipient"
        component={RecipientTab}
        options={{
          headerShown: false,
        }}
      />
         <Tab.Screen
        name="Manage"
        component={ManageTab}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
