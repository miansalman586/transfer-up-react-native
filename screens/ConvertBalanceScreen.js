import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  useWindowDimensions
} from 'react-native';

import BottomSheet from '../components/BottomSheet';
import InputSearch from '../components/InputSearch';
import Entypo from 'react-native-vector-icons/Entypo';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import CurrencyItem from '../components/CurrencyItem';

import ScreenLoader from '../components/ScreenLoader';

import GoBackTopBar from '../components/GoBackTopBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useState, useEffect,useRef } from 'react';

import ErrorMessage from '../components/ErrorMessage';

import httpRequest from '../utils/httpRequest';

export default function ConvertBalanceScreen({ route, navigation }) {
  const { height, width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);

  const [isNoFromAmountError, setIsNoFromAmountError] = useState(false);

  const [exchangeRate,  setExchangeRate] = useState('0.000000');

  const bottomSheetBalanceDataModalRef = useRef(null);
  const bottomSheetToBalanceDataModalRef = useRef(null);

  const [balanceDataSearchText, setBalanceDataSearchText] = useState(null);
  const [toBalanceDataSearchText, setToBalanceDataSearchText] = useState(null);

  const [isFromAmountFocused, setIsFromAmountFocused] = useState(false);
  const [isToAmountFocused, setIsToAmountFocused] = useState(false);

  const [fromAmount, setFromAmount] = useState(0.00);
  const [toAmount, setToAmount] = useState(null);

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const { balanceData, toBalanceData } = route.params;

  const [newBalanceData, setNewBalanceData] = useState(null);
  const [newToBalanceData, setNewToBalanceData] = useState(null);

  const handleFromAmountFocus = () => {
    setIsFromAmountFocused(true);
  };

  const handleFromAmountBlur = async(fromCurrency, toCurrency) => {
    setIsFromAmountFocused(false);

      setExchangeRate(null);
    let result = await httpRequest('public/get-currency-exchange-rate?sourceCurrency=' + (fromCurrency?.currency ?? newBalanceData?.currency ?? balanceData?.currency) + '&targetCurrency=' + (toCurrency?.currency ?? newToBalanceData?.currency ?? toBalanceData?.currency) + '&amount=' + fromAmount, 'get', null, false, null);
    if (result.status == 200) {
      result = await result.json();
      setToAmount((parseFloat(fromAmount) * parseFloat(result[0].rate)).toFixed(2));
      setExchangeRate(parseFloat(result[0].rate));
    } 
  };

  const handleToAmountFocus = () => {
    setIsToAmountFocused(true);
  };

  const handleToAmountBlur = () => {
    setIsToAmountFocused(false);
  };

  const onFocus = () => {
    setNewBalanceData(balanceData);
    setNewToBalanceData(toBalanceData);
    handleFromAmountBlur();
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            paddingRight: 20,
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} />
          <ScrollView
            contentContainerStyle={{ paddingLeft: 20 }}
            showsVerticalScrollIndicator={false}>
            <Text
              style={{
                color: 'white',
                paddingRight: 20,
                marginBottom: 20,
                fontSize: 28,
                marginTop: 10,
                fontWeight: 'bold',
              }}>
              Convert your balance
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                }}>
                From
              </Text>
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
                  (isNoFromAmountError && fromAmount) ||
                  (newBalanceData?.currencyId == newToBalanceData?.currencyId)
                  ? '#FFBDBB'
                  :
                  isFromAmountFocused ? '#2a80b9' : '#2A2C29',
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
                    if (value > newBalanceData?.totalBalance) {
                      setIsNoFromAmountError(true);
                    } else {
                      setIsNoFromAmountError(false);
                    }

                    setFromAmount(value);
                  }}
                  value={fromAmount}
                  placeholderTextColor="white"
                  onFocus={handleFromAmountFocus}
                  onBlur={handleFromAmountBlur}
                  keyboardType="numeric"
                  textContentType="numeric"
                  placeholder={isFromAmountFocused ? '' : '0.00'}
                  selectionColor="#2a80b9"
                />
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetBalanceDataModalRef.current.present();
                      setBalanceDataSearchText(null);
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
                      source={{uri:'data:image/jpeg;base64,' + newBalanceData?.currencyFlag}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 22,
                        marginTop: 9,
                      }}>
                      {newBalanceData?.currency}
                    </Text>
                    <FontAwesome5
                      style={{ marginTop: 13, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ErrorMessage
              flag={isNoFromAmountError && fromAmount}
              message={
                'You only have ' +
                newBalanceData?.totalBalance +
                ' ' +
                newBalanceData?.currency +
                ' in your balance.'
              }
            />
                <ErrorMessage
              flag={newBalanceData?.currencyId == newToBalanceData?.currencyId}
              message={
              'Source currency and target currency cannot be same.'
              }
            />
                {!exchangeRate && (
                <View style={{ marginTop: 20 }}>
                  <ContentLoader
                    height={20}
                    speed={0}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}
                    viewBox={width + ' 20'}>
                    <Rect width={width} height="20" />
                  </ContentLoader>
                </View>
              )}
                {exchangeRate && (
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        marginTop: 2,
                        borderRadius: 8,
                        padding: 2,
                        marginRight: 10,
                        marginLeft: 2,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="cross" size={12} color="black" />
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      1 {newBalanceData?.currency} = {exchangeRate}{' '}
                      {newToBalanceData?.currency}
                    </Text>
                  </View>
                  <Text style={{ color: 'white' }}>Exchange rate</Text>
                </View>
              )}
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 20,
                  color: 'white',
                }}>
                To
              </Text>
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
                  (newBalanceData?.currencyId == newToBalanceData?.currencyId)
                  ? '#FFBDBB'
                  :
                  isToAmountFocused ? '#2a80b9' : '#2A2C29',
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
                    fontWeight: 'bold',
                  }}
                  onChangeText={(value) => {
                    setToAmount(value);
                  }}
                  value={toAmount}
                  placeholderTextColor="white"
                  onFocus={handleToAmountFocus}
                  onBlur={handleToAmountBlur}
                  keyboardType="numeric"
                  textContentType="numeric"
                  placeholder={isToAmountFocused ? '' : '0.00'}
                  selectionColor="#2a80b9"
                />
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetToBalanceDataModalRef.current.present();
                      setToBalanceDataSearchText(null);
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
                      source={{uri:'data:image/jpeg;base64,' + newToBalanceData?.currencyFlag}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 22,
                        marginTop: 9,
                      }}>
                      {newToBalanceData?.currency}
                    </Text>
                    <FontAwesome5
                      style={{ marginTop: 13, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ErrorMessage
              flag={newBalanceData?.currencyId == newToBalanceData?.currencyId}
              message={
              'Source currency and target currency cannot be same.'
              }
            />
            </View>
          </ScrollView>
      
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}>
            <Pressable
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinuePressOut}
              onPress={async ()=>{
                handleContinuePressOut();

                  let result = await httpRequest('customer/convert-currency', 'post', {
                    sourceCurrencyId: newBalanceData.currencyId,
                    targetCurrencyId: newToBalanceData.currencyId,
                    amount: fromAmount,
                  }, 
                  true,
                  setIsLoading
                );
                if (result.status == 200) {
                  navigation.navigate('HomeTab');
                }
              }}  
              disabled={  !fromAmount || !toAmount ||
                isNoFromAmountError || newBalanceData?.currencyId == newToBalanceData?.currencyId}
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  !fromAmount || !toAmount ||
                  isNoFromAmountError ||
                  newBalanceData?.currencyId == newToBalanceData?.currencyId
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

          <BottomSheet
            bottomSheetModalRef={bottomSheetBalanceDataModalRef}
            snapPoints={['90%']}
            title={'Select currency'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setBalanceDataSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.currencies
                    ?.filter(
                      (x) =>
                        !balanceDataSearchText ||
                        x.description
                          .toLowerCase()
                          .includes(balanceDataSearchText.toLowerCase())
                    )
                    ?.filter((e) =>
                      global.balances?.some((t) => t.currencyId == e.currencyId)
                    )
                    ?.map((currencyData, index) => (
                      <CurrencyItem
                        key={index}
                        currencyId={newBalanceData?.currencyId}
                        isRadioButton={true}
                        currencyData={currencyData}
                        callback={async () => {
                          bottomSheetBalanceDataModalRef.current.close();

                          setNewBalanceData(
                            global.balances.find(
                              (e) => e.currencyId == currencyData.currencyId
                            )
                          );

                          handleFromAmountBlur(global.balances.find(
                            (e) => e.currencyId == currencyData.currencyId
                          ), toBalanceData);
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
              <BottomSheet
            bottomSheetModalRef={bottomSheetToBalanceDataModalRef}
            snapPoints={['90%']}
            title={'Select currency'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setToBalanceDataSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.currencies
                    ?.filter(
                      (x) =>
                        !toBalanceDataSearchText ||
                        x.description
                          .toLowerCase()
                          .includes(toBalanceDataSearchText.toLowerCase())
                    )
                    ?.filter((e) =>
                      global.balances?.some((t) => t.currencyId == e.currencyId)
                    )
                    ?.map((currencyData, index) => (
                      <CurrencyItem
                        key={index}
                        currencyId={newToBalanceData?.currencyId}
                        isRadioButton={true}
                        currencyData={currencyData}
                        callback={async () => {
                          bottomSheetToBalanceDataModalRef.current.close();

                          setNewToBalanceData(
                            global.balances.find(
                              (e) => e.currencyId == currencyData.currencyId
                            )
                          );

                          handleFromAmountBlur(newBalanceData, global.balances.find(
                            (e) => e.currencyId == currencyData.currencyId
                          ));
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
