import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import BeneficiaryTab from '../../tabs/beneficiary/BeneficiaryTab';
import ContactTab from '../../tabs/beneficiary/ContactTab';

import { useState } from 'react';

import InputSearch from '../../components/InputSearch';
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
            navigation.navigate('AddBeneficiary', {
              title: 'Add beneficiary',
            });
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
          marginTop: 38,
          marginLeft: 20,
          marginBottom: 10,
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
        }}>
        Beneficiary
      </Text>
      <InputSearch
        searchData={(value) => {
          setSearchText(value);
        }}
      />
      <View style={{ marginBottom: -70, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BeneficiaryTab');
            setCurrentScreen('BeneficiaryTab');
          }}
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
            marginLeft: 20,
            flex: 1,
            borderBottomColor:
              currentScreen == 'BeneficiaryTab' ? '#2a80b9' : '#2A2C29',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              color: currentScreen == 'BeneficiaryTab' ? '#2a80b9' : 'white',
              fontSize: 18,
              fontWeight: currentScreen == 'BeneficiaryTab' ? 'bold' : '',
            }}>
            Beneficiary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Contact', {
              callback: () => {
                setCurrentScreen('Contact');
              },
            });
            setCurrentScreen('Contact');
          }}
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
            marginRight: 20,
            flex: 1,
            borderBottomColor:
              currentScreen == 'Contact' ? '#2a80b9' : '#2A2C29',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              color: currentScreen == 'Contact' ? '#2a80b9' : 'white',
              fontSize: 18,
              fontWeight: currentScreen == 'Contact' ? 'bold' : '',
            }}>
            Contacts
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function BeneficiaryTabNavigator() {
  const [currentScreen, setCurrentScreen] = useState('BeneficiaryTab');

  return (
    <Tab.Navigator
      initialRouteName="BeneficiaryTab"
      tabBar={(props) => (
        <TabBarCustom
          {...props}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}>
      <Tab.Screen
        name="BeneficiaryTab"
        component={BeneficiaryTab}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactTab}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
