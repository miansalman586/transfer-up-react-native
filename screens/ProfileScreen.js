import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import formateFullDate from '../utils/formateFullDate';

import Icon from 'react-native-vector-icons/FontAwesome5';

import httpRequest from '../utils/httpRequest';

import pickImage from '../utils/pickImage';

import { useState, useEffect } from 'react';

export default function ProfileScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [countryFlag, setCountryFlag] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const [cityName, setCityName] = useState(null);
  const [cityId, setCityId] = useState(null);

  const [imageBase64, setImageBase64] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageSize, setImageSize] = useState({ width: null, height: null });

  const onFocus = () => {
    if (route.params?.countryId) {
      setCountryId(route.params?.countryId);
      setCityId(null);
      setCityName(null);
    }
    if (route.params?.countryName) setCountryName(route.params?.countryName);
    if (route.params?.countryFlag) setCountryFlag(route.params?.countryFlag);

    if (route.params?.cityId) {
      setCityId(route.params?.cityId);
    }

    if (route.params?.cityName) {
      setCityName(route.params?.cityName);
    }

    if (global.entityId == 1) {
      httpRequest(
        'get-merchant-detail',
        'get',
        null,
        setIsLoading,
        true,
        navigation
      ).then((data) => {
        if (data.Data) {
          setUser(data.Data);
          setCountryId(data.Data.CountryId);
          setCountryName(data.Data.CountryName);
          setCountryFlag(
            global.countries.find((e) => e.CountryId == data.Data.CountryId)
              .Flag
          );
          setCityName(data.Data.CityName);
          setCityId(data.Data.CityId);
        }
      });
    } else if (global.entityId == 2) {
      httpRequest(
        'get-customer-detail',
        'get',
        null,
        setIsLoading,
        true,
        navigation
      ).then((data) => {
        if (data.Data) {
          setUser(data.Data);
          setCountryId(data.Data.CountryId);
          setCountryName(data.Data.CountryName);
          setCountryFlag(
            global.countries.find((e) => e.CountryId == data.Data.CountryId)
              .Flag
          );
          setCityName(data.Data.CityName);
          setCityId(data.Data.CityId);
        }
      });
    }
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
          }}>
          <GoBackTopBar navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  pickImage()
                    .then((img) => {
                      if (img) {
                        setImageSize({ width: img.width, height: img.height });
                        setImageBase64(img.base64);
                        if (global.entityId == 1) {
                          httpRequest(
                            'update-merchant-account',
                            'post',
                            {
                              ProfilePic: img.base64,
                            },
                            setIsLoading,
                            true,
                            navigation
                          ).then((e) => {
                            if (e.Success) {
                              setImageUri(img.uri);
                            }
                          });
                        } else if (global.entityId == 2) {
                          httpRequest(
                            'update-customer-account',
                            'post',
                            {
                              ProfilePic: img.base64,
                            },
                            setIsLoading,
                            true,
                            navigation
                          ).then((e) => {
                            if (e.Success) {
                              setImageUri(img.uri);
                            }
                          });
                        }
                      }
                    })
                    .catch((e) => {
                      alert(e.toString());
                    });
                }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                  source={{
                    uri: user?.ProfilePic,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    right: -2,
                    backgroundColor: '#2A2C29',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon name="camera" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 15,
                  color: 'white',
                  fontSize: 28,
                }}>
                {user?.FirstName} {user?.LastName}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 16,
                }}>
                Your{' '}
                {global.entityId == 1
                  ? 'Merchant Profile'
                  : global.entityId == 2
                  ? 'Customer Profile'
                  : ''}
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>Personal Details</Text>
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
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>ID No</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{user?.IDNo}</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>ID Type</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{user?.IDType}</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>
                ID Expiry Date
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(user?.IDExpiryDate)).split(',')[0]}
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Date of Birth
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(user?.DOB)).split(',')[0]}
              </Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white' }}>Country of Resident</Text>
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
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                marginLeft: 20,
                marginBottom: 10,
              }}>
              Country
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('Country', {
                  filter: (e) => e.CountryId != countryId,
                  callback: (country) => {
                    route.params.countryId = country.CountryId;
                    route.params.countryName = country.CountryName;
                    route.params.countryFlag = country.Flag;
                    route.params.bankAccountNumberTypeId =
                      country.BankAccountNumberTypeId;
                    route.params.bankId = null;
                    route.params.cityId = null;
                    route.params.cityName = null;
                    navigation.navigate('AddBank', route.params);
                  },
                });
              }}>
              <View
                style={{
                  alignItems: 'center',
                  height: 50,
                  paddingLeft: 5,
                  color: 'white',
                  paddingRight: 20,
                  backgroundColor: '#2A2C29',
                  borderWidth: 2,
                  marginLeft: 20,
                  marginRight: 20,
                  fontSize: 18,
                  flexDirection: 'row',
                  borderColor: '#2A2C29',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 10,
                    marginLeft: 15,
                  }}>
                  {countryName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        marginRight: 10,
                        marginTop: 5,
                        marginLeft: 15,
                        backgroundColor: '#2A2C29',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={{ uri: countryFlag }}
                    />
                  </View>
                  <FontAwesome5
                    style={{ marginTop: 9, marginLeft: 5 }}
                    name="chevron-down"
                    size={18}
                    color="#2a80b9"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                marginTop: 20,
                marginLeft: 20,
                marginBottom: 10,
              }}>
              City
            </Text>
            <TouchableOpacity
              disabled={!countryId}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('City', {
                  countryId: countryId,
                  cityId: cityId,
                  callback: (city) => {
                    route.params.cityId = city.CityId;
                    route.params.cityName = city.CityName;
                    route.params.bankId = null;
                    navigation.navigate('AddBank', route.params);
                  },
                });
              }}>
              <View
                style={{
                  alignItems: 'center',
                  height: 50,
                  paddingLeft: 5,
                  color: 'white',
                  marginLeft: 20,
                  marginRight: 20,
                  paddingRight: 20,
                  backgroundColor: '#2A2C29',
                  borderWidth: 2,
                  fontSize: 18,
                  flexDirection: 'row',
                  borderColor: '#2A2C29',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    flex: 10,
                    marginLeft: 15,
                  }}>
                  {cityName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5
                    style={{ marginTop: 9, marginLeft: 5 }}
                    name="chevron-down"
                    size={18}
                    color="#2a80b9"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Email Address
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{user?.EmailAddress}</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Mobile Number
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{user?.PhoneNumber}</Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Status</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{user?.AccountStatus}</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Address</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{user?.Address}</Text>
              <Text style={{ color: 'white', marginTop: 5 }}>
                {user?.CityName +
                  ', ' +
                  user?.CountryName +
                  ', ' +
                  user?.ZipCode}
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Created Date</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(user?.CreatedDate))}
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Updated Date</Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(user?.UpdatedDate))}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
