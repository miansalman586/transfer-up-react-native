import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import TransferTypeItem from '../components/TransferTypeItem';
import TransferTypeItem2 from '../components/TransferTypeItem2';

import formateFullDate from '../utils/formateFullDate';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect, useRef } from 'react';
import ScreenLoader from '../components/ScreenLoader';

import BottomSheet from '../components/BottomSheet';
import InputSearch from '../components/InputSearch';
import CountryItem from '../components/CountryItem';
import * as GlobalService from '../services/GlobalService';

import httpRequest from '../utils/httpRequest';

import GoBackTopBar from '../components/GoBackTopBar';
import CurrencyItem from '../components/CurrencyItem';

export default function RequestMoneyScreen({ route, navigation }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const bottomSheetCountryModalRef = useRef(null);
  const bottomSheetCurrencyModalRef = useRef(null);
  const bottomSheetTransferTypeModalRef = useRef(null);

  const [expireDate, setExpireDate] = useState(null);
  const [countrySearchText, setCountrySearchText] = useState(null);
  const [currencySearchText, setCurrencySearchText] = useState(null);
  const [transferTypeSearchText, setTransferTypeSearchText] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [transferTypes, setTransferTypes] = useState([]);

  const { transferType } = route.params;

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinueRelease = () => {
    setIsContinuePressed(false);
  };

  const [isTransferTypePressed, setIsTransferTypePressed] = useState(false);

  const handleTransferTypePressIn = () => {
    setIsTransferTypePressed(true);
  };

  const handleTransferTypeRelease = () => {
    setIsTransferTypePressed(false);
  };

  const [balanceData, setBalanceData] = useState(null);
  const [country, setCountry] = useState(null);

  const onFocus = () => {
    setBalanceData(route.params.balanceData);
    setCountry(route.params.country);

    if (transferType) {
      if (
        !transferTypes.some(
          (e) => e.TransferTypeId == transferType.TransferTypeId
        )
      ) {
        transferTypes.push(transferType);
        setRefresh(!refresh);
      }
    }
  };

  const expireDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setExpireDate(formateFullDate(currentDate).split(',')[0]);
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, [route.params]);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            paddingRight: 20,
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
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
              Request money
            </Text>
            <View
              style={{
                height: 50,
                marginLeft: 20,
                paddingLeft: 5,
                color: 'white',
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderWidth: 2,
                marginTop: 10,
                borderColor: isInputFocused ? '#2a80b9' : '#2A2C29',
                fontSize: 18,
                flexDirection: 'row',
              }}>
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 18,
                  flex: 10,
                  marginLeft: 15,
                  fontWeight: 'bold',
                }}
                onChangeText={(value) => {
                  setInputValue(value);
                }}
                value={inputValue}
                placeholderTextColor="white"
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType="numeric"
                textContentType="numeric"
                placeholder={isInputFocused ? '' : '0.00'}
                selectionColor="#2a80b9"
              />
              <TouchableOpacity
                activeOpacity={
                  global.balances.some(
                    (e) => e.CurrencyId != balanceData?.CurrencyId
                  )
                    ? 0.5
                    : 1
                }
                onPress={() => {
                  bottomSheetCurrencyModalRef.current.present();
                  setCurrencySearchText(null);
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      marginRight: 10,
                      marginTop: 9,
                      marginLeft: 15,
                      backgroundColor: '#2A2C29',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={{
                      uri: global.currencies?.find(
                        (e) => e.CurrencyId == balanceData?.CurrencyId
                      )?.Image,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#2a80b9',
                      fontSize: 24,
                      marginTop: 9,
                    }}>
                    {balanceData?.Currency}
                  </Text>
                  <FontAwesome5
                    style={{ marginTop: 15, marginLeft: 5 }}
                    name="chevron-down"
                    size={18}
                    color="#2a80b9"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'white',
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Country
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 20,
              }}
              activeOpacity={
                global.countries.filter(
                  (e) => e.CurrencyId == balanceData?.CurrencyId
                ).length == 1
                  ? 1
                  : 0.5
              }
              onPress={() => {
                bottomSheetCountryModalRef.current.present();
                setCountrySearchText(null);
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
                  {country?.CountryName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {country?.Flag && (
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
                        source={{ uri: country?.Flag }}
                      />
                    </View>
                  )}
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
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Expire At
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 20,
              }}
              activeOpacity={0.5}
              onPress={() => {
                setShowDatePicker(true);
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
                  {expireDate}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Fontisto
                    style={{ marginTop: 5, marginLeft: 5 }}
                    name="date"
                    size={20}
                    color="#2a80b9"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <View>
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={expireDateChange}
                />
              </View>
            )}
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Pressable
                onPressIn={handleTransferTypePressIn}
                onPressOut={handleTransferTypeRelease}
                onPress={() => {
                  bottomSheetTransferTypeModalRef.current.present();

                  setTransferTypeSearchText(null);
                }}
                style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: isTransferTypePressed ? 'white' : '#2a80b9',
                    textDecorationLine: 'underline',
                  }}>
                  Transfer Type
                </Text>
                <FontAwesome5
                  style={{ marginTop: 3, marginLeft: 5 }}
                  name="chevron-down"
                  size={14}
                  color={isTransferTypePressed ? 'white' : '#2a80b9'}
                />
              </Pressable>
            </View>
            <View style={{ marginTop: 20 }}>
              {transferTypes?.map((transferTypeData, index) => (
                <TransferTypeItem2
                  isDisabled={true}
                  key={index}
                  transferTypeData={transferTypeData}
                  close={() => {
                    let indexToRemove = transferTypes.findIndex(
                      (item) =>
                        item.TransferTypeId === transferTypeData.TransferTypeId
                    );

                    if (indexToRemove !== -1) {
                      transferTypes.splice(indexToRemove, 1);
                      setRefresh(!refresh);
                    }
                  }}
                />
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}>
            <Pressable
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinueRelease}
              onPress={() => {
                handleContinueRelease();

                httpRequest(
                  'initiate-transaction-request',
                  'post',
                  {
                    Amount: inputValue,
                    RequestTypeId: 5,
                    RequestMoneyTransferTypeId: transferTypes
                      .map((e) => e.TransferTypeId)
                      .toString(),
                    CurrencyId: balanceData?.CurrencyId,
                    CountryId: country?.CountryId,
                    ExpiredDate: expireDate,
                  },
                  setIsLoading,
                  true,
                  navigation
                ).then((response) => {
                  if (response.Success) {
                    navigation.navigate('Home');
                  } else {
                    Alert.alert('Error', response.Message);
                  }
                });
              }}
              disabled={
                !inputValue ||
                inputValue <= 0 ||
                !country ||
                !expireDate ||
                transferTypes.length == 0
              }
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  !inputValue ||
                  inputValue <= 0 ||
                  !country ||
                  !expireDate ||
                  transferTypes.length == 0
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
                Get Link
              </Text>
            </Pressable>
          </View>
          <BottomSheet
            bottomSheetModalRef={bottomSheetCountryModalRef}
            snapPoints={['90%']}
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
                  {global.countries
                    ?.filter(
                      (x) =>
                        !countrySearchText ||
                        x.CountryName.toLowerCase().includes(
                          countrySearchText.toLowerCase()
                        )
                    )
                    ?.filter((e) => e.CurrencyId == balanceData?.CurrencyId)
                    ?.map((countryData, index) => (
                      <CountryItem
                        key={index}
                        countryId={country?.CountryId}
                        countryData={countryData}
                        navigation={navigation}
                        callback={async () => {
                          bottomSheetCountryModalRef.current.close();

                          setCountry(countryData);
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
          <BottomSheet
            bottomSheetModalRef={bottomSheetCurrencyModalRef}
            snapPoints={['90%']}
            title={'Select currency'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setCurrencySearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.currencies
                    ?.filter(
                      (x) =>
                        !currencySearchText ||
                        x.Description.toLowerCase().includes(
                          currencySearchText.toLowerCase()
                        )
                    )
                    ?.filter((e) =>
                      global.balances.some((x) => x.CurrencyId == e.CurrencyId)
                    )
                    ?.map((currencyData, index) => (
                      <CurrencyItem
                        key={index}
                        available={true}
                        currencyData={currencyData}
                        currencyId={balanceData?.CurrencyId}
                        callback={async () => {
                          bottomSheetCurrencyModalRef.current.close();

                          setCountry(
                            global.countries.find(
                              (e) => e.CurrencyId == currencyData.CurrencyId
                            )
                          );
                          setBalanceData(
                            global.balances.find(
                              (e) => e.CurrencyId == currencyData.CurrencyId
                            )
                          );
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
          <BottomSheet
            bottomSheetModalRef={bottomSheetTransferTypeModalRef}
            snapPoints={['90%']}
            title={'Select transfer type'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setTransferTypeSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.transferTypes
                    ?.filter(
                      (x) =>
                        !transferTypeSearchText ||
                        x.TransferType.toLowerCase().includes(
                          transferTypeSearchText.toLowerCase()
                        )
                    )
                    ?.filter((e) => e.RequestTypeId == 1)
                    ?.map((transferTypeData, index) => (
                      <TransferTypeItem
                        key={index}
                        available={true}
                        transferTypeData={transferTypeData}
                        navigation={navigation}
                        callback={() => {
                          if (
                            !transferTypes.some(
                              (e) =>
                                e.TransferTypeId ==
                                transferTypeData.TransferTypeId
                            )
                          ) {
                            transferTypes.push(transferTypeData);
                            setRefresh(!refresh);
                          }
                          bottomSheetTransferTypeModalRef.current.close();
                        }}
                      />
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
