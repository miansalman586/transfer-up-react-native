import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Pressable,
  Linking,
  Alert
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as Clipboard from 'expo-clipboard';

import CustomToast from '../components/CustomToast';

import StatusView from '../components/StatusView';
import ScreenLoader from '../components/ScreenLoader';

import { useState, useEffect } from 'react';

import httpRequest from '../utils/httpRequest';

export default function TransactionDetailScreen({ route, navigation }) {
  const { transactionId } = route.params;

  const [transactionData, setTransactionData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isGoBackPressed, setIsGoBackPressed] = useState(false);

  const handleGoBackPressIn = () => {
    setIsGoBackPressed(true);
  };

  const handleGoBackRelease = () => {
    setIsGoBackPressed(false);
  };

  const [isPayPalLinkPressed, setIsPayPalLinkPressed] = useState(false);

  const handlePayPalLinkPressIn = () => {
    setIsPayPalLinkPressed(true);
  };

  const handlePayPalLinkPressOut = () => {
    setIsPayPalLinkPressed(false);
  };

  const [isTransactionNumberPressed, setIsTransactionNumberPressed] = useState(false);

  const handleTransactionNumberPressIn = () => {
    setIsTransactionNumberPressed(true);
  };

  const handleTransactionNumberPressOut = () => {
    setIsTransactionNumberPressed(false);
  };

  const [isPayPalAccountEmailAddressPressed, setIsPayPalAccountEmailAddressPressed] = useState(false);

  const handlePayPalAccountEmailAddressPressIn = () => {
    setIsPayPalAccountEmailAddressPressed(true);
  };

  const handlePayPalAccountEmailAddressPressOut = () => {
    setIsPayPalAccountEmailAddressPressed(false);
  };

  const [toastVisible, setToastVisible] = useState(false);
  const [toastNessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  const [isCancelPressed, setIsCancelPressed] = useState(false);

  const handleCancelPressIn = () => {
    setIsCancelPressed(true);
  };

  const handleCancelPressOut = () => {
    setIsCancelPressed(false);
  };

  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePressIn = () => {
    setIsContinuePressed(true);
  };

  const handleContinuePressOut = () => {
    setIsContinuePressed(false);
  };

  const onFocus = async () => {
    let transactionData = await httpRequest(
      'customer/get-transaction-detail?transactionId=' + transactionId,
      'get',
      null,
      true,
      setIsLoading
    );
    transactionData = await transactionData.json();
    setTransactionData(transactionData);
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
            backgroundColor: '#2A2C29',
          }}>
          <CustomToast
            message={toastNessage}
            visible={toastVisible}
            onClose={closeToast}
          />
          <View
            style={{
              height: '13%',
              paddingLeft: 20,
              justifyContent: 'center',
            }}>
            <StatusBar barStyle="light-content" />
            <Pressable
              onPressIn={handleGoBackPressIn}
              onPressOut={handleGoBackRelease}
              style={{
                width: 55,
                height: 55,
                marginTop: 40,
                borderRadius: 27.5,
                backgroundColor: '#2A2C29',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesome5
                name="arrow-left"
                size={27.5}
                color={isGoBackPressed ? 'white' : '#2a80b9'}
              />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: '100%' }}>
              <View
                style={{
                  alignItems: 'center',
                  height: Dimensions.get('window').height * 0.23,
                  backgroundColor: '#2A2C29',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5
                    name={
                      transactionData?.transactionTypeId == 1 &&
                      transactionData?.transferTypeId != 3
                        ? 'arrow-up'
                        : transactionData?.transactionTypeId == 2 &&
                          transactionData?.transferTypeId != 3
                        ? 'arrow-down'
                        : transactionData?.transferTypeId == 3
                        ? 'arrows-alt-h'
                        : ''
                    }
                    size={40}
                    color="white"
                  />
                </View>
                <Text
                  style={{
                    marginTop: 15,
                    color:
                      transactionData?.transactionTypeId == 1 &&
                      transactionData?.transactionStatusId == 3
                        ? '#FFBDBB'
                        : transactionData?.transactionTypeId == 2 &&
                          transactionData?.transactionStatusId == 3
                        ? '#9EE6A8'
                        : transactionData?.transactionStatusId == 2
                        ? '#2a80b9' :
                        transactionData?.transactionStatusId == 1 ?
                        '#ecd271'
                        : 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}>
                  {transactionData?.transactionTypeId == 2 &&
                  (transactionData.transactionStatusId == 3 ||
                    transactionData?.transactionStatusId == 2 || transactionData?.transactionStatusId == 1)
                    ? '+'
                    : ''}
                  {transactionData?.totalAmount} {transactionData?.currency}
                </Text>
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>
                  {transactionData?.name}
                </Text>
                <View style={{ marginTop: 20 }}>
                  <StatusView
                    borderColor={
                      transactionData?.transactionStatusId == 3
                        ? '#9EE6A8' :
                        transactionData?.transactionStatusId == 5 || transactionData?.transactionStatusId == 
                       4  ? 'white'
                        : '#2a80b9'
                    }
                    backgroundColor={
                      transactionData?.transactionStatusId == 3 ? '#9EE6A8' : transactionData?.transactionStatusId == 5 || transactionData?.transactionStatusId == 4 ? 'white': ''
                    }
                    status={transactionData?.transactionStatus}
                    color={
                      transactionData?.transactionStatusId == 3 || transactionData?.transactionStatusId == 5 || transactionData?.transactionStatusId == 4
                        ? 'black'
                        : '#2a80b9'
                    }
                    fontWeight={
                      transactionData?.transactionStatusId == 3 || transactionData?.transactionStatusId == 5 || transactionData?.transactionStatusId == 4 ? 'bold' : ''
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: '100%',
                  backgroundColor: '#13150F',
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 30,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  Transaction Details
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Transaction Number
                  </Text>
                  <Pressable
                          onPressIn={handleTransactionNumberPressIn}
                          onPressOut={handleTransactionNumberPressOut}
                          onLongPress={async () => {
                            await Clipboard.setStringAsync(
                              transactionData?.transactionId.toString()
                            );
                            showToast('Copied!');
                          }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20,
                           color: isTransactionNumberPressed ? 'white' : '#2a80b9',
                           textDecorationLine: 'underline'
                   }}>
                    #{transactionData?.transactionId}
                  </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Transfer Type
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {transactionData?.transferType}
                  </Text>
                </View>
                {transactionData?.transferTypeId == 2 && transactionData?.transactionTypeId == 2 &&
                 <View
                 style={{
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                 }}>
                 <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                   Transaction Type
                 </Text>
                 <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                   {transactionData?.paypalTransactionType}
                 </Text>
               </View>
                }
                {transactionData?.transferTypeId == 4 && (
                  <View>
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: '#2A2C29',
                      }}></View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}>
                      {transactionData?.transactionTypeId == 1
                        ? 'Payee Details'
                        : 'Payer Details'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        Full Name
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {transactionData?.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        Email Address
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {transactionData?.p2PEmailAddress}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        Received Amount
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {transactionData?.p2PAmount}{' '}
                        {transactionData?.p2PCurrency}
                      </Text>
                    </View>
                  </View>
                )}
                {transactionData?.transferTypeId == 3 && (
                  <View>
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: '#2A2C29',
                      }}></View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}>
                      Conversion Details
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        Converted From
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        {transactionData.conversionFromAmount}{' '}
                        {transactionData.conversionFromCurrency}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        Converted To
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        {transactionData?.conversionToAmount}{' '}
                        {transactionData?.conversionToCurrency}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        Exchange Rate
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        1 {transactionData.conversionFromCurrency} ={' '}
                        {transactionData?.exchangeRate}{' '}
                        {transactionData?.conversionToCurrency}
                      </Text>
                    </View>
                  </View>
                )}
                {transactionData?.transferTypeId == 2 && (
                  <View>
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: '#2A2C29',
                      }}></View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}>
                      Fee Details
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                         Amount
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        {transactionData?.sentAmount}{' '}
                        {transactionData?.currency}
                      </Text>
                    </View>
                    {transactionData?.transactionTypeId == 1 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          Our Fee
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {transactionData.transferUpTransactionFee}{' '}
                          {transactionData?.currency}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        PayPal Fee
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        {transactionData?.payPalTransactionFee}{' '}
                        {transactionData?.currency}
                      </Text>
                    </View>
                    {transactionData?.transactionTypeId == 1 && transactionData?.transactionStatusId == 3 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          Received Amount
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {transactionData?.receivedAmount}{' '}
                          {transactionData?.currency}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                {transactionData?.transferTypeId == 2 
                  && (
                    <View>
                      <View
                        style={{
                          marginTop: 20,
                          marginBottom: 15,
                          borderWidth: 1,
                          borderColor: '#2A2C29',
                        }}></View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        PayPal Details
                      </Text>
                   
                        {transactionData?.transactionStatusId == 3 && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                                marginTop: 20,
                              }}>
                              Full Name
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                                marginTop: 20,
                              }}>
                              {transactionData?.name}
                            </Text>
                          </View>
                        )}
                        { transactionData?.payPalEmailAddress  &&
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                                marginTop: 20,
                              }}>
                              Email Address
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                                marginTop: 20,
                              }}>
                              {transactionData.payPalEmailAddress}
                            </Text>
                          </View>
}
                    
                      {transactionData?.payPalOrderCaptureURL && (
                        <Pressable
                          onPressIn={handlePayPalLinkPressIn}
                          onPressOut={handlePayPalLinkPressOut}
                          onPress={() => {
                            Linking.openURL(
                              transactionData?.payPalOrderCaptureURL
                            );
                          }}
                          onLongPress={async () => {
                            await Clipboard.setStringAsync(
                              transactionData?.payPalOrderCaptureURL
                            );
                            showToast('Copied!');
                          }}>
                          <Text
                            style={{
                              color: isPayPalLinkPressed ? 'white' : '#2a80b9',
                              textDecorationLine: 'underline',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            {transactionData?.payPalOrderCaptureURL}
                          </Text>
                        </Pressable>
                      )}
                      {transactionData?.paypalTransactionTypeId == 1 &&
                      <View>
                        {transactionData?.transactionStatusId == 1 &&
  <Text
  style={{
    color:'white',
    fontSize: 16,
    marginTop: 20,
    lineHeight:25,
    fontWeight: 'bold'
  }}>
  Please send the payment to our PayPal email address and include the transaction number in the notes while you are sending money otherwise, we won't be able to track your payment.
</Text>
                        }
                    

                      

<View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        Email Address
                      </Text>
                      <Pressable
  onPressIn={handlePayPalAccountEmailAddressPressIn}
  onPressOut={handlePayPalAccountEmailAddressPressOut}
onLongPress={async () => {
await Clipboard.setStringAsync(
  transactionData?.payPalAccountEmailAddress
);
showToast('Copied!');
}}>
                    
                      <Text
                        
                        style={{  textDecorationLine: 'underline',    color: isPayPalAccountEmailAddressPressed ? 'white' : '#2a80b9', fontSize: 16, marginTop: 20, }}>
                        {transactionData?.payPalAccountEmailAddress}
                        
                      </Text>
 </Pressable>                     
                    </View>
</View>
                      }
                    </View>
                  )}
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#2A2C29',
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, }}>
                    Last Update
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                    }}>
                    {new Date(transactionData?.date).toLocaleString()}
                  </Text>
                </View>
                {transactionData?.rejectedReason && 
    <View
    style={{
      flexDirection: 'column'
    }}>
    <Text style={{ color: '#FFBDBB',  fontWeight: 'bold', fontSize: 16,  }}>
     Reason:
    </Text>
    <Text
      style={{
        color: 'white',
        fontSize: 16,
        marginTop: 10,
      }}>
      {transactionData?.rejectedReason}
    </Text>
  </View>
                }
              </View>
            </View>
          </ScrollView>
          {transactionData?.transactionStatusId == 1 && (
            <View>
            
            {transactionData?.paypalTransactionTypeId == 1 &&
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
        let result = await httpRequest(
          'customer/update-customer-transaction-status',
          'put',
          {
            transactionId: transactionId,
            transactionStatusId: 2,
          },
          true,
          setIsLoading
        );
        if (result.success) {
          navigation.navigate('HomeTab');
        } else {
          Alert.alert('Error', result.message);
        }
      }}
      style={{
        marginTop: 'auto',
        height: 50,
        borderRadius: 50,
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
}



          <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  backgroundColor: '#13150F',
                }}>
             
                <Pressable
                  onPressIn={handleCancelPressIn}
                  onPressOut={handleCancelPressOut}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to cancel this transaction?',
                      [
                        {
                          text: 'Cancel',
                          style: 'destructive',
                          onPress: async () => {
                           let result = await httpRequest('customer/update-customer-transaction-status', 'post', {
                            transactionId: transactionId,
                            transactionStatusId: 4
                           }, true, setIsLoading);

                           if (result.success) {
                            navigation.goBack();
                           } else {
                            Alert.alert('Error', result.Message);
                           }
                          },
                        },
                        {
                          text: 'No',
                          style: 'cancel',
                        },
                      ]
                    );
                  }}
                  style={{
                    fontSize: 18,
                    marginBottom: 40,
                    height: 52,
                    borderRadius: 52,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    backgroundColor: isCancelPressed ? '#FFBDBB' : '#13150F',
                    borderColor: '#FFBDBB',
                  }}>
                  <Text
                    style={{
                      color: isCancelPressed ? 'black' : 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </Pressable>
              </View>
              </View>
            )}
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
