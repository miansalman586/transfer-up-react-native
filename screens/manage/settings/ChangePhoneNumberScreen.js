import {
  View,
  TextInput,
  ScrollView,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import GoBackTopBar from '../../../components/GoBackTopBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from '../../../components/BottomSheet';
import RadioButton from '../../../components/RadionButton';
import InputSearch from '../../../components/InputSearch';
import AddressVerificationLoader from '../../../components/AddressVerificationLoader';
import { useState, useRef, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import ScreenLoader from '../../../components/ScreenLoader';

import * as CustomerService from '../../../services/user/CustomerService';
import * as MerchantService from '../../../services/user/MerchantService';
import * as GlobalService from '../../../services/GlobalService';

import ErrorMessage from '../../../components/ErrorMessage';

export default function ChangePhoneNumberScreen({ navigation }) {
  const [pickedFile, setPickedFile] = useState(null);

  const pickDocument = async (addressVerificationDocumentId) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      if (!result.canceled) {
        setPickedFile(result);
        setAddressVerificationDocumentId(addressVerificationDocumentId);
      }
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);

  const [addressVerificationDocument, setAddressVerificationDocument] =
    useState(null);

  const [addressVerificationDocumentId, setAddressVerificationDocumentId] =
    useState(null);

  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);

  const [country, setCountry] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const documentBottomSheetModalRef = useRef(null);
  const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] =
    useState(false);
  const [isCountryCodeInputFocused, setIsCountryCodeInputFocused] =
    useState(false);
  const [isPhoneNumberExistsError, setIsPhoneNumberExistsError] =
    useState(false);
  const phoneNumberRef = useRef(null);
  const [countryCodeInputValue, setCountryCodeInputValue] = useState('+');
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [isBrowsePressed, setIsBrowsePressed] = useState(false);
  const handleBrowsePressIn = () => {
    setIsBrowsePressed(true);
  };

  const handleBrowseRelease = () => {
    setIsBrowsePressed(false);
  };

  const handlePhoneNumberFocus = () => setIsPhoneNumberInputFocused(true);
  const handlePhoneNumberBlur = async () => {
    setIsPhoneNumberInputFocused(false);

    if (
      !(countryCodeInputValue.replace(/\+/g, '') && !country) &&
      phoneNumberInputValue
    ) {
      if (global.entityId == 1) {
        let result = await MerchantService.hasPhoneNumber(
          countryCodeInputValue,
          phoneNumberInputValue,
          setIsLoading,
          navigation
        );
        if (result.Success) {
          setIsPhoneNumberExistsError(false);
        } else {
          setIsPhoneNumberExistsError(true);
        }
      } else if (global.entityId == 2) {
        let result = await CustomerService.hasPhoneNumber(
          countryCodeInputValue,
          phoneNumberInputValue,
          setIsLoading,
          navigation
        );
        if (result.Success) {
          setIsPhoneNumberExistsError(false);
        } else {
          setIsPhoneNumberExistsError(true);
        }
      }
    }
  };
  const [addressInputValue, setAddressInputValue] = useState(null);
  const [zipCodeInputValue, setZipCodeInputValue] = useState(null);

  const [isAddressInputFocused, setIsAddressInputFocused] = useState(null);
  const [isZipCodeInputFocused, setIsZipCodeInputFocused] = useState(null);
  const handleAddressFocus = () => {
    setIsAddressInputFocused(true);
  };

  const handleAddressBlur = () => {
    setIsAddressInputFocused(false);
  };
  const handleZipCodeFocus = () => {
    setIsZipCodeInputFocused(true);
  };

  const handleZipCodeBlur = () => {
    setIsZipCodeInputFocused(false);
  };

  const handleCountryCodeFocus = () => {
    setIsCountryCodeInputFocused(true);
  };
  const handleCountryCodeBlur = async () => {
    setIsCountryCodeInputFocused(false);

    if (countryCodeInputValue.replace(/\+/g, '') && country) {
      let result = await GlobalService.getCityByCountryId(
        country?.CountryId,
        setIsLoading,
        navigation
      );
      setCities(result.Data);
      setCity(null);
    } else {
      setCities(null);
      setCity(null);
    }
  };

  const handleContinuePressIn = () => setIsContinuePressed(true);
  const handleContinueRelease = () => setIsContinuePressed(false);

  const handleContinue = async () => {
    if (global.settings.AppSecurityId == 2) {
      navigation.navigate('UnlockPasscode2', {
        callBack: async (
          passcode,
          setIsLoading,
          setIsErrorPasscode,
          errorCount,
          setErrorCount
        ) => {
          if (global.entityId == 1) {
            let data = await MerchantService.verifyPasscode(
              passcode,
              setIsLoading,
              navigation
            );
            if (data.Success) {
              let fileBase64 = await FileSystem.readAsStringAsync(
                pickedFile.assets[0].uri,
                {
                  encoding: FileSystem.EncodingType.Base64,
                }
              );

              navigation.navigate('ChangePhoneNumberOTP', {
                newPhoneNumber: phoneNumberInputValue,
                newCountryCode: countryCodeInputValue,
                appSecurityData: passcode,
                cityId: city.CityId,
                address: addressInputValue,
                zipCode: zipCodeInputValue,
                addressVerificationDocumentId: addressVerificationDocumentId,
                addressVerificationDocument: fileBase64,
              });
            } else {
              setIsErrorPasscode(true);

              if (errorCount >= 3) {
                await GlobalService.logout(navigation, global.entityId);
              }

              setErrorCount(errorCount + 1);
            }
          } else if (global.entityId == 2) {
            let data = await CustomerService.verifyPasscode(
              passcode,
              setIsLoading,
              navigation
            );
            if (data.Success) {
              let fileBase64 = await FileSystem.readAsStringAsync(
                pickedFile.assets[0].uri,
                {
                  encoding: FileSystem.EncodingType.Base64,
                }
              );
              navigation.navigate('ChangePhoneNumberOTP', {
                newPhoneNumber: phoneNumberInputValue,
                newCountryCode: countryCodeInputValue,
                appSecurityData: passcode,
                cityId: city.CityId,
                address: addressInputValue,
                zipCode: zipCodeInputValue,
                addressVerificationDocumentId: addressVerificationDocumentId,
                addressVerificationDocument: fileBase64,
              });
            } else {
              setIsErrorPasscode(true);

              if (errorCount >= 3) {
                await GlobalService.logout(navigation, global.entityId);
              }

              setErrorCount(errorCount + 1);
            }
          }
        },
      });
    }
  };

  const onFocus = async () => {
    let documents = await GlobalService.getAddressVerificationDocument(
      navigation
    );
    if (documents.Data) setAddressVerificationDocument(documents.Data);
    else setAddressVerificationDocument([]);
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
    },
    header: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bulletItem: {
      color: 'white',
      marginBottom: 5,
    },
    bulletList: {
      color: 'white',
      marginLeft: 20,
    },
    bullet: {
      color: 'white',
      marginBottom: 5,
    },
  });

  const handlePress = () => {
    documentBottomSheetModalRef.current.present();
  };

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} />
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}>
            Change your phone number
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>
                We'll text verification code to your new and existing phone
                number to confirm it.
              </Text>
              <View>
                <Text style={{ color: 'white' }}>Phone number</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={4}
                    style={{
                      flex: 1,
                      color: 'white',
                      fontSize: 18,
                      height: 50,
                      paddingLeft: 20,
                      paddingRight: 20,
                      marginRight: 20,
                      backgroundColor: '#2A2C29',
                      borderColor:
                        countryCodeInputValue.replace(/\+/g, '') && !country
                          ? '#FFBDBB'
                          : isCountryCodeInputFocused
                          ? '#2a80b9'
                          : '#2A2C29',
                      borderWidth: 2,
                      marginTop: 10,
                    }}
                    onChangeText={(value) => {
                      value = value.replace(/\+/g, '');
                      setCountryCodeInputValue('+' + value);

                      if (value.length === 3) {
                        phoneNumberRef.current.focus();
                      }

                      setCity(null);
                      setCountry(
                        global.countries.find(
                          (e) => e.CountryCode == '+' + value
                        )
                      );
                    }}
                    value={countryCodeInputValue}
                    onFocus={handleCountryCodeFocus}
                    onBlur={handleCountryCodeBlur}
                    selectionColor="#2a80b9"
                  />
                  <TextInput
                    ref={phoneNumberRef}
                    keyboardType="numeric"
                    style={{
                      flex: 5,
                      color: 'white',
                      fontSize: 18,
                      height: 50,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: '#2A2C29',
                      borderColor: isPhoneNumberExistsError
                        ? '#FFBDBB'
                        : isPhoneNumberInputFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                      borderWidth: 2,
                      marginTop: 10,
                    }}
                    onChangeText={(value) => {
                      setPhoneNumberInputValue(value);
                    }}
                    value={phoneNumberInputValue}
                    onFocus={handlePhoneNumberFocus}
                    onBlur={handlePhoneNumberBlur}
                    selectionColor="#2a80b9"
                  />
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <ErrorMessage
                  flag={countryCodeInputValue.replace(/\+/g, '') && !country}
                  message={'Country code is invalid.'}
                />
                <ErrorMessage
                  flag={isPhoneNumberExistsError}
                  message={'Phone number already exists.'}
                />
              </View>
              <View>
                <Text
                  style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
                  Country
                </Text>
                <View onPress={() => {}}>
                  <View
                    style={{
                      alignItems: 'center',
                      height: 50,
                      paddingLeft: 5,
                      color: 'white',
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
                      {country?.CountryName}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      {country && (
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
                            source={{
                              uri: country?.Flag,
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <Text
                  style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
                  City
                </Text>
                <TouchableOpacity
                  disabled={!cities}
                  activeOpacity={0.5}
                  onPress={() => {
                    bottomSheetModalRef.current.present();
                    setSearchText(null);
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
                      {city?.CityName}
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
                <Text
                  style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
                  Address
                </Text>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor: isAddressInputFocused ? '#2a80b9' : '#2A2C29',
                    borderWidth: 2,
                  }}
                  onChangeText={(value) => {
                    setAddressInputValue(value);
                  }}
                  value={addressInputValue}
                  onFocus={handleAddressFocus}
                  onBlur={handleAddressBlur}
                  selectionColor="#2a80b9"
                />
                <Text
                  style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>
                  Zip Code
                </Text>
                <TextInput
                  style={{
                    color: 'white',
                    fontSize: 18,
                    height: 50,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                    borderColor: isZipCodeInputFocused ? '#2a80b9' : '#2A2C29',
                    borderWidth: 2,
                  }}
                  onChangeText={(value) => {
                    setZipCodeInputValue(value);
                  }}
                  value={zipCodeInputValue}
                  keyboardType="numeric"
                  textContentType="numeric"
                  onFocus={handleZipCodeFocus}
                  onBlur={handleZipCodeBlur}
                  selectionColor="#2a80b9"
                />
                {!addressVerificationDocument && (
                  <View style={{ marginTop: 20 }}>
                    <AddressVerificationLoader />
                  </View>
                )}
                {addressVerificationDocument && (
                  <View>
                    <View style={styles.container}>
                      <Text style={styles.header}>
                        You must provide your address proof documents.
                      </Text>
                      <Text style={styles.bulletItem}>
                        - We accept the following documents dated within the
                        last 30 days:
                      </Text>
                      <View style={styles.bulletList}>
                        {addressVerificationDocument.map((document, index) => (
                          <View>
                            <Text key={index} style={styles.bullet}>
                              - {document.AddressVerificationDocument}{' '}
                              {document.AddressVerificationDocumentId ==
                                addressVerificationDocumentId && (
                                <Text style={{ color: '#2a80b9' }}>
                                  (Selected)
                                </Text>
                              )}
                            </Text>
                          </View>
                        ))}
                      </View>
                      {pickedFile && (
                        <View style={{ marginTop: 5 }}>
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Selected File:
                          </Text>
                          <Text style={{ color: 'white' }}>
                            {pickedFile.assets[0].name}
                          </Text>
                        </View>
                      )}
                    </View>

                    <Pressable
                      onPress={handlePress}
                      onPressIn={handleBrowsePressIn}
                      onPressOut={handleBrowseRelease}
                      style={{
                        fontSize: 18,
                        marginBottom: 20,
                        marginTop: 25,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        backgroundColor: isBrowsePressed
                          ? '#2a80b9'
                          : '#13150F',
                        borderColor: '#2a80b9',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Browse
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <Pressable
            onPressIn={handleContinuePressIn}
            onPressOut={handleContinueRelease}
            onPress={handleContinue}
            disabled={
              !phoneNumberInputValue ||
              countryCodeInputValue == '+' ||
              (countryCodeInputValue.replace(/\+/g, '') && !country) ||
              isPhoneNumberExistsError ||
              !country ||
              !city ||
              !addressInputValue ||
              !zipCodeInputValue ||
              !addressVerificationDocumentId ||
              !pickedFile
            }
            style={{
              marginTop: 40,
              marginRight: 40,
              bottom: 40,
              left: 20,
              right: 20,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                !phoneNumberInputValue ||
                countryCodeInputValue == '+' ||
                (countryCodeInputValue.replace(/\+/g, '') && !country) ||
                isPhoneNumberExistsError ||
                !country ||
                !city ||
                !addressInputValue ||
                !zipCodeInputValue ||
                !addressVerificationDocumentId ||
                !pickedFile
                  ? '#2A2C29'
                  : isContinuePressed
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
          <BottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={['90%']}
            title={'Select city'}
            content={
              <View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setSearchText(value);
                    }}
                  />
                </View>
                {cities
                  ?.filter(
                    (x) =>
                      !searchText ||
                      x.CityName.toLowerCase().includes(
                        searchText.toLowerCase()
                      )
                  )
                  ?.map((c, index) => (
                    <ScrollView>
                      <Pressable
                        key={index}
                        onPress={async () => {
                          bottomSheetModalRef.current.close();

                          setCity(c);
                        }}
                        style={{
                          paddingTop: 25,
                          paddingBottom: 10,
                          paddingRight: 25,
                          paddingLeft: 25,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            {c.CityName}
                          </Text>
                        </View>
                        <RadioButton selected={city?.CityId == c.CityId} />
                      </Pressable>
                    </ScrollView>
                  ))}
              </View>
            }
          />
          <BottomSheet
            bottomSheetModalRef={documentBottomSheetModalRef}
            snapPoints={['30%']}
            title={'Select document type'}
            content={
              <View>
                <ScrollView>
                  {addressVerificationDocument?.map((c, index) => (
                    <Pressable
                      key={index}
                      onPress={async () => {
                        documentBottomSheetModalRef.current.close();

                        pickDocument(c.AddressVerificationDocumentId);
                      }}
                      style={{
                        paddingTop: 25,
                        paddingBottom: 10,
                        paddingRight: 25,
                        paddingLeft: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                          {c.AddressVerificationDocument}
                        </Text>
                      </View>
                      <RadioButton
                        selected={
                          addressVerificationDocumentId ==
                          c.AddressVerificationDocumentId
                        }
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            }
          />
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
