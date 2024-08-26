import {
  View,
  ScrollView,
  Image,
  Text,
  Switch,
  Alert,
  Pressable,
} from 'react-native';

import GoBackTopBar from '../components/GoBackTopBar';
import ScreenLoader from '../components/ScreenLoader';

import httpRequest from '../utils/httpRequest';

import formateFullDate from '../utils/formateFullDate';

import { useEffect, useState } from 'react';

export default function BeneficiaryDetailScreen({ route, navigation }) {
  const [isClosePressed, setisClosePressed] = useState(false);
  const [isResendPressed, setIsResendPressed] = useState(false);

  const [bankData, setBankData] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const {
    bankId,
    type,
    requests,
    transactions,
    balanceData,
    balances,
    currencies,
    rewards,
    securities,
  } = route.params;

  const handleClosePressIn = () => {
    setisClosePressed(true);
  };

  const handleCloseRelease = () => {
    setisClosePressed(false);
  };

  const handleResendPressIn = () => {
    setIsResendPressed(true);
  };

  const handleResendRelease = () => {
    setIsResendPressed(false);
  };

  const [isCancelPressed, setIsCancelPressed] = useState(false);

  const handleCancelPressIn = () => {
    setIsCancelPressed(true);
  };

  const handleCancelRelease = () => {
    setIsCancelPressed(false);
  };

  const onFocus = () => {
    if (global.entityId == 2) {
      httpRequest(
        'get-customer-beneficiary-detail',
        'post',
        {
          BankId: bankId,
        },
        setIsLoading,
        true,
        navigation
      ).then((data) => {
        setBankData(data.Data);
      });
    }
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
          {type == 'balance' && (
            <GoBackTopBar
              navigation={navigation}
              goBackScreen="Balance"
              data={{
                requests,
                transactions,
                balanceData,
                balances,
                currencies,
                rewards,
                securities,
              }}
            />
          )}
          {!type && <GoBackTopBar navigation={navigation} />}
          <ScrollView
            contentContainerStyle={{ paddingLeft: 20 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                }}
                source={{ uri: bankData.Flag }}
              />
              <Text
                style={{
                  marginTop: 15,
                  color: 'white',
                  fontSize: 28,
                }}>
                {bankData.FirstName} {bankData.LastName}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 16,
                }}>
                {bankData.BankName}
              </Text>
              <Pressable
                style={{ marginTop: 15 }}
                onPress={() => {
                  if (!bankData.IsVerifiedEmailAddress) {
                    Alert.alert(
                      'Alert',
                      'Your beneficiary email address is not verified.'
                    );
                  } else if (bankData?.AccountStatusId != 5) {
                    Alert.alert(
                      'Alert',
                      'Your beneficiary status is not verified.'
                    );
                  } else if (global.balances.length == 0) {
                    Alert.alert('Alert', 'You have no open balance.');
                  } else if (
                    !global.balances.some((e) => e.TotalAmount > 0.0)
                  ) {
                    Alert.alert('Alert', 'You have no funds in your balance.');
                  } else {
                    navigation.navigate('SendMoney', {
                      balanceData: global.balances.find(
                        (e) => e.CurrencyId == bankData?.CurrencyId
                      ),
                      transferType: { TransferTypeId: 1 },
                    });
                  }
                }}>
                <View
                  style={{
                    width: 90,
                    height: 35,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      global.balances.length == 0 ||
                      bankData?.AccountStatusId != 5 ||
                      !bankData.IsVerifiedEmailAddress ||
                      !global.balances.some((e) => e.TotalAmount > 0.0)
                        ? '#2A2C29'
                        : '#2a80b9',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Send
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Email Address
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    marginTop: !bankData.IsVerifiedEmailAddress ? 0 : 5,
                    color: 'white',
                  }}>
                  {bankData.EmailAddress}{' '}
                  {bankData.IsVerifiedEmailAddress
                    ? '(Verified)'
                    : '(Not Verified)'}
                </Text>
              </View>
              {!bankData.IsVerifiedEmailAddress && (
                <Pressable
                  onPressIn={handleResendPressIn}
                  onPressOut={handleResendRelease}
                  onPress={() => {
                    handleResendRelease();
                    httpRequest(
                      'resend-customer-beneficiary-verification-email',
                      'post',
                      {
                        BankId: bankData.BankId,
                      },
                      setIsLoading,
                      true,
                      navigation
                    ).then((response) => {
                      if (response.Success) {
                        Alert.alert('Success', response.Message);
                      } else {
                        Alert.alert('Error', response.Message);
                      }
                    });
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 40,
                      borderRadius: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: isResendPressed ? 'white' : '#2a80b9',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: isResendPressed ? 'black' : 'white',
                      }}>
                      Resend
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>
                Account Title
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{bankData.AccountTitle}</Text>
            </View>
            {bankData.BankAccountNumberTypeId == 1 && (
              <View>
                <View style={{ marginTop: 40 }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>IBAN</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: 'white' }}>{bankData.IBAN}</Text>
                </View>
              </View>
            )}
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Currency</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{bankData.Description}</Text>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Status</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    marginTop:
                      !bankData.IsPendingRequest &&
                      (bankData.AccountStatusId == 5 ||
                        bankData.AccountStatusId == 8)
                        ? 0
                        : 4,
                    color: 'white',
                  }}>
                  {bankData.AccountStatus}
                </Text>
              </View>
              {(bankData.AccountStatusId == 5 ||
                bankData.AccountStatusId == 8) && (
                <Pressable
                  disabled={bankData.IsPendingRequest}
                  onPressIn={handleClosePressIn}
                  onPressOut={handleCloseRelease}
                  onPress={() => {
                    if (bankData.AccountStatusId == 5) {
                      Alert.alert(
                        'Confirmation',
                        'Are you sure you want to close this beneficiary account?',
                        [
                          {
                            text: 'Close',
                            style: 'destructive',
                            onPress: () => {
                              handleCloseRelease();
                              httpRequest(
                                'update-customer-beneficiary-account-status',
                                'post',
                                {
                                  BankId: bankData.BankId,
                                  AccountStatusId: 8,
                                },
                                setIsLoading,
                                true,
                                navigation
                              ).then((response) => {
                                if (response.Success) {
                                  bankData.AccountStatusId = 8;

                                  bankData.AccountStatus = 'Closed';
                                  setIsRefresh(!isRefresh);
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
                    } else {
                      handleCloseRelease();

                      httpRequest(
                        'update-customer-beneficiary-account-status',
                        'post',
                        {
                          BankId: bankData.BankId,
                          AccountStatusId: 5,
                        },
                        setIsLoading,
                        true,
                        navigation
                      ).then((response) => {
                        if (response.Success) {
                          bankData.AccountStatusId = 5;
                          bankData.AccountStatus = 'Verified';
                          setIsRefresh(!isRefresh);
                        }
                      });
                    }
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 40,
                      borderRadius: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: bankData.IsPendingRequest
                        ? '#2A2C29'
                        : isClosePressed
                        ? 'white'
                        : '#2a80b9',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: isClosePressed ? 'black' : 'white',
                      }}>
                      {bankData.AccountStatusId == 5
                        ? 'Close'
                        : bankData.AccountStatusId == 8
                        ? 'Open'
                        : ''}
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            {bankData.AccountStatusId == 7 && (
              <View>
                <Text
                  style={{
                    color: '#FFBDBB',
                    marginTop: 20,
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}>
                  Blocked Reason
                </Text>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {bankData.BlockedReason}
                </Text>
              </View>
            )}
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Address</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'white' }}>{bankData.Address}</Text>
              <Text style={{ color: 'white', marginTop: 5 }}>
                {bankData.CityName +
                  ', ' +
                  bankData.CountryName +
                  ', ' +
                  bankData.ZipCode}
              </Text>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Created Date</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(bankData?.CreatedDate))}
              </Text>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>Updated Date</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'white' }}>
                {formateFullDate(new Date(bankData?.UpdatedDate))}
              </Text>
            </View>
          </ScrollView>
          {(bankData.AccountStatusId == 1 || bankData.AccountStatusId == 4) && (
            <View
              style={{
                paddingLeft: 20,
                paddingTop: 20,
                backgroundColor: '#13150F',
              }}>
              <Pressable
                onPressIn={handleCancelPressIn}
                onPressOut={handleCancelRelease}
                onPress={() => {
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to cancel this account?',
                    [
                      {
                        text: 'Cancel',
                        style: 'destructive',
                        onPress: () => {
                          httpRequest(
                            'update-customer-beneficiary-account-status',
                            'post',
                            {
                              BankId: bankData?.BankId,
                              AccountStatusId: 6,
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
