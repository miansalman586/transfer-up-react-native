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

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PrimaryBankContentLoader from '../components/PrimaryBankLoader';

import { useState, useEffect } from 'react';

import httpRequest from '../utils/httpRequest';

import ErrorMessage from '../components/ErrorMessage';

import GoBackTopBar from '../components/GoBackTopBar';

export default function ReceiveMoneyScreen({ route, navigation }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isErrorInput, setIsErrorInput] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [bank, setBank] = useState(null);

  const { balanceData, entityId, balances, transferType } = route.params;

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

  const [isBankNamePressed, setIsBankNamePressed] = useState(false);

  const handleBankNamePressIn = () => {
    setIsBankNamePressed(true);
  };

  const handleBankNameRelease = () => {
    setIsBankNamePressed(false);
  };

  const onFocus = () => {
    if (inputValue > balanceData.TotalAmount) {
      setIsErrorInput(true);
    } else {
      setIsErrorInput(false);
    }

    httpRequest(
      'get-customer-bank-detail',
      'post',
      (data = {
        BankId: balanceData.BankId,
      }),
      null,
      true,
      navigation
    ).then((data) => {
      setBank(data.Data);
    });
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
    };
  }, [balanceData]);

  return (
    <View>
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
            Receive money
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
              borderColor:
                isErrorInput && inputValue
                  ? '#FFBDBB'
                  : isInputFocused
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
                fontWeight: 'bold',
              }}
              onChangeText={(value) => {
                if (value > balanceData.TotalAmount) {
                  setIsErrorInput(true);
                } else {
                  setIsErrorInput(false);
                }

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
              disabled={
                !balances.some(
                  (e) =>
                    e.CurrencyId != balanceData.CurrencyId &&
                    e.TotalAmount > 0.0 &&
                    e.BankId
                )
              }
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('Currency', {
                  showCurrencies: balances
                    .filter(
                      (e) =>
                        e.CurrencyId != balanceData.CurrencyId &&
                        e.TotalAmount > 0.0 &&
                        e.BankId
                    )
                    .map((e) => e.CurrencyId),
                  navigation,
                  entityId,
                  title: 'Choose a balance to receive',
                  callback: (currencyData) => {
                    navigation.navigate('ReceiveMoney', {
                      balanceData: balances.find(
                        (e) => e.CurrencyId == currencyData.CurrencyId
                      ),
                      entityId,
                      balances,
                    });
                  },
                });
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
                  {balanceData.Currency}
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
          <View style={{ marginLeft: 20 }}>
            <ErrorMessage
              flag={isErrorInput && inputValue}
              message={
                'You only have ' +
                balanceData.TotalAmount +
                ' ' +
                balanceData.Currency +
                ' in your balance.'
              }
            />
          </View>
          {global.entityId == 2 && (
            <View>
              {!bank && (
                <View style={{ marginTop: 20, marginLeft: 20 }}>
                  <PrimaryBankContentLoader />
                </View>
              )}
              {bank && (
                <View style={{ marginTop: 20, marginLeft: 20 }}>
                  <Text style={{ color: 'white' }}>
                    Your following primary bank will be use for receive the
                    money.
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: '#2A2C29',
                    }}></View>
                  <View
                    style={{
                      marginTop: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: 'white' }}>Bank Name</Text>
                    <Pressable
                      onPressIn={handleBankNamePressIn}
                      onPressOut={handleBankNameRelease}
                      onPress={() => {
                        navigation.navigate('BankDetail', {
                          bankId: bank.BankId,
                          entityId,
                        });
                      }}
                      style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          color: isBankNamePressed ? 'white' : '#2a80b9',
                          textDecorationLine: 'underline',
                        }}>
                        {bank?.BankName}
                      </Text>
                      <FontAwesome5
                        style={{ marginTop: 3, marginLeft: 5 }}
                        name="chevron-down"
                        size={14}
                        color={isBankNamePressed ? 'white' : '#2a80b9'}
                      />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: 'white' }}>Account Title</Text>
                    <Text style={{ color: 'white' }}>{bank?.AccountTitle}</Text>
                  </View>
                  {bank?.BankAccountNumberTypeId == 1 && (
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ color: 'white' }}>IBAN</Text>
                      <Text style={{ color: 'white' }}>{bank?.IBAN}</Text>
                    </View>
                  )}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: 'white' }}>Origin of Bank</Text>
                    <Text style={{ color: 'white' }}>{bank?.CountryName}</Text>
                  </View>
                </View>
              )}
              {entityId == 1 && (
                <View>
                  <Pressable
                    onPress={handlePress}
                    onPressIn={handleBrowsePressIn}
                    onPressOut={handleBrowseRelease}
                    style={{
                      fontSize: 18,
                      marginBottom: 20,
                      marginTop: 20,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      backgroundColor: isBrowsePressed ? '#2a80b9' : '#13150F',
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
                  {imageUri && (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={{ uri: imageUri }}
                        style={{
                          marginLeft: 20,
                          width: imageSize.width,
                          height: imageSize.height,
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
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
              navigation.navigate('OTP', {
                callBack: (emailOTP, smsOTP, setIsLoading) => {
                  httpRequest(
                    'initiate-transaction-request',
                    'post',
                    {
                      Amount: inputValue,
                      RequestTypeId: 2,
                      CurrencyId: balanceData.CurrencyId,
                      EmailOTPCode: emailOTP,
                      SMSOTPCode: smsOTP,
                      TransferTypeId: transferType.TransferTypeId,
                      ReceiverTypeId: 1,
                    },
                    setIsLoading,
                    true,
                    navigation
                  ).then((data) => {
                    if (data.Success) {
                      navigation.navigate('Home');
                    } else {
                      Alert.alert('Error', data.Message);
                    }
                  });
                },
                entityId,
              });
            }}
            disabled={isErrorInput || !inputValue || inputValue <= 0 || !bank}
            style={{
              marginTop: 'auto',
              marginBottom: 40,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                isErrorInput || !inputValue || inputValue <= 0 || !bank
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
        </View>
      </View>
    </View>
  );
}
