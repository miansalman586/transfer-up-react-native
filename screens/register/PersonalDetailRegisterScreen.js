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

export default function PersonalDetailRegisterScreen({navigation, route}) {
  const [isLoading, setIsLoading] = useState(false);

  const [expiryDatePicker, setExpiryDatePicker] = useState(null);


const [country, setCountry] = useState(null);

const [firstName, setFirstName] = useState(null);
const [lastName, setLastName] = useState(null);


  const [gender, setGender] = useState(null);
  const [idType, setIDType] = useState(null);

  const [countrySearchText, setCountrySearchText] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const bottomSheetGenderModalRef = useRef(null);
  const bottomSheetIDTypeModalRef = useRef(null);
const bottomSheetCountryModalRef = useRef(null);

  const [isFirstNameInputFocused, setIsFirstNameInputFocused] =
  useState(false);

  const handleFirstNameFocus = () => setIsFirstNameInputFocused(true);
  const handleFirstNameBlur = () =>  setIsFirstNameInputFocused(false);

const [idNo, setIDNo] = useState(null);

  const [isIDNoInputFocused, setIsIDNoInputFocused] =
  useState(false);

  const handleIDNoFocus = () => setIsIDNoInputFocused(true);
  const handleIDNoBlur = () =>  setIsIDNoInputFocused(false);

  const [isLastNameInputFocused, setIsLastNameInputFocused] =
  useState(false);

  const handleLastNameFocus = () => setIsLastNameInputFocused(true);
  const handleLastNameBlur = () =>  setIsLastNameInputFocused(false);

  const [dateOfBirth, setDateOfBirth] = useState(null);

  const [isDOBInputFocused, setIsDOBInputFocused] =
  useState(false);

  const handleDOBFocus = () => setIsDOBInputFocused(true);
  const handleDOBBlur = () =>  setIsDOBInputFocused(false);

  
  const [isBrowsePressed, setIsBrowsePressed] = useState(false);

  const handleBrowsePressIn = () => {
    setIsBrowsePressed(true);
  };

  const handleBrowsePressOut = () => {
    setIsBrowsePressed(false);
  };
 
  function isValidDate(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

  const [month, day, year] = dateString.split('/').map(Number);

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
  }

  const [expiryDateError, setExpiryDateError] = useState(false);
  const [dobDateError, setDOBDateError] = useState(false);
  
  const [isIDExpiryInputFocused, setIsIDExpiryInputFocused] =
  useState(false);

  const handleIDExpiryFocus = () => setIsIDExpiryInputFocused(true);
  const handleIDExpiryBlur = () =>  setIsIDExpiryInputFocused(false);

  const [idTypes, setIDTypes] = useState(null);


  const [idImage, setIDImage] = useState(null);

  const pickImage = async () => {
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imageUri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
  
      const fileName = imageUri.split('/').pop();
      const fileSize = fileInfo.size; 

      setIDImage({
        name: fileName,
        size: fileSize,
        image: result.assets[0].uri 
      });
    }
  };

  useEffect(() => {
    httpRequest(
      'public/get-id-type',
      'get',
      null,
      false,
      null,
      navigation,
      true
    ).then(async idTypes => {
      idTypes = await idTypes.json();
      setIDTypes(idTypes);
    });

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
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
                 Personal details
                </Text>
              </View>
              <View style={{ }}>
                  <View style={{  }}>
                    <Text style={{ color: 'white' }}>First Name</Text>
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
                          isFirstNameInputFocused
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
                        value={firstName}
                        onChangeText={(value) => {
                       setFirstName(value);
                        }}
                        onFocus={handleFirstNameFocus}
                        onBlur={handleFirstNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Last Name</Text>
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
                          isLastNameInputFocused
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
                        value={lastName}
                        onChangeText={(value) => {
                       setLastName(value);
                        }}
                        onFocus={handleLastNameFocus}
                        onBlur={handleLastNameBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Date of Birth (DD/MM/YYYY)</Text>
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
                      dobDateError  && dateOfBirth
                        ? '#FFBDBB'
                        :
                          isDOBInputFocused
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
                        onChangeText={(value) => {
                          if (isValidDate(value) && parseDate(value) < new Date()) {
                            setDOBDateError(false);
                          } else {
                            setDOBDateError(true);
                          }

                          setDateOfBirth(value);
                        }}
                        value={dateOfBirth}
                        onFocus={handleDOBFocus}
                        onBlur={handleDOBBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>
                  <ErrorMessage
              flag={dobDateError && dateOfBirth}
              message={
              'Please enter valid date (DD/MM/YYYY) format and dob cannot be in the future.'
              }
            />
                  <View>


<Text style={{ color: 'white' , marginTop: 20}}>Gender</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                  bottomSheetCountryModalRef.current.close();
                  bottomSheetIDTypeModalRef.current.close();
                      bottomSheetGenderModalRef.current.present();
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
      {gender?.gender}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>

                </View>
                
<Text style={{ color: 'white' , marginTop: 20}}>ID Type</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                           bottomSheetCountryModalRef.current.close();
                               bottomSheetGenderModalRef.current.close();
                      bottomSheetIDTypeModalRef.current.present();
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
      {idType?.idTypeName}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>

                <View style={{  marginTop: 20}}>
                    <Text style={{ color: 'white' }}>ID No</Text>
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
                          isIDNoInputFocused
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
                        value={idNo}
                        onChangeText={(value) => {
                          setIDNo(value);
                        }}
                        onFocus={handleIDNoFocus}
                        onBlur={handleIDNoBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>ID Expiry Date (DD/MM/YYYY)</Text>
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
                        expiryDateError  && expiryDatePicker
                        ? '#FFBDBB'
                        :
                          isIDExpiryInputFocused
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
                        onChangeText={(value) => {
                          if (isValidDate(value) && parseDate(value) > new Date()) {
                            setExpiryDateError(false);
                          } else {
                            setExpiryDateError(true);
                          }
                          setExpiryDatePicker(value);
                        }}
                        value={expiryDatePicker}
                        onFocus={handleIDExpiryFocus}
                        onBlur={handleIDExpiryBlur}
                        selectionColor="#2a80b9"
                      />
                    </View>
                  </View>   
                  <ErrorMessage
              flag={expiryDateError && expiryDatePicker}
              message={
              'Please enter valid date (DD/MM/YYYY) format and expiry cannot be in the past.'
              }
            />
<Text style={{ color: 'white' , marginTop: 20}}>Nationality</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                  setCountrySearchText(null);

                  bottomSheetGenderModalRef.current.close();
         bottomSheetIDTypeModalRef.current.close();

                      bottomSheetCountryModalRef.current.present();
                }}>
                <View
                style={{
                  height: 52,
                  paddingLeft: 5,
                  color: 'white',
                  paddingRight: 20,
                  marginBottom: 20,
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
      {country?.countryName}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>

                <View
                style={{
                 
                }}>

                  <Text style={{color: 'white'}}>Please upload ID Image.</Text>
             
                <Pressable
                  onPressIn={handleBrowsePressIn}
                  onPressOut={handleBrowsePressOut}
                  onPress={() => {
                    pickImage();
                  }}
                  style={{
                    fontSize: 18,
                    height: 52,
                    marginTop: 20,
                    borderRadius: 52,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    backgroundColor: isBrowsePressed ? '#2a80b9' : '#13150F',
                    borderColor: '#2a80b9',
                  }}>
                  <Text
                    style={{
                      color:  'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Browse
                  </Text>
                </Pressable>
              </View>

{idImage &&


<View style={{flexDirection: 'row', borderWidth: 2, borderColor: '#2A2C29', marginTop: 20}}>
              <FontAwesome
                      style={{ marginTop: 20,  marginLeft: 10, marginBottom: 20 }}
                      name="file-o"
                      size={48}
                      color="white"
                    />
  <View style={{flexDirection:'column', flex:1 ,marginTop: 20,  marginLeft: 20 , marginBottom: 20 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ width: '80%', color: 'white'}}>{idImage?.name}</Text>
                      <TouchableOpacity
          style={{ }}
          onPress={() => {
          setIDImage(null);
          }}>
                        <Entypo
                      style={{  marginLeft: 10, marginRight: 10 }}
                      name="cross"
                      size={26}
                      color="white"
                    />
                    </TouchableOpacity>
                    </View>

                    <View>
                    <Text style={{  color: 'white'}}>{(idImage?.size / 1024)?.toFixed(2) + ' KB'}</Text>
                    </View>

                    </View>
</View>
}
              
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
            disabled={
        !idImage ||   dobDateError ||   expiryDateError ||  !firstName || !lastName || !dateOfBirth || !gender || !idType || !expiryDatePicker || !idNo || !country
            }
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinuePressOut}
              onPress={async () => {
                navigation.navigate('AddressDetailRegister' , {
                  country: route.params.country,
                  phoneNumber: route.params.phoneNumber,
                  emailAddress: route.params.emailAddress,
                  password: route.params.password,
                  firstName: firstName,
                  lastName: lastName,
                  dob: dateOfBirth,
                  gender: gender,
                  idType: idType,
                  idNo: idNo,
                  idExpiryDate:expiryDatePicker,
                  nationality:country,
                  idImage: idImage.image
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
                !idImage ||   dobDateError ||   expiryDateError ||  !firstName || !lastName || !dateOfBirth || !gender || !idType || !expiryDatePicker || !idNo || !country  ? '#2A2C29'
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
            bottomSheetModalRef={bottomSheetIDTypeModalRef}
            snapPoints={[ 12 * idTypes?.length + '%' ]}
            title={'Select ID Type'}
            content={
              <View>
              
              {idTypes
                
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
                   setIDType(it);
                   bottomSheetIDTypeModalRef.current.close();
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                 
                    <View style={{ marginTop: 3, flex: 1 }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                        }}>
                        {it?.idTypeName}
                      </Text>
                    </View>
                      <View style={{ marginTop: 15 }}>
                        <RadioButton selected={it?.idTypeId == idType?.idTypeId} />
                      </View>
                  </View>
                </Pressable>
                ))}




              </View>
            }
          />



<BottomSheet
            bottomSheetModalRef={bottomSheetCountryModalRef}
            snapPoints={[ '90%' ]}
            title={'Select country'}
            content={
              <View>
                   <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setCountrySearchText(value);
                    }}
                  />
                </View>
              <ScrollView>
              {route.params.countries
                ?.filter(
                  (x) =>
                    !countrySearchText ||
                    x.countryName
                      .toLowerCase()
                      .includes(countrySearchText.toLowerCase())
                )
                ?.map((it, index) => (
                  <Pressable
                  style={{
                    paddingLeft: 20,
                    paddingTop: 15,
                    paddingBottom: 20,
                    paddingRight: 20,
                    backgroundColor: '#2A2C29',
                  }}
                  onPress={() => {
                    setCountry(it);
                   bottomSheetCountryModalRef.current.close();
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                 
                    <View style={{ marginTop: 3, flex: 1 }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                        }}>
                        {it?.countryName}
                      </Text>
                    </View>
                      <View style={{ marginTop: 15 }}>
                        <RadioButton selected={country?.countryId == it?.countryId} />
                      </View>
                  </View>
                </Pressable>
                ))}
</ScrollView>



              </View>
            }
          />


          
<BottomSheet
            bottomSheetModalRef={bottomSheetGenderModalRef}
            snapPoints={['24%']}
            title={'Select gender'}
            content={
              <View>
              
                <Pressable
    style={{
      paddingLeft: 20,
      paddingTop: 15,
      paddingBottom: 20,
      paddingRight: 20,
      backgroundColor: '#2A2C29',
    }}
    onPress={() => {
     setGender({id: 1, gender: 'Male'});
     bottomSheetGenderModalRef.current.close();
    }}>
    <View style={{ flexDirection: 'row' }}>
   
      <View style={{ marginTop: 3, flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          Male
        </Text>
      </View>
        <View style={{ marginTop: 15 }}>
          <RadioButton selected={gender?.id == 1} />
        </View>
    </View>
  </Pressable>

  <Pressable
    style={{
      paddingLeft: 20,
      paddingBottom: 20,
      paddingRight: 20,
      backgroundColor: '#2A2C29',
    }}
    onPress={() => {
      setGender({id: 2, gender: 'Female'});

     bottomSheetGenderModalRef.current.close();
    }}>
    <View style={{ flexDirection: 'row' }}>
   
      <View style={{ marginTop: 3, flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          Female
        </Text>
      </View>
        <View style={{ marginTop: 15 }}>
          <RadioButton selected={gender?.id == 2} />
        </View>
    </View>
  </Pressable>

  


              </View>
            }
          />

            </View>
                )}
                {isLoading && <ScreenLoader />}
              </View>
    );
}