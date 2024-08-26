import {
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import formateFullDate from '../utils/formateFullDate';

import { useState, useEffect } from 'react';

import httpRequest from '../utils/httpRequest';
import Entypo from 'react-native-vector-icons/Entypo';
import ErrorMessage from '../components/ErrorMessage';

export default function CustomerInitiatedTransactionRequestDetailScreen({
  route,
  navigation,
}) {
  const { requestId, balanceData, transferType, balances } = route.params;

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isErrorInput, setIsErrorInput] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);
  const [isSecurityError, setIsSecurityError] = useState(false);

  const [inputValue, setInputValue] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [transactionFee, setTransactionFee] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isRejectPressed, setIsRejectPressed] = useState(false);
  const [isApprovePressed, setIsApprovePressed] = useState(false);

  const handleRejectPressIn = () => {
    setIsRejectPressed(true);
  };

  const handleRejectRelease = () => {
    setIsRejectPressed(false);
  };

  const handleApprovePressIn = () => {
    setIsApprovePressed(true);
  };

  const handleApproveRelease = () => {
    setIsApprovePressed(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const onFocus = () => {
    httpRequest(
      'get-customer-initiated-transaction-request-detail',
      'post',
      (body = {
        RequestId: requestId,
      }),
      setIsLoading,
      true,
      navigation
    ).then((data) => {
      setRequestData(data.Data);
    });
    httpRequest(
      'get-transaction-fee',
      'get',
      null,
      null,
      (auth = false),
      navigation
    ).then((data) => {
      setTransactionFee(data.Data);
    });
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener().remove();
    };
  }, []);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#2A2C29',
          }}>
          <GoBackTopBar backgroundColor="#13150F" navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: '100%' }}>
              <View
                style={{
                  alignItems: 'center',
                  height: Dimensions.get('window').height * 0.2,
                  backgroundColor: '#2A2C29',
                }}>
                <Image
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 32.5,
                  }}
                  source={{
                    uri: global.currencies?.find(
                      (e) => e.CurrencyId == requestData?.CurrencyId
                    )?.Image,
                  }}
                />
                <Text
                  style={{
                    marginTop: 15,
                    color: 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}>
                  {requestData?.Amount} {requestData?.Currency}
                </Text>
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>
                  {requestData?.FirstName} {requestData?.LastName}
                </Text>
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
                  Request Details
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Request ID
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    #{requestData?.TransactionRequestId}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Currency
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {requestData?.Description}
                  </Text>
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
                    {requestData?.TransferType}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Request Type
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {requestData?.TransactionType}
                  </Text>
                </View>
                {requestData?.ApprovedAmount > 0.0 && (
                  <View>
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
                        Approved Amount
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {requestData?.ApprovedAmount} {requestData?.Currency}
                      </Text>
                    </View>
                  </View>
                )}
                {requestData?.RequestTypeId == 1 && (
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
                      Remaining Amount
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        marginTop: 20,
                      }}>
                      {requestData?.RemainingAmount} {requestData?.Currency}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Created Date
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {formateFullDate(new Date(requestData?.CreatedDate))}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Updated Date
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {formateFullDate(new Date(requestData?.UpdatedDate))}
                  </Text>
                </View>
                {requestData?.RequestTypeId == 2 && (
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
                      Request Fees
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
                        Our Fee
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {requestData?.TransferUpFee} {requestData?.Currency} (
                        {requestData?.TransferUpFeeValue}%)
                      </Text>
                    </View>
                    {requestData?.MerchantFee > 0.0 && (
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
                          Merchant Fee
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.MerchantFee} {requestData?.Currency} (
                          {requestData?.MerchantFeeValue}%)
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        Total Amount
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {requestData?.TotalAmount} {requestData?.Currency}
                      </Text>
                    </View>
                  </View>
                )}
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
                  Bank Information
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Bank Name
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {requestData?.BankName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Account Title
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {requestData?.AccountTitle}
                  </Text>
                </View>
                {requestData?.BankAccountNumberTypeId == 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      IBAN
                    </Text>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      {requestData?.IBAN}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    Origin of Bank
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {requestData?.CountryName}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderColor: '#2A2C29',
                  }}></View>
                <View
                  style={{
                    backgroundColor: '#13150F',
                    height: '100%',
                    marginLeft: -20,
                    paddingLeft: 20,
                    marginRight: -20,
                    paddingRight: 20,
                  }}>
                  <View
                    style={{
                      height: 50,
                      paddingLeft: 5,
                      color: 'white',
                      paddingRight: 20,
                      backgroundColor: '#2A2C29',
                      borderWidth: 2,
                      borderColor:
                        ((requestData?.RequestTypeId == 1 && isErrorInput) ||
                          (requestData?.RequestTypeId == 2 &&
                            isSecurityError) ||
                          isAmountError) &&
                        inputValue
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
                        if (
                          requestData?.RequestTypeId == 1 &&
                          parseFloat(value) > balanceData.TotalAmount
                        ) {
                          setIsErrorInput(true);
                          setIsAmountError(false);
                          setIsSecurityError(false);
                        } else if (
                          (requestData?.RequestTypeId == 1 &&
                            parseFloat(value) > requestData?.RemainingAmount) ||
                          (requestData?.RequestTypeId == 2 &&
                            (
                              parseFloat(value) +
                              parseFloat(value) *
                                transactionFee?.find((e) => e.FeeId == 1).Fee
                            ).toFixed(2) > requestData?.TotalAmount)
                        ) {
                          setIsAmountError(true);
                          setIsErrorInput(false);
                          setIsSecurityError(false);
                        } else if (
                          requestData?.RequestTypeId == 2 &&
                          parseFloat(value) > balanceData.SecurityAmount
                        ) {
                          setIsSecurityError(true);
                          setIsAmountError(false);
                          setIsErrorInput(false);
                        } else {
                          setIsAmountError(false);
                          setIsErrorInput(false);
                          setIsSecurityError(false);
                        }

                        setInputValue(parseFloat(value));
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
                  </View>
                  <ErrorMessage
                    flag={requestData?.RequestTypeId == 2 && isSecurityError}
                    message={`You can't send more than your security amount ${balanceData.SecurityAmount} ${requestData?.Currency}.`}
                  />
                  <ErrorMessage
                    flag={requestData?.RequestTypeId == 1 && isErrorInput}
                    message={`You only have ${balanceData.TotalAmount} ${requestData?.Currency} in your balance.`}
                  />
                  <ErrorMessage
                    flag={isAmountError}
                    message={`You can't ${
                      requestData?.RequestTypeId == 1 ? 'receive' : 'send'
                    } more than ${
                      requestData?.RequestTypeId == 1
                        ? requestData?.RemainingAmount
                        : requestData?.TotalAmount
                    } ${requestData?.Currency}.`}
                  />
                  {requestData?.RequestTypeId == 2 && (
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
                              width: 14,
                              height: 14,
                              marginTop: 2,
                              borderRadius: 7,
                              padding: 2,
                              marginRight: 10,
                              marginLeft: 2,
                              backgroundColor: 'white',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Entypo name="cross" size={10} color="black" />
                          </View>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              fontWeight: 'bold',
                            }}>
                            {(
                              inputValue *
                              transactionFee?.find((e) => e.FeeId == 1).Fee
                            ).toFixed(2)}{' '}
                            {requestData?.Currency} (
                            {transactionFee?.find((e) => e.FeeId == 1).Fee *
                              100}
                            %)
                          </Text>
                        </View>
                        <Text style={{ color: 'white' }}>Your Fee</Text>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              width: 14,
                              height: 14,
                              marginTop: 2,
                              borderRadius: 7,
                              padding: 2,
                              marginRight: 10,
                              marginLeft: 2,
                              backgroundColor: 'white',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Entypo name="cross" size={10} color="black" />
                          </View>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              fontWeight: 'bold',
                            }}>
                            {(
                              inputValue +
                              inputValue *
                                transactionFee?.find((e) => e.FeeId == 1).Fee
                            ).toFixed(2)}{' '}
                            {requestData?.Currency}
                          </Text>
                        </View>
                        <Text style={{ color: 'white' }}>Total Amount</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              backgroundColor: '#13150F',
            }}>
            <Pressable
              onPressIn={handleApprovePressIn}
              onPressOut={handleApproveRelease}
              disabled={
                (requestData?.RequestTypeId == 1 && isErrorInput) ||
                (requestData?.RequestTypeId == 2 && isSecurityError) ||
                !inputValue ||
                inputValue <= 0 ||
                isAmountError
              }
              onPress={() => {
                if (requestData?.RequestTypeId == 1) {
                  navigation.navigate('OTP', {
                    callBack: (emailOTP, smsOTP, setIsLoading) => {
                      httpRequest(
                        'update-transaction-request-status',
                        'post',
                        {
                          RequestId: requestData?.RequestId,
                          RequestStatusId: 2,
                          EmailOTPCode: emailOTP,
                          SMSOTPCode: smsOTP,
                          Amount: inputValue,
                        },
                        setIsLoading,
                        true,
                        navigation
                      ).then((response) => {
                        if (response.Success) {
                          navigation.navigate(
                            'CustomerInitiatedTransactionRequest',
                            {
                              balances,
                              transferType,
                              requestTypeId: 1,
                            }
                          );
                        } else {
                          Alert.alert('Error', response.Message);
                        }
                      });
                    },
                  });
                } else if (requestData?.RequestTypeId == 2) {
                  handleApproveRelease();
                  httpRequest(
                    'update-transaction-request-status',
                    'post',
                    {
                      RequestId: requestData?.RequestId,
                      RequestStatusId: 2,
                      Amount: inputValue,
                    },
                    setIsLoading,
                    true,
                    navigation
                  ).then((response) => {
                    if (response.Success) {
                      navigation.goBack();
                    } else {
                      Alert.alert('Error', response.Message);
                    }
                  });
                }
              }}
              style={{
                marginTop: 'auto',
                marginBottom: 20,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  (requestData?.RequestTypeId == 1 && isErrorInput) ||
                  (requestData?.RequestTypeId == 2 && isSecurityError) ||
                  !inputValue ||
                  inputValue <= 0 ||
                  isAmountError
                    ? '#2A2C29'
                    : isApprovePressed
                    ? 'white'
                    : '#2a80b9',
              }}>
              <Text
                style={{
                  color: isApprovePressed ? 'black' : 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Approve
              </Text>
            </Pressable>
            <Pressable
              onPressIn={handleRejectPressIn}
              onPressOut={handleRejectRelease}
              onPress={() => {
                Alert.alert(
                  'Confirmation',
                  'Are you sure you want to reject this request?',
                  [
                    {
                      text: 'Reject',
                      style: 'destructive',
                      onPress: () => {
                        httpRequest(
                          'update-transaction-request-status',
                          'post',
                          {
                            RequestId: requestData?.RequestId,
                            RequestStatusId: 4,
                          },
                          setIsLoading,
                          true,
                          navigation
                        ).then((response) => {
                          if (response.Success) {
                            navigation.goBack();
                          }
                        });
                      },
                    },
                    {
                      text: 'Cancel',
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
                backgroundColor: isRejectPressed ? '#FFBDBB' : '#13150F',
                borderColor: '#FFBDBB',
              }}>
              <Text
                style={{
                  color: isRejectPressed ? 'black' : 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Reject
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
