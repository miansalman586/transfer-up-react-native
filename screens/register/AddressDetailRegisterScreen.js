
import {View, ScrollView, Text, TextInput, Pressable, TouchableOpacity} from 'react-native';
import ScreenLoader from '../../components/ScreenLoader';

import {useState, useRef, useEffect} from 'react';
import GoBackTopBar from '../../components/GoBackTopBar';
import BottomSheet from '../../components/BottomSheet';
import RadioButton from '../../components/RadionButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Entypo from 'react-native-vector-icons/Entypo';
import * as FileSystem from 'expo-file-system';

import httpRequest from '../../utils/httpRequest';
import InputSearch from '../../components/InputSearch';
import * as ImagePicker from 'expo-image-picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import ErrorMessage from '../../components/ErrorMessage';

export default function AddressDetailRegisterScreen({navigation, route}) {
  const [isLoading, setIsLoading] = useState(false);


const [country, setCountry] = useState(null);

const [address, setAddress] = useState(null);


  const [cities, setCities] = useState(null);

  const [CitySearchText, setCitySearchText] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const bottomSheetCityModalRef = useRef(null);
const bottomSheetCountryModalRef = useRef(null);

  const [isAddressInputFocused, setIsAddressInputFocused] =
  useState(false);

  const handleAddressFocus = () => setIsAddressInputFocused(true);
  const handleAddressBlur = () =>  setIsAddressInputFocused(false);

  const [zipCode, setZipCode] = useState(null);

  const [isZipCodeInputFocused, setIsZipCodeInputFocused] =
  useState(false);

  const handleZipCodeFocus = () => setIsZipCodeInputFocused(true);
  const handleZipCodeBlur = () =>  setIsZipCodeInputFocused(false);

  
  const [city, setCity] = useState(null);


  useEffect(() => {
setCountry(route.params.country);

    httpRequest(
      'public/get-city-by-country-id?countryId=' + route.params.country.countryId,
      'get',
      null,
      false,
      null,
      navigation,
      true
    ).then(async cities => {
      cities = await cities.json();
      setCities(cities);
    });

  
  }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };



    return(
        <View>
        {!isLoading && (
          <View
            style={{
              height: '100%',
              backgroundColor: '#13150F',
            }}>
            <GoBackTopBar navigation={navigation}  />
            <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{  paddingHorizontal: 20 }}>
        <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                 Address details
                </Text>
              </View>
              <View style={{ }}>
                  <View style={{  }}>
                    <Text style={{ color: 'white' }}>Country</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                     
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                      editable={false}
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        value={route.params.country.countryName}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>

        
                  <Text style={{ color: 'white' , marginTop: 20}}>City</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                  setCitySearchText(null);



                  bottomSheetCityModalRef.current.present();
                }}>
                <View
                style={{
                  height: 52,
                  paddingLeft: 5,
                  color: 'white',
                  paddingRight: 20,
                  backgroundColor: '#2A2C29',
                  marginTop: 10,
                  fontSize: 18,
                  flexDirection: 'row'
                  , justifyContent: 'space-between'
                }}>
                  <Text style={{
                        color: 'white',
                        fontSize: 18,
                        marginLeft: 20,
                        marginTop: 15
                  }}>
      {city?.cityName}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>


                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Address</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        borderColor:
                          isAddressInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        value={address}
                        onChangeText={(value) => {
                       setAddress(value);
                        }}
                        onFocus={handleAddressFocus}
                        onBlur={handleAddressBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Zip Code</Text>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 5,
                        color: 'white',
                        paddingRight: 20,
                        backgroundColor: '#2A2C29',
                        borderWidth: 2,
                        marginTop: 10,
                        
                        borderColor:
                          isZipCodeInputFocused
                            ? '#2a80b9'
                            : '#2A2C29',
                        fontSize: 18,
                        flexDirection: 'row',
                      }}>
                      <TextInput
                      inputMode='numeric'
                        style={{
                          color: 'white',
                          fontSize: 18,
                          flex: 10,
                          marginLeft: 15,
                        }}
                        onChangeText={(value) => {
                     

                            setZipCode(value);
                        }}
                        value={zipCode}
                        onFocus={handleZipCodeFocus}
                        onBlur={handleZipCodeBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                

         

           


              
                </View>
              </View>
</ScrollView>
<View
            style={{
              marginLeft: 20,
              marginTop: 20,
              marginRight: 20
            }}>
            <Pressable
          disabled={ !address ||   !country || !city || !zipCode}
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinuePressOut}
              onPress={async () => {
                navigation.navigate('OTPVerificationRegister', {
                    country: route.params.country,
                    phoneNumber: route.params.phoneNumber,
                    emailAddress: route.params.emailAddress,
                    password: route.params.password,
                    firstName: route.params.firstName,
                    lastName: route.params.lastName,
                    dob: route.params.dob,
                    gender: route.params.gender,
                    idType: route.params.idType,
                    idNo: route.params.idNo,
                    idExpiryDate:route.params.idExpiryDate,
                    nationality:route.params.nationality,
                    country: route.params.country,
                    idImage: route.params.idImage,
                    city: city,
                    address: address,
                    zipCode: zipCode
                });
              }}
      
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
             !address ||   !country || !city || !zipCode ? '#2A2C29'
                : 
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
<BottomSheet
            bottomSheetModalRef={bottomSheetCityModalRef}
            snapPoints={[ '90%' ]}
            title={'Select city'}
            content={
              <View>
                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                        setCitySearchText(value);
                    }}
                  />
                </View>
              {cities
                  ?.filter(
                    (x) =>
                      !CitySearchText ||
                      x.cityName
                        .toLowerCase()
                        .includes(CitySearchText.toLowerCase())
                  )
                ?.map((it, index) => (
                  <Pressable
                  style={{
                    paddingLeft: 20,
                    paddingTop: 15,
                    paddingBottom: 10,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                  }}
                  onPress={() => {
                   setCity(it);
                   bottomSheetCityModalRef.current.close();
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                 
                    <View style={{ marginTop: 3, flex: 1 }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                        }}>
                        {it?.cityName}
                      </Text>
                    </View>
                      <View style={{ marginTop: 15 }}>
                        <RadioButton selected={it?.cityId == city?.cityId} />
                      </View>
                  </View>
                </Pressable>
                ))}




              </View>
            }
          />






            </View>
                )}
                {isLoading && <ScreenLoader />}
              </View>
    );
}