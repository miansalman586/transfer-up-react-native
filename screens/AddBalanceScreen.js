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

import ScreenLoader from '../components/ScreenLoader';

import BottomSheet from '../components/BottomSheet';

import PayPalTransactionTypeItem from '../components/PayPalTransactionTypeItem';

import InputSearch from '../components/InputSearch';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CurrencyItem from '../components/CurrencyItem';

import { useState, useEffect, useRef } from 'react';

import httpRequest from '../utils/httpRequest';

import GoBackTopBar from '../components/GoBackTopBar';

export default function AddBalanceScreen({ route, navigation }) {
  const [amount, setAmount] = useState(null);

  const bottomSheetPayPalTransactionTypeModalRef = useRef(null);

  const [transactionTypes, setTransactionTypes] = useState(null);

  const bottomSheetCurrencyModalRef = useRef(null);
  const [currencySearchText, setCurrencySearchText] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isAmountFocused, setIsAmountFocused] = useState(false);

  const { balanceData, transferType } = route.params;

  const [newBalanceData, setNewBalanceData] = useState(null);

  const [paypalTransactionType,  setPaypalTransactionType] = useState(null);

  const handleAmountFocus = () => {
    setIsAmountFocused(true);
  };

  const handleAmountBlur = () => {
    setIsAmountFocused(false);
  };

  const [isContinuePressed, setIsContinuePressed] = useState(false);
  
  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const onFocus = async () => {
    setNewBalanceData(balanceData);
  };

  const onInit = async () =>{
    if (transferType.transferTypeId == 2) {
      let transactionType = await  httpRequest(
        'public/get-payPal-transaction-type',
        'get',
        null,
        false,
        setIsLoading
      );
      if (transactionType.status == 200) {
        transactionType = await transactionType.json();
      setTransactionTypes(transactionType);
      }
    }
  };

  useEffect(() => {
    onInit();

    navigation.addListener('focus', onFocus);
  }, []);

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
              Add balance - {transferType?.transferTypeName}
            </Text>
            <Text style={{ color: 'white' }}>Amount</Text>
            <View
              style={{
                height: 50,
                paddingLeft: 5,
                marginTop:10,
                color: 'white',
                paddingRight: 20,
                backgroundColor: '#2A2C29',
                borderWidth: 2,
                borderColor: isAmountFocused ? '#2a80b9' : '#2A2C29',
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
                  setAmount(value);
                }}
                value={amount}
                placeholderTextColor="white"
                onFocus={handleAmountFocus}
                onBlur={handleAmountBlur}
                keyboardType="numeric"
                textContentType="numeric"
                placeholder={isAmountFocused ? '' : '0.00'}
                selectionColor="#2a80b9"
              />
              <TouchableOpacity
                activeOpacity={0.5}
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
                    source={{}}
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
            <Text style={{ color: 'white' , marginTop: 20}}>Transaction type</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetPayPalTransactionTypeModalRef.current.present();
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
      {paypalTransactionType?.transactionType}

                  </Text>
   <FontAwesome5
                      style={{ marginTop: 15, marginLeft: 10 }}
                      name="chevron-down"
                      size={18}
                      color="white"
                    />

                </View>
             
                </TouchableOpacity>
          </ScrollView>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}>
            <Pressable
              onPressIn={handleContinuePressIn}
              onPressOut={handleContinuePressOut}
              onPress={async () => {
                handleContinuePressOut();
                let result = await httpRequest(
                  'customer/initiate-transaction-request',
                  'post',
                  {
                    transferTypeId: transferType.transferTypeId,
                    currencyId: newBalanceData.currencyId,
                    transactionTypeId: 2,
                    amount: amount,
                    payPalTransactionTypeId:paypalTransactionType?.payPalTransactionTypeId
                  },
                  true,
                  setIsLoading
                );
                if (result.status == 200) {
                  navigation.navigate('HomeTab');
                } else {
                  Alert.alert('Error', result.message);
                }
              }}
              disabled={!amount || amount <= 0 || !paypalTransactionType}
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  !amount || amount <= 0 || !paypalTransactionType
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
                        x.description
                          .toLowerCase()
                          .includes(currencySearchText.toLowerCase())
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
                          bottomSheetCurrencyModalRef.current.close();

                          setNewBalanceData(
                            global.balances.find(
                              (e) => e.currencyId == currencyData.currencyId
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
            bottomSheetModalRef={bottomSheetPayPalTransactionTypeModalRef}
            snapPoints={['40%']}
            title={'Select transaction type'}
            content={
              <View>
                  {transactionTypes
                    ?.map((transactionTypeData, index) => (
                      <PayPalTransactionTypeItem
                        key={index}
                        paypalTransactionTypeId={paypalTransactionType?.payPalTransactionTypeId}
                        paypalTransactionTypeData={transactionTypeData}
                        callback={async () => {
                          bottomSheetPayPalTransactionTypeModalRef.current.close();

                          setPaypalTransactionType(
                            transactionTypeData
                          );
                        }}
                      />
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
