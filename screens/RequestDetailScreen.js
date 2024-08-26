import {
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';

import * as Clipboard from 'expo-clipboard';
import CustomToast from '../components/CustomToast';
import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import * as TransactionService from '../services/transaction/TransactionService';

import StatusView from '../components/StatusView';
import RequestDetailRequestItem from '../components/RequestDetailRequestItem';
import TransferTypeItem2 from '../components/TransferTypeItem2';

import formateFullDate from '../utils/formateFullDate';

import { useState, useEffect } from 'react';

import httpRequest from '../utils/httpRequest';

export default function RequestDetailScreen({ route, navigation }) {
  const { requestId, transactionRequestId, requestTypeId } = route.params;

  const [isCancelPressed, setIsCancelPressed] = useState(false);
  const [isCompletePressed, setIsCompletePressed] = useState(false);

  const [requests, setRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState(null);
  const [transferTypes, setTransferTypes] = useState(null);

  const [isRequestSeeAllPressed, setIsRequestSeeAllPressed] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastNessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  const handleRequestSeeAllPressIn = () => {
    setIsRequestSeeAllPressed(true);
  };

  const handleRequestSeeAllRelease = () => {
    setIsRequestSeeAllPressed(false);
  };

  const onFocus = () => {
    if (global.entityId == 2) {
      httpRequest(
        'get-customer-transaction-request',
        'post',
        (body = {
          TransactionRequestId: transactionRequestId,
          Offset: 0,
          Fetch: 10,
        }),
        null,
        true,
        navigation
      ).then((data) => {
        setRequests(data.Data);
      });
      httpRequest(
        'get-customer-transaction-request-detail',
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
      if (requestTypeId == 5) {
        httpRequest(
          'get-request-money-transfer-type',
          'post',
          (body = {
            RequestId: requestId,
          }),
          null,
          true,
          navigation
        ).then((data) => {
          setTransferTypes(data.Data);
        });
      }
    } else if (global.entityId == 1) {
      httpRequest(
        'get-merchant-transaction-request-detail',
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
    }
  };

  const handleCancelPressIn = () => {
    setIsCancelPressed(true);
  };

  const handleCancelRelease = () => {
    setIsCancelPressed(false);
  };

  const handleCompletePressIn = () => {
    setIsCompletePressed(true);
  };

  const handleCompleteRelease = () => {
    setIsCompletePressed(false);
  };

  const [isRequestURLPressed, setIsRequestURLPressed] = useState(false);

  const handleRequestURLPressIn = () => {
    setIsRequestURLPressed(true);
  };

  const handleRequestURLRelease = () => {
    setIsRequestURLPressed(false);
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', onFocus);

    return () => {
      onFocusListener()?.remove();
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
          <CustomToast
            message={toastNessage}
            visible={toastVisible}
            onClose={closeToast}
          />
          <GoBackTopBar backgroundColor="#13150F" navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: '100%' }}>
              <View
                style={{
                  alignItems: 'center',
                  height: Dimensions.get('window').height * 0.25,
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
                    color:
                      requestData?.Amount > 0 &&
                      requestData?.RequestStatusId == 9
                        ? '#9EE6A8'
                        : requestData?.Amount < 0 &&
                          requestData?.RequestStatusId == 9
                        ? '#FFBDBB'
                        : global.entityId == 2 &&
                          requestData?.RequestTypeId == 2 &&
                          requestData?.RequestStatusId == 1
                        ? '#FFBDBB'
                        : global.entityId == 2 &&
                          requestData?.RequestTypeId == 1 &&
                          requestData?.TransferTypeId == 2 &&
                          requestData?.RequestStatusId == 3
                        ? '#2a80b9'
                        : 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}>
                  {requestData?.Amount > 0 &&
                  (requestData?.RequestStatusId == 9 ||
                    (global.entityId == 2 &&
                      requestData?.RequestTypeId == 1 &&
                      requestData?.TransferTypeId == 2 &&
                      requestData?.RequestStatusId == 3))
                    ? '+'
                    : ''}
                  {requestData?.Amount} {requestData?.Currency}
                </Text>
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>
                  {requestData?.FirstName} {requestData?.LastName}
                </Text>
                <View style={{ marginTop: 20 }}>
                  <StatusView
                    borderColor={
                      requestData?.RequestStatusId == 1 ||
                      requestData?.RequestStatusId == 3
                        ? '#2a80b9'
                        : requestData?.RequestStatusId == 7
                        ? '#FFBDBB'
                        : requestData?.RequestStatusId == 9
                        ? '#9EE6A8'
                        : ''
                    }
                    status={requestData?.RequestStatus}
                    color={
                      requestData?.RequestStatusId == 1 ||
                      requestData?.RequestStatusId == 3
                        ? '#2a80b9'
                        : requestData?.RequestStatusId == 7 ||
                          requestData?.RequestStatusId == 9
                        ? 'black'
                        : ''
                    }
                    backgroundColor={
                      requestData?.RequestStatusId == 7
                        ? '#FFBDBB'
                        : requestData?.RequestStatusId == 9
                        ? '#9EE6A8'
                        : ''
                    }
                    fontWeight={
                      requestData?.RequestStatusId == 7 ||
                      requestData?.RequestStatusId == 9
                        ? 'bold'
                        : ''
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
                {requestData?.RequestStatusId == 7 && global.entityId == 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      Last Decision
                    </Text>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      {requestData?.YourRequestStatus}
                    </Text>
                  </View>
                )}

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
                    Transfer Method
                  </Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                    {requestData?.TransferMethod}
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
                {requestData?.RequestTypeId == 2 && global.entityId == 2 && (
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
                        Receiver Type
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {requestData?.ReceiverType}
                      </Text>
                    </View>
                    {requestData?.ReceiverTypeId == 1 && (
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
                          Request Mode
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.RequestMode}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                {requestData?.RequestTypeId == 5 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      Request URL
                    </Text>
                    <Pressable
                      onPressIn={handleRequestURLPressIn}
                      onPressOut={handleRequestURLRelease}
                      onPress={async () => {
                        await Clipboard.setStringAsync(requestData?.RequestURL);
                        showToast('Copied!');
                      }}>
                      <Text
                        style={{
                          color: isRequestURLPressed ? 'white' : '#2a80b9',
                          fontSize: 16,
                          marginTop: 20,
                          textDecorationLine: 'underline',
                        }}>
                        {requestData?.RequestURL}
                      </Text>
                    </Pressable>
                  </View>
                )}
                {requestData?.Fee > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      Requested Amount
                    </Text>
                    <Text
                      style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                      {requestData?.RequestedAmount} {requestData?.Currency}
                    </Text>
                  </View>
                )}
                {global.entityId == 2 &&
                  requestData?.RequestStatusId != 7 &&
                  (requestData?.RequestTypeId == 1 ||
                    requestData?.RequestTypeId == 2) && (
                    <View>
                      {requestData?.ApprovedAmount > 0.0 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontWeight:
                                requestData?.ApprovedAmount > 0 ? 'bold' : '',
                              color: 'white',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            Approved Amount
                          </Text>
                          <Text
                            style={{
                              color:
                                requestData?.ApprovedAmount > 0
                                  ? '#2a80b9'
                                  : 'white',
                              fontWeight:
                                requestData?.ApprovedAmount > 0 ? 'bold' : '',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            {requestData?.ApprovedAmount}{' '}
                            {requestData?.Currency}
                          </Text>
                        </View>
                      )}
                      {requestData?.ReceivedAmount > 0.0 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontWeight:
                                requestData?.ReceivedAmount > 0 ? 'bold' : '',
                              color: 'white',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            Received Amount
                          </Text>
                          <Text
                            style={{
                              fontWeight:
                                requestData?.ReceivedAmount > 0 ? 'bold' : '',
                              color:
                                requestData?.RequestTypeId == 1 &&
                                requestData?.ReceivedAmount > 0
                                  ? '#9EE6A8'
                                  : 'white',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            {requestData?.RequestTypeId == 1 &&
                            requestData?.ReceivedAmount > 0
                              ? '+'
                              : ''}
                            {requestData?.ReceivedAmount}{' '}
                            {requestData?.Currency}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
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
                {requestData?.RequestTypeId == 5 && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        Country
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        {requestData?.CountryName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        Expired Date
                      </Text>
                      <Text
                        style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
                        {
                          formateFullDate(
                            new Date(requestData?.ExpiredDate)
                          ).split(',')[0]
                        }
                      </Text>
                    </View>
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
                {requestData?.PayPalAccountTypeId == 1 && (
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
                      PayPal Information
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
                          flex: 1,
                        }}>
                        Email Address
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginTop: 20,
                          flex: 2,
                        }}>
                        {requestData?.PayPalEmailAddress}
                      </Text>
                    </View>
                  </View>
                )}
                {global.entityId == 2 &&
                  requestData?.RequestTypeId == 2 &&
                  requestData?.ReceiverTypeId == 2 && (
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
                        Beneficiary Details
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
                          {requestData?.FirstName + ' ' + requestData?.LastName}
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
                          {requestData?.EmailAddress}
                        </Text>
                      </View>
                    </View>
                  )}
                {requestData?.Fee > 0 && (
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
                      Fees Details
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
                        Fee
                      </Text>
                      <Text
                        style={{
                          color:
                            requestData?.RequestStatusId == 9
                              ? '#FFBDBB'
                              : requestData?.RequestStatusId == 3
                              ? '#2a80b9'
                              : 'white',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        {requestData?.Fee} {requestData?.Currency} (
                        {requestData?.FeeValue}%)
                      </Text>
                    </View>
                  </View>
                )}
                {(requestData?.RequestTypeId == 1 ||
                  requestData?.RequestTypeId == 2) &&
                  requestData?.TransferTypeId == 1 && (
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
                        Bank Information
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
                          Bank Name
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.BankName}
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
                          Account Title
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
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
                            style={{
                              color: 'white',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            IBAN
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            {requestData?.IBAN}
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
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          Origin of Bank
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.CountryName}
                        </Text>
                      </View>
                    </View>
                  )}
                {global.entityId == 1 &&
                  (requestData?.RequestStatusId == 2 ||
                    requestData?.RequestStatusId == 3 ||
                    requestData?.RequestStatusId == 7 ||
                    requestData?.RequestStatusId == 5 ||
                    requestData?.RequestStatusId == 9) && (
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
                        Your Bank Information
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
                          Bank Name
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.YourBankName}
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
                          Account Title
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.YourAccountTitle}
                        </Text>
                      </View>
                      {requestData?.YourBankAccountNumberTypeId == 1 && (
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
                            IBAN
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              marginTop: 20,
                            }}>
                            {requestData?.YourIBAN}
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
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          Origin of Bank
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginTop: 20,
                          }}>
                          {requestData?.YourCountryName}
                        </Text>
                      </View>
                    </View>
                  )}
                {global.entityId == 2 && transferTypes && (
                  <View>
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: '#2A2C29',
                      }}></View>
                    <View
                      style={{
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        Payment Methods
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: -20,
                        marginRight: -20,
                      }}>
                      {transferTypes?.map((transferData, index) => (
                        <TransferTypeItem2
                          key={index}
                          transferTypeData={transferData}
                          isDisabled={true}
                        />
                      ))}
                    </View>
                  </View>
                )}
                {global.entityId == 2 && requests && (
                  <View>
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderColor: '#2A2C29',
                      }}></View>
                    <View
                      style={{
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        Requests
                      </Text>
                      <Pressable
                        onPressIn={handleRequestSeeAllPressIn}
                        onPressOut={handleRequestSeeAllRelease}
                        onPress={() => {
                          navigation.navigate('Request', {
                            requests: requests.filter((e) =>
                              balances
                                ?.map((x) => x.CurrencyId)
                                .includes(e.CurrencyId)
                            ),
                            filter: [
                              () => true,
                              () => true,
                              () => true,
                              () => true,
                              () => true,
                              () => true,
                              () => true,
                              () => true,
                            ],
                          });
                        }}>
                        <Text
                          style={{
                            color: isRequestSeeAllPressed ? 'white' : '#2a80b9',
                            fontSize: 20,
                            textDecorationLine: 'underline',
                          }}>
                          See all
                        </Text>
                      </Pressable>
                    </View>
                    <View
                      style={{
                        marginLeft: -20,
                        marginRight: -20,
                      }}>
                      {requests?.map((requestData, index) => (
                        <RequestDetailRequestItem
                          key={index}
                          navigation={navigation}
                          requestData={requestData}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          {requestData?.TransferTypeId == 2 &&
            requestData?.RequestStatusId == 1 && (
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  backgroundColor: '#13150F',
                }}>
                <Pressable
                  onPressIn={handleCompletePressIn}
                  onPressOut={handleCompleteRelease}
                  onPress={async () => {
                    handleCompleteRelease();
                    var result =
                      await TransactionService.updateTransactionRequestStatus(
                        requestData?.RequestId,
                        3,
                        setIsLoading,
                        navigation
                      );
                    if (result.Success) {
                      navigation.goBack();
                    } else {
                      Alert.alert('Error', result.Message);
                    }
                  }}
                  style={{
                    marginTop: 'auto',
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isCompletePressed ? 'white' : '#2a80b9',
                  }}>
                  <Text
                    style={{
                      color: isCompletePressed ? 'black' : 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Approve
                  </Text>
                </Pressable>
              </View>
            )}
          {global.entityId == 2 &&
            requestData?.ApprovedAmount == requestData?.ReceivedAmount &&
            requestData?.ReceivedAmount > 0 &&
            requestData?.RequestStatusId != 10 &&
            requestData?.RequestStatusId != 9 && (
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  backgroundColor: '#13150F',
                }}>
                <Pressable
                  onPressIn={handleCompletePressIn}
                  onPressOut={handleCompleteRelease}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to complete this request?',
                      [
                        {
                          text: 'Complete',
                          onPress: async () => {
                            var result =
                              await TransactionService.updateTransactionRequestStatus(
                                requestData?.RequestId,
                                10,
                                setIsLoading,
                                navigation
                              );
                            if (result.Success) {
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
                    marginTop: 'auto',
                    marginBottom: 40,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isCompletePressed ? 'white' : '#2a80b9',
                  }}>
                  <Text
                    style={{
                      color: isCompletePressed ? 'black' : 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Complete
                  </Text>
                </Pressable>
              </View>
            )}
          {global.entityId == 2 &&
            requestData?.RequestStatusId == 1 &&
            !requestData?.ApprovedAmount && (
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  backgroundColor: '#13150F',
                }}>
                <Pressable
                  onPressIn={handleCancelPressIn}
                  onPressOut={handleCancelRelease}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to cancel this request?',
                      [
                        {
                          text: 'Cancel',
                          style: 'destructive',
                          onPress: () => {
                            httpRequest(
                              'update-transaction-request-status',
                              'post',
                              {
                                RequestId: requestData?.RequestId,
                                RequestStatusId: 7,
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
            )}
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
