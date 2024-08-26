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

import httpRequest from '../utils/httpRequest';

import formateFullDate from '../utils/formateFullDate';
import ScreenLoader from '../components/ScreenLoader';

import { useEffect, useState } from 'react';

export default function BankDetailScreen({ route, navigation }) {
  const [isPrimary, setIsPrimary] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [primaryText, setPrimaryText] = useState(null);
  const [isClosePressed, setisClosePressed] = useState(false);
  const [bankData, setBankData] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isCancelPressed, setIsCancelPressed] = useState(false);

  const handleCancelPressIn = () => {
    setIsCancelPressed(true);
  };

  const handleCancelRelease = () => {
    setIsCancelPressed(false);
  };

  const {
    bankId,
    type,
    requests,
    transactions,
    balanceData,
    balances,
    rewards,
    securities,
    entityId,
  } = route.params;

  const handleClosePressIn = () => {
    if (!bankData.IsPendingRequest) setisClosePressed(true);
  };

  const handleCloseRelease = () => {
    if (!bankData.IsPendingRequest) setisClosePressed(false);
  };

  const setPrimary = () => {
    if (bankData.IsPendingRequest) {
      Alert.alert('Alert', 'You have a pending request.');
    } else {
      setIsPrimary(!isPrimary);

      if (entityId == 1) {
        httpRequest(
          'primary-merchant-bank-account',
          'post',
          {
            BankId: bankData.BankId,
            IsPrimary: !isPrimary,
          },
          setIsLoading,
          true,
          navigation
        ).then((data) => {
          if (data.Success) {
            bankData.IsPrimary = !isPrimary;

            if (!bankData.IsPrimary) {
              if (balanceData) {
                balanceData.BankId = null;
                balanceData.IBAN = null;
              }

              setPrimaryText('');
            } else {
              setIsActive(true);
              bankData.IsActive = true;

              setPrimaryText('Primary ');
            }
          } else {
            Alert.alert('Error', data.Message);
          }
        });
      } else if (entityId == 2) {
        httpRequest(
          'primary-customer-bank-account',
          'post',
          {
            BankId: bankData.BankId,
            IsPrimary: !isPrimary,
          },
          setIsLoading,
          true,
          navigation
        ).then((data) => {
          if (data.Success) {
            bankData.IsPrimary = !isPrimary;

            if (!bankData.IsPrimary) {
              if (balanceData) {
                balanceData.BankId = null;
                balanceData.IBAN = null;
              }

              setPrimaryText('');
            } else {
              setIsActive(true);
              bankData.IsActive = true;

              setPrimaryText('Primary ');
            }
          } else {
            Alert.alert('Error', data.Message);
          }
        });
      }
    }
  };

  const setActive = () => {
    if (bankData.IsPendingRequest) {
      Alert.alert('Alert', 'You have a pending request.');
    } else {
      setIsActive(!isActive);

      if (isActive) {
        setIsPrimary(false);
        bankData.IsPrimary = false;
        setPrimaryText('');
      }

      if (entityId == 1) {
        httpRequest(
          'active-merchant-bank-account',
          'post',
          {
            BankId: bankData.BankId,
            IsActive: !isActive,
          },
          setIsLoading,
          true,
          navigation
        ).then((data) => {
          if (data.Success) {
            setIsActive(!isActive);

            if (isActive) {
              if (balanceData) {
                balanceData.BankId = null;
                balanceData.IBAN = null;
              }

              setIsPrimary(false);
              bankData.IsPrimary = false;

              setPrimaryText('');
            }
          } else {
            setIsActive(isActive);
            setIsPrimary(isPrimary);

            bankData.IsPrimary = isPrimary;
            setPrimaryText(bankData.IsPrimary ? 'Primary ' : '');

            Alert.alert('Error', data.Message);
          }
        });
      } else if (entityId == 2) {
        httpRequest(
          'active-customer-bank-account',
          'post',
          {
            BankId: bankData.BankId,
            IsActive: !isActive,
          },
          setIsLoading,
          true,
          navigation
        ).then((data) => {
          if (data.Success) {
            setIsActive(!isActive);

            if (isActive) {
              if (balanceData) {
                balanceData.BankId = null;
                balanceData.IBAN = null;
              }

              setIsPrimary(false);
              bankData.IsPrimary = false;

              setPrimaryText('');
            }
          } else {
            setIsActive(isActive);
            setIsPrimary(isPrimary);

            bankData.IsPrimary = isPrimary;
            setPrimaryText(bankData.IsPrimary ? 'Primary ' : '');

            Alert.alert('Error', data.Message);
          }
        });
      }
    }
  };

  const onFocus = () => {
    if (entityId == 1) {
      httpRequest(
        'get-merchant-bank-detail',
        'post',
        {
          BankId: bankId,
        },
        setIsLoading,
        true,
        navigation
      ).then((data) => {
        if (data.Data) {
          setBankData(data.Data);

          setIsPrimary(data.Data.IsPrimary);
          setIsActive(data.Data.IsActive);

          setPrimaryText(data.Data.IsPrimary ? 'Primary ' : '');
        }
      });
    } else if (entityId == 2) {
      httpRequest(
        'get-customer-bank-detail',
        'post',
        {
          BankId: bankId,
        },
        setIsLoading,
        true,
        navigation
      ).then((data) => {
        if (data.Data) {
          setBankData(data.Data);

          setIsPrimary(data.Data.IsPrimary);
          setIsActive(data.Data.IsActive);

          setPrimaryText(data.Data.IsPrimary ? 'Primary ' : '');
        }
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
                rewards,
                securities,
                entityId,
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
                {bankData.BankName}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 16,
                }}>
                {primaryText}
                {bankData.Currency} account
              </Text>
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
                  onPressIn={handleClosePressIn}
                  onPressOut={handleCloseRelease}
                  onPress={() => {
                    if (!bankData.IsPendingRequest) {
                      if (bankData.AccountStatusId == 5) {
                        Alert.alert(
                          'Confirmation',
                          'Are you sure you want to close this bank account?',
                          [
                            {
                              text: 'Close',
                              style: 'destructive',
                              onPress: () => {
                                handleCloseRelease();
                                if (entityId == 1) {
                                  httpRequest(
                                    'update-merchant-bank-account-status',
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

                                      setIsPrimary(false);
                                      bankData.IsPrimary = false;
                                      setPrimaryText('');

                                      setIsActive(false);
                                      bankData.IsActive = false;

                                      bankData.AccountStatus = 'Closed';
                                      setIsRefresh(!isRefresh);
                                    }
                                  });
                                } else if (entityId == 2) {
                                  httpRequest(
                                    'update-customer-bank-account-status',
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

                                      setIsPrimary(false);
                                      bankData.IsPrimary = false;
                                      setPrimaryText('');

                                      setIsActive(false);
                                      bankData.IsActive = false;

                                      bankData.AccountStatus = 'Closed';
                                      setIsRefresh(!isRefresh);
                                    }
                                  });
                                }
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
                        if (entityId == 1) {
                          httpRequest(
                            'update-merchant-bank-account-status',
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
                        } else if (entityId == 2) {
                          httpRequest(
                            'update-customer-bank-account-status',
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
                      }
                    } else {
                      Alert.alert('Alert', 'You have a pending request.');
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
            {bankData.AccountStatusId == 5 && (
              <View>
                <View
                  style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Active</Text>
                  <Switch
                    trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                    thumbColor={isActive ? '#13150F' : '#13150F'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setActive}
                    value={isActive}
                  />
                </View>
                <View
                  style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>
                    Primary bank for {bankData.Currency}
                  </Text>
                  <Switch
                    trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                    thumbColor={isPrimary ? '#13150F' : '#13150F'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setPrimary}
                    value={isPrimary}
                  />
                </View>
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
                          if (entityId == 1) {
                            httpRequest(
                              'update-merchant-bank-account-status',
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
                          } else if (entityId == 2) {
                            httpRequest(
                              'update-customer-bank-account-status',
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
          )}
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
