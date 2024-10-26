import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
  Linking
} from 'react-native';
import ScreenLoader from '../components/ScreenLoader';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import * as Clipboard from 'expo-clipboard';

import Recipient from '../components/Recipient';

import GoBackTopBar from '../components/GoBackTopBar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ErrorMessage from '../components/ErrorMessage';

import BottomSheet from '../components/BottomSheet';
import InputSearch from '../components/InputSearch';

import CurrencyItem from '../components/CurrencyItem';
import RecipientItem from '../components/RecipientItem';

import ItemLoader from '../components/ItemLoader';

import { useState, useEffect, useRef } from 'react';
import httpRequest from '../utils/httpRequest';

export default function SendMoneyScreen({ route, navigation }) {
  const { height, width } = useWindowDimensions();

  const { transferType, balanceData } = route.params;

  const bottomSheetBalanceDataModalRef = useRef(null);
  const bottomSheetRecipientModalRef = useRef(null);

  const [isDisableContinue, setIsDisableContinue] = useState(false);

  const [bankFee, setBankFee] = useState('0.00');

  const [balanceDataSearchText, setBalanceDataSearchText] = useState(null);
  const [recipientSearchText, setRecipientSearchText] = useState(null);


  const [isNoAmountError, setIsNoAmountError] = useState(false);
  const [isMinAmountError, setIsMinAmountError] = useState(false);
  const [isMinAmountErrorMsg, setIsMinAmountErrorMsg] = useState(null);

  const [isAmountFocused, setIsAmountFocused] = useState(false);

  const [transactionFee, setTransactionFee] = useState(null);

  const [isEmailAddressFocused, setEmailAddressFocused] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);

  const [recipient, setRecipient] = useState({});
  const [recipients, setRecipients] = useState([]);

  const [isPayPalFeeLinkPressed, setIsPayPalFeeLinkPressed] = useState(false);

  const handlePayPalFeeLinkPressIn = () => {
    setIsPayPalFeeLinkPressed(true);
  };

  const handlePayPalFeeLinkPressOut = () => {
    setIsPayPalFeeLinkPressed(false);
  };


  const handleEmailAddressFocus = () => {
    setEmailAddressFocused(true);
  };

  const handleEmailAddressBlur = async () => {
    setEmailAddressFocused(false);

    if (transferType.transferTypeId == 4) {
      setRecipient(null);
    let result = await httpRequest('customer/get-transfer-pay-recipient-by-email-address?emailAddress=' + emailAddress, 'get', null, true, null);
   
    
    if (result.status == 200) {
     result = await result.json();
      setRecipient(result);
    }  else {
      setRecipient({flag: true});
    }
  } else {
    setRecipient(null);
    let result = await httpRequest('customer/get-recipient-by-email-address?emailAddress=' + emailAddress + '&currencyId=' + newBalanceData?.currencyId + '&transferTypeId=' + transferType?.transferTypeId, 'get', null, true, null);
    if (result.status == 200) {
      result = await result.json();
      setRecipient(result);
    }  else {
      setRecipient({flag: true});
    }
  }
  };

  const [amount, setAmount] = useState(0.00);

  const [newBalanceData, setNewBalanceData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleAmountFocus = () => {
    setIsAmountFocused(true);
  };

  const handleAmountBlur = () => {
    setIsAmountFocused(false);

    getWiseQuote(newBalanceData);
  };

  const [isSendPressed, setIsSendPressed] = useState(false);

  const handleSendPressIn = () => {
    setIsSendPressed(true);
  };

  const handleSendPressOut = () => {
    setIsSendPressed(false);
  };

  const onFocus = async () => {
    setNewBalanceData(balanceData ?? global.balances[0]);
    setEmailAddress(route.params.emailAddress);
    getWiseQuote(balanceData ?? global.balances[0]);

    if (!route.params.recipient) {
      setRecipient({flag: true});
    } else {
      setRecipient(route.params.recipient);
    }

   let result = await httpRequest('public/get-transaction-fee', 'get', null, false, null);
   if (result.status == 200) {
    result = await result.json();
    setTransactionFee(result.find(e=>e.transactionFeeId == 2).fee)
   }

   if (transferType.transferTypeId == 9 || transferType.transferTypeId == 5  || transferType.transferTypeId == 10) {
   let recip = await httpRequest('customer/get-recipient-by-transfer-type-id?transferTypeId=' + transferType.transferTypeId, 'get', null, true, null);
   if (recip.status == 200) {
    recip = await recip.json();
    setRecipients(recip)
   }
  }
  };

  const getWiseQuote =  async (balanceData) => {
    if (amount > 0 && (transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5)) {
    setBankFee(null);
    setIsDisableContinue(true);
    let result = await httpRequest('customer/get-wise-quote?currencyId=' + balanceData?.currencyId + '&amount=' + amount, 'get', null, true, null);
    if (result.status == 200) {
      result = await result.json();
      let payment = result.paymentOptions.filter(e=>e.payIn == 'BALANCE')[0];
      if (payment) {
        if (payment.disabled) {
          setBankFee('0.00');
          setIsMinAmountError(true);
          setIsMinAmountErrorMsg(payment.disabledReason.message);
        } else {
          setBankFee(payment.fee.total.toString());
          setIsMinAmountError(false);
        } 
      } else {

        setBankFee('0.00');
        setIsMinAmountError(false);
      }
    } else if (result.status == 204) {
      setBankFee('0.00');
      setIsMinAmountError(false);
    }
    setIsDisableContinue(false);
  }
}

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
              Send money - {transferType?.transferTypeName}
            </Text>
            <Text style={{ color: 'white' }}>Amount</Text>
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
                  ((isNoAmountError || isMinAmountError) && amount) 
                  ? '#FFBDBB'
                  :
                  isAmountFocused ? '#2a80b9' : '#2A2C29',
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
                    if (!value) {
                      value = 0.00
                    }

                    if (parseFloat(value) + (parseFloat(value) * transactionFee) > newBalanceData?.totalBalance) {
                      setIsNoAmountError(true);
                    } else {
                      setIsNoAmountError(false);
                    }

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
              flag={isNoAmountError && amount}
              message={
                'You only have ' +
                newBalanceData?.totalBalance +
                ' ' +
                newBalanceData?.currency +
                ' in your balance.'
              }
            />
                <ErrorMessage
              flag={isMinAmountError && amount}
              message={
                isMinAmountErrorMsg
              }
            />
{transferType.transferTypeId != 4 &&
<View>


{!transactionFee && (
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
                {transactionFee && (
                  <View>
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
                      <Entypo name="minus" size={12} color="black" />
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {(amount * transactionFee).toFixed(2) + ' (' + (transactionFee * 100) + '%)' }{' '}
                      {newBalanceData?.currency}
                    </Text>
                  </View>
                  <Text style={{ color: 'white' }}>Our Fee</Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        marginTop: 2,
                        borderRadius: 9,
                        padding: 2,
                        marginRight: 10,
                        marginLeft: 2,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FontAwesome6 name="arrow-right-arrow-left" size={12} color="black" />
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {(parseFloat(amount) + (amount * transactionFee)).toFixed(2)}{' '}
                      {newBalanceData?.currency}
                    </Text>
                  </View>
                  <Text style={{ color: 'white' }}>Total you'll pay</Text>
                </View>
                </View>
              )}

{transferType?.transferTypeId == 2 &&
             <Pressable
             onPressIn={handlePayPalFeeLinkPressIn}
             onPressOut={handlePayPalFeeLinkPressOut}
             onPress={() => {
               Linking.openURL(
                 'https://www.paypal.com/my/webapps/mpp/merchant-fees'
               );
             }}
             onLongPress={async () => {
               await Clipboard.setStringAsync(
                 'https://www.paypal.com/my/webapps/mpp/merchant-fees'
               );
               showToast('Copied!');
             }}>
              <Text style={{
                  color:'white',
                  marginTop: 10,
                  fontSize: 16,
                  lineHeight:25,
              }}>
              PayPal may charge fee please refer to this link 
              </Text>
             <Text
               style={{
                 color: isPayPalFeeLinkPressed ? 'white' : '#2a80b9',
                 textDecorationLine: 'underline',
                 fontSize: 16,
               }}>
              PayPal Merchant Fee
             </Text>
            </Pressable>

            }

            
{((transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5)) &&
               
               <Pressable
               onPressIn={handlePayPalFeeLinkPressIn}
               onPressOut={handlePayPalFeeLinkPressOut}
               onPress={() => {
                 Linking.openURL(
                   'https://wise.com/pricing/'
                 );
               }}
               onLongPress={async () => {
                 await Clipboard.setStringAsync(
                   'https://wise.com/pricing/'
                 );
                 showToast('Copied!');
               }}>
                <Text style={{
                    color:'white',
                    fontSize: 16,
                    marginTop: 10,
                    lineHeight:25,
                }}>
                {transferType?.transferTypeId == 9 ? 'Bank' : transferType?.transferTypeId == 5 ? 'Ali Pay' : ''} may charge fee please refer to this link 
                </Text>
               <Text
                 style={{
                   color: isPayPalFeeLinkPressed ? 'white' : '#2a80b9',
                   textDecorationLine: 'underline',
                   fontSize: 16,
                 }}>
                {transferType?.transferTypeId == 9 ? 'Bank' : transferType?.transferTypeId == 5 ? 'Ali Pay' : ''} pricing
               </Text>
              </Pressable>
                                }
              </View>
            }

{!bankFee && (
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

            {bankFee && (transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5) &&
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
                    <Entypo name="minus" size={12} color="black" />
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {((bankFee)) }{' '}
                    {newBalanceData?.currency}
                  </Text>
                </View>
                <Text style={{ color: 'white' }}>{transferType?.transferTypeId == 9 ? 'Bank' : transferType?.transferTypeId == 5 ? 'Ali Pay' : ''} Fee</Text>
              </View>
            }

            {(transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5 | transferType?.transferTypeId == 10) &&
            <View>
                  <Text style={{ color: 'white' , marginTop: 20}}>Recipient</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      bottomSheetRecipientModalRef.current.present();
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
      {recipient && recipient?.firstName && recipient?.lastName ? recipient?.firstName + ' ' + recipient?.lastName : ''}

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

            }

{(transferType?.transferTypeId == 2 || transferType?.transferTypeId == 4) &&
<View>

<Text style={{ color: 'white', marginTop:20 }}>Email Address</Text>
                <TextInput
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
                    borderColor:
                       isEmailAddressFocused
                        ? '#2a80b9'
                        : '#2A2C29',
                    borderWidth: 2,
                    marginTop: 10,
                  }}
                  onChangeText={(value) => {
                

                    setEmailAddress(value);
                  }}
                  value={emailAddress}
                  onFocus={handleEmailAddressFocus}
                  onBlur={handleEmailAddressBlur}
                  selectionColor="#2a80b9"
                />
                </View>
              }
              
              {!recipient && (
             <View style={{ marginLeft: -20 , marginTop:10, flex: 'row' }}>
             <ItemLoader key={1} count={1} />
           </View>
            )}

            {(recipient?.customerRecipientId || recipient?.emailAddress) && 
            <Recipient recipient={recipient} />

            }

        
        
          </ScrollView>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}>
            <Pressable
              onPressIn={handleSendPressIn}
              onPressOut={handleSendPressOut}
              onPress={async() => {
                handleSendPressOut();

                if (transferType?.transferTypeId == 4) {
                  let result = await httpRequest('customer/transfer-pay-transaction', 'post', {
                    currencyId: newBalanceData.currencyId,
                    amount: amount,
                    emailAddress: emailAddress
                  }, true, setIsLoading);

                  if (result.status == 200) {
                    navigation.navigate('Home');
                  } else {
                    Alert.alert('Error', result.message);
                  }
                } else {
                  let result = await httpRequest('customer/initiate-transaction-request', 'post', {
                    transferTypeId: transferType?.transferTypeId,
                    currencyId: newBalanceData.currencyId,
                    transactionTypeId: 1,
                    amount: amount,
                    emailAddress: newBalanceData?.currencyId == 1006 ? recipient?.emailAddress : emailAddress,
                    recipientId: recipient?.recipientId,
                    firstName: recipient?.firstName,
                    lastName: recipient?.lastName,
                    bicswift: recipient?.bicswift,
                    accountNumber: newBalanceData?.currencyId == 1006 ? null : recipient?.accountNumber,
                    iban: recipient?.iban
                  }, true, setIsLoading);

                  if (result.status == 200) {
                    navigation.navigate('Home');
                  } else {
                    Alert.alert('Error', result.message);
                  }
              }
              }}
              disabled={ isDisableContinue ||
                isNoAmountError || !amount ||  isMinAmountError ||
                (!emailAddress && (transferType?.transferTypeId == 2 || transferType?.transferTypeId == 4)) || 
                ((transferType.transferTypeId == 4 || transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5) && recipient?.flag)
              }
              style={{
                marginTop: 'auto',
                marginBottom: 40,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:   isDisableContinue ||
                isNoAmountError  || !amount || isMinAmountError ||
                (!emailAddress && (transferType?.transferTypeId == 2 || transferType?.transferTypeId == 4)) || 
                ((transferType.transferTypeId == 4 || transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5) && recipient?.flag)
                  ? '#2A2C29'
                  : isSendPressed
                  ? 'white'
                  : '#2a80b9',
              }}>
              <Text
                style={{
                  color: isSendPressed ? 'black' : 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Send
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
                    ?.filter(e=> (transferType?.transferTypeId != 2 && transferType?.transferTypeId != 9 && transferType?.transferTypeId != 5 && transferType?.transferTypeId != 10)|| 
                      ((transferType?.transferTypeId == 2 || transferType?.transferTypeId == 9 || transferType?.transferTypeId == 5 || transferType?.transferTypeId == 10) && global.transferTypes?.some(t=> (t.transferTypeId == transferType?.transferTypeId) && t.currencyId?.split(',').some(x=>x == e.currencyId))) 
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

                          getWiseQuote(global.balances.find(
                            (e) => e.currencyId == currencyData.currencyId
                          ));
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
{(transferType.transferTypeId == 9 || transferType?.transferTypeId == 5 || transferType?.transferTypeId == 10) &&
<BottomSheet
            bottomSheetModalRef={bottomSheetRecipientModalRef}
            snapPoints={['90%']}
            title={'Select recipient'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setRecipientSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {recipients
                    ?.filter(
                      (x) =>
                        !recipientSearchText ||
                        (x.firstName + ' ' + x.lastName)
                          .toLowerCase()
                          .includes(recipientSearchText.toLowerCase())
                    )?.filter(e=>e.currencyId == newBalanceData?.currencyId)
                    ?.map((recipientData, index) => (
                      <RecipientItem
                        key={index}
                        recipientId={recipient}
                        backgroundColor={"#2A2C29"}
                        customerRecipientId={recipient.customerRecipientId}
                        isRadioButton={true}
                        recipientData={recipientData}
                        callback={async () => {
                          bottomSheetRecipientModalRef.current.close();

                          setRecipient(recipientData);
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
          }

        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
