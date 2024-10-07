import { View, ScrollView, TextInput, Pressable, Text } from 'react-native';

import GoBackTopBar from '../../components/GoBackTopBar';
import ScreenLoader from '../../components/ScreenLoader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import formateFullDate from '../../utils/formateFullDate';

import Icon from 'react-native-vector-icons/FontAwesome5';

import httpRequest from '../../utils/httpRequest';

import pickImage from '../../utils/pickImage';

import { useState, useEffect } from 'react';

export default function ProfileScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const onFocus = async () => {
  let result = await httpRequest('customer/get-profile', 'get', null, true, setIsLoading);
  if (result.status == 200) {
    result = await result.json();
    setProfile(result);
    setAddress(result?.address);
    setZipCode(result?.zipCode?.toString());
  }
  };

  const [isSeeAllPressed, setIsSeeAllPressed] = useState(false);

  const handleSeeAllPressIn = () => {
    setIsSeeAllPressed(true);
  };

  const handleSeeAllRPressOut = () => {
    setIsSeeAllPressed(false);
  };


  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const[address, setAddress] = useState(null);
  
const [isAddressFocused, setAddressFocused] = useState(false);

const handleAddressFocus = () => {
    setAddressFocused(true);
  };

  const handleAddressBlur = async () => {
    setAddressFocused(false);
};

const[zipCode, setZipCode] = useState(null);
  
const [isZipCodeFocused, setZipCodeFocused] = useState(false);

const handleZipCodeFocus = () => {
    setZipCodeFocused(true);
  };

  const handleZipCodeBlur = async () => {
    setZipCodeFocused(false);
};


  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
            paddingBottom:20
          }}>
          <GoBackTopBar navigation={navigation} />
          <Text
        style={{
          color: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 20,
          fontSize: 28,
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        Tell us about yourself
      </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: 20, marginTop: 10 }}>

          <Text style={{ color: 'white', marginTop:10}}>Country of residence</Text>
                <TextInput
                editable={false}
                  style={{
                    marginRight: 20,
                    marginBottom: 40,
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                      '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={profile?.country?.toString()}
                  selectionColor="#2a80b9"
                />

          <Text style={{ color: 'white' }}>Personal details</Text>
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


<View style={{
  marginLeft: 20,
  marginRight: 20
}}>
<Text style={{ color: 'white', marginTop:10 }}>First name</Text>
                <TextInput
                editable={false}
                  style={{
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:'#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={profile?.firstName}
                  selectionColor="#2a80b9"
                />
</View>

<View style={{
  marginLeft: 20,
  marginRight: 20
}}>
<Text style={{ color: 'white', marginTop:20 }}>Last name</Text>
                <TextInput
                editable={false}
                  style={{
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:'#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={profile?.lastName}
                  selectionColor="#2a80b9"
                />
</View>

<Text style={{ color: 'white', marginTop:20 ,marginLeft: 20}}>Date of Birth</Text>
<View style={{
  marginLeft: 20,
  marginRight: 20,
  flexDirection: 'row'
}}>
 
  <View style={{
    flex: 2
  }}>
<Text style={{ color: 'white', marginTop:20}}>Day</Text>

        <TextInput
                editable={false}
                  style={{
                    marginRight: 20,
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:'#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={new Date(profile?.dob).getDate().toString()}
                  selectionColor="#2a80b9"
                />
  </View>

  <View style={{
    flex: 4,
  }}>
<Text style={{ color: 'white', marginTop:20}}>Month</Text>

        <TextInput
                editable={false}
                  style={{
    marginRight: 20,
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:'#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={new Date(profile?.dob).toLocaleString('default', { month: 'long' })}
                  selectionColor="#2a80b9"
                />
  </View>

  <View style={{
    flex: 2
  }}>
<Text style={{ color: 'white', marginTop:20 }}>Year</Text>

        <TextInput
                editable={false}
                  style={{
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:'#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={new Date(profile?.dob).getFullYear().toString()}
                  selectionColor="#2a80b9"
                />
  </View>

</View>


<View style={{
  marginLeft: 20,
  marginRight: 20
}}>
<Text style={{ color: 'white', marginTop:20 }}>Phone number</Text>
                <TextInput
                editable={false}
                  style={{
                    inputMode: 'email',
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:'#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={profile?.countryCode + profile?.phoneNumber.toString()}
                  selectionColor="#2a80b9"
                />

<Pressable
                onPress={() => {
                  navigation.navigate('ChangePhoneNumber');
                }}
                onPressIn={handleSeeAllPressIn}
                onPressOut={handleSeeAllRPressOut}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: isSeeAllPressed ? 'white' : '#2a80b9',
                    fontSize: 18,
                    marginTop: 20,
                    textDecorationLine: 'underline',
                  }}>
                  Change phone number
                </Text>
              </Pressable>
</View>

<View style={{ marginLeft: 20, marginTop: 40 }}>
<Text style={{ color: 'white' }}>Address</Text>
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
          
          <Text style={{ color: 'white', marginTop:10 ,marginLeft: 20}}>Home address</Text>
                <TextInput
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                       isAddressFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setAddress(value);
                  }}
                  value={address}
                  onFocus={handleAddressFocus}
                  onBlur={handleAddressBlur}
                  selectionColor="#2a80b9"
                />

<Text style={{ color: 'white', marginTop:20 ,marginLeft: 20}}>Zip code</Text>
                <TextInput
                keyboardType="number-pad"
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                       isZipCodeFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setZipCode(value);
                  }}
                  value={zipCode}
                  onFocus={handleZipCodeFocus}
                  onBlur={handleZipCodeBlur}
                  selectionColor="#2a80b9"
                />

                
<View style={{ marginLeft: 20, marginTop: 40 }}>
<Text style={{ color: 'white' }}>Additional information</Text>
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
          
          <Text style={{ color: 'white', marginTop:10 ,marginLeft: 20}}>Nationality</Text>
                <TextInput
                editable={false}
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor:
                      '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  value={profile?.nationality?.toString()}
                  selectionColor="#2a80b9"
                />


          </ScrollView>
          <View
    style={{
      paddingLeft: 20,
      paddingTop: 20,
      paddingRight: 20,
      backgroundColor: '#13150F',
    }}>
    <Pressable
      onPressIn={handleContinuePressIn}
      onPressOut={handleContinuePressOut}
      onPress={async () => {
        handleContinuePressOut();
        let result = await httpRequest('customer/update-profile', 'put', {
          address: address,
          zipCode: zipCode
        }, true, setIsLoading);
        if (result.status == 200) {
          navigation.goBack();
        }
      }}
      style={{
        marginTop: 'auto',
        height: 50,
        borderRadius: 50,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          isContinuePressed
            ? 'white'
            : '#2a80b9',
      }}>
      <Text
        style={{
          color: isContinuePressed ? 'black' : 'white',
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Continue
      </Text>
    </Pressable>
  </View>
          
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
