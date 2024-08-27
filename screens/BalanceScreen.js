import {
  View,
  ScrollView,
  Image,
  Text,
  Switch,
  Pressable,
  Alert,
} from 'react-native';

import ItemLoader from '../components/ItemLoader';
import ScreenLoader from '../components/ScreenLoader';

import TransferTypeItem from '../components/TransferTypeItem';
import InputSearch from '../components/InputSearch';
import BottomSheet from '../components/BottomSheet';
import NoItemYet from '../components/NoItemYet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from  'react-native-vector-icons/MaterialCommunityIcons';

import TransactionItem from '../components/TransactionItem';
import { useEffect, useState, useRef } from 'react';
import httpRequest from '../utils/httpRequest';

import GoBackTopBar from '../components/GoBackTopBar';

export default function BalanceScreen({ route, navigation }) {
  const [isPrimary, setIsPrimary] = useState(false);
  const [isAutoConversion, setIsAutoConversion] = useState(false);
  const [isAutoWithdrawalRequest, setIsAutoWithdrawalRequest] = useState(false);

  const [addTransferTypeSearchText, setAddTransferTypeSearchText] = useState(null);
  const [sendTransferTypeSearchText, setSendTransferTypeSearchText] = useState(null);

  const bottomSheetAddTransferTypeModalRef = useRef(null);
  const bottomSheetSendTransferTypeModalRef = useRef(null);

  const [balanceData, setBalanceData] = useState(null);

  const [transactions, setTransactions] = useState(null);

  const [isAddPressed, setIsAddPressed] = useState(false);
  const [isConvertPressed, setIsConvertPressed] = useState(false);
  const [isSendPressed, setIsSendPressed] = useState(false);
  const [isMorePressed, setIsMorePressed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  
  const [isTransactionSeeAllPressed, setIsTransactionSeeAllPressed] =
    useState(false);

  const handleTransactionSeeAllPressIn = () => {
    setIsTransactionSeeAllPressed(true);
  };

  const handleTransactionSeeAllRelease = () => {
    setIsTransactionSeeAllPressed(false);
  };

  const handleAddPressIn = () => {
    setIsAddPressed(true);
  };

  const handleAddPressOut = () => {
    setIsAddPressed(false);
  };

  const handleConvertPressIn = () => {
    if (balanceData?.totalBalance > 0.0 && balances.length > 1)
      setIsConvertPressed(true);
  };

  const handleConvertPressOut = () => {
    if (balanceData?.totalBalance > 0.0 && balances.length > 1)
      setIsConvertPressed(false);
  };

  const handleSendPressIn = () => {
    if (balanceData?.totalBalance > 0.0) setIsSendPressed(true);
  };

  const handleSendPressOut = () => {
    if (balanceData?.totalBalance > 0.0) setIsSendPressed(false);
  };

  const bottomSheetMoreModalRef = useRef(null);


  const handleMorePressIn = () => {
    setIsMorePressed(true);
  };

  const handleMorePressOut = () => {
    setIsMorePressed(false);
  };

  const setAutoWithdrawalRequest = async () => {
    setIsAutoWithdrawalRequest(!isAutoWithdrawalRequest);
    let result = await httpRequest(
      'customer/auto-withdrawal',
      'put',
      {
        currencyId: currencyId,
        isAutoWithdrawal: !isAutoWithdrawalRequest,
      },
      true,
      setIsLoading
    );
    if (!result.success) {
      setIsAutoWithdrawalRequest(!isAutoWithdrawalRequest);
      Alert.alert('Error', result.Message);
    }
  };

  const setAutoConversion = async () => {
    setIsAutoConversion(!isAutoConversion);
    let result = await httpRequest(
      'customer/auto-conversion',
      'put',
      { currencyId: currencyId, isAutoConversion: !isAutoConversion },
      true,
      setIsLoading
    );
    if (!result.success) {
      setIsAutoConversion(!isAutoConversion);
      Alert.alert('Error', result.Message);
    }
  };

  const setPrimary = async () => {
    setIsPrimary(!isPrimary);
    let result = await httpRequest(
      'customer/primary-currency',
      'put',
      { currencyId: currencyId, isPrimary: !isPrimary },
      true,
      setIsLoading
    );
    if (!result.success) {
      setIsPrimary(isPrimary);
      Alert.alert('Error', result.Message);
    }
  };

  const onFocus = async () => {
    let balanceData = await httpRequest(
      'customer/get-balance-detail?currencyId=' +  currencyId,
      'get',
      null,
      true,
      setIsLoading
    );
    setBalanceData(balanceData.data);

    setIsPrimary(balanceData?.data?.isPrimary);
    setIsAutoConversion(balanceData?.data?.isAutoConversion);
    setIsAutoWithdrawalRequest(balanceData?.data?.isAutoWithdrawal);

    setTransactions(null);
    let transactions = await httpRequest(
      'customer/get-transaction?pageNumber=1&pageSize=10&currencyId=' + currencyId,
      'get',
      null,
      true
    );
    if (transactions.success) setTransactions(transactions.data);
    else setTransactions([]);
  };

  const { currencyId } = route.params;

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View>
      {!isLoading && (
        <View
          style={{
            height: '100%',
            backgroundColor: '#13150F',
          }}>
          <GoBackTopBar navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Image
                style={{
                  width: 55,
                  height: 55,
                  marginTop: 10,
                  borderRadius: 27.5,
                  backgroundColor: '#2A2C29',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={{}}
              />
              <Text style={{ color: 'white', marginTop: 20, fontSize: 24 }}>
                {balanceData?.currency} Balance
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: 10,
                  fontSize: 32,
                  fontWeight: 'bold',
                }}>
                {balanceData?.totalBalance?.toFixed(2)} {balanceData?.currency}
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <View style={{ alignItems: 'center' }}>
                  <Pressable
                    onPressIn={handleAddPressIn}
                    onPressOut={handleAddPressOut}
                    onPress={() => {
                      bottomSheetAddTransferTypeModalRef.current.present();
                      setAddTransferTypeSearchText(null);
                    }}>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        marginRight: 45,
                        borderRadius: 27.5,
                        backgroundColor: isAddPressed ? 'white' : '#2a80b9',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FontAwesome5
                        name="plus"
                        size={27.5}
                        color={isAddPressed ? 'black' : 'white'}
                      />
                    </View>
                  </Pressable>
                  <Text
                    style={{
                      color: isAddPressed ? 'white' : '#2a80b9',
                      fontSize: 16,
                      marginTop: 10,
                      marginRight: 45,
                    }}>
                    Add
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Pressable
                    onPressIn={handleConvertPressIn}
                    onPressOut={handleConvertPressOut}
                    disabled={
                      !(balanceData?.totalBalance > 0.0 && balances.length > 1)
                    }
                    onPress={() => {
                      navigation.navigate('ConvertBalance', {
                        balanceData: balanceData,
                        toBalanceData: global.balances.filter(
                          (e) => e.currencyId != balanceData.currencyId
                        )[0],
                      });
                    }}>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 27.5,
                        marginRight: 45,
                        backgroundColor:
                          balanceData?.totalBalance > 0.0 && balances.length > 1
                            ? isConvertPressed
                              ? 'white'
                              : '#2a80b9'
                            : '#636562',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Octicons
                        name="arrow-both"
                        size={27.5}
                        color={
                          balanceData?.totalBalance > 0.0 && balances.length > 1
                            ? isConvertPressed
                              ? 'black'
                              : 'white'
                            : 'black'
                        }
                      />
                    </View>
                  </Pressable>
                  <Text
                    style={{
                      color:
                        balanceData?.totalBalance > 0.0 && balances.length > 1
                          ? isConvertPressed
                            ? 'white'
                            : '#2a80b9'
                          : '#636562',
                      fontSize: 16,
                      marginTop: 10,
                      marginRight: 45,
                    }}>
                    Convert
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Pressable
                    onPressIn={handleSendPressIn}
                    onPressOut={handleSendPressOut}
                    onPress={() => {
                      bottomSheetSendTransferTypeModalRef.current.present();
                      setSendTransferTypeSearchText(null);
                    }}>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 27.5,
                        marginRight: 45,
                        backgroundColor:
                          balanceData?.totalBalance > 0.0
                            ? isSendPressed
                              ? 'white'
                              : '#2a80b9'
                            : '#636562',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FontAwesome5
                        name="arrow-up"
                        size={27.5}
                        color={
                          balanceData?.totalBalance > 0.0
                            ? isSendPressed
                              ? 'black'
                              : 'white'
                            : 'black'
                        }
                      />
                    </View>
                  </Pressable>
                  <Text
                    style={{
                      color:
                        balanceData?.totalBalance > 0.0
                          ? isSendPressed
                            ? 'white'
                            : '#2a80b9'
                          : '#636562',
                      fontSize: 16,
                      marginTop: 10,
                      marginRight: 45,
                    }}>
                    Send
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Pressable
                    onPressIn={handleMorePressIn}
                    onPressOut={handleMorePressOut}
                    onPress={() => {
                      bottomSheetMoreModalRef.current.present();
                    }}>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 27.5,
                        marginRight: 45,
                        backgroundColor: isMorePressed ? 'white' : '#2a80b9',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialIcons
                        name="more-horiz"
                        size={27.5}
                        color={isMorePressed ? 'black' : 'white'}
                      />
                    </View>
                  </Pressable>
                  <Text
                    style={{
                      color: isMorePressed ? 'white' : '#2a80b9',
                      fontSize: 16,
                      marginTop: 10,
                      marginRight: 45,
                    }}>
                    More
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: '#2A2C29',
                }}></View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Primary Balance
                </Text>
                <Switch
                  trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                  thumbColor={isPrimary ? '#13150F' : '#13150F'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setPrimary}
                  value={isPrimary}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Auto Withdrawal Request
                </Text>
                <Switch
                  trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                  thumbColor={isAutoWithdrawalRequest ? '#13150F' : '#13150F'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setAutoWithdrawalRequest}
                  value={isAutoWithdrawalRequest}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Auto Conversion Request
                </Text>
                <Switch
                  trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                  thumbColor={isAutoConversion ? '#13150F' : '#13150F'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setAutoConversion}
                  value={isAutoConversion}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
                Transactions
              </Text>
              <Pressable
                onPressIn={handleTransactionSeeAllPressIn}
                onPressOut={handleTransactionSeeAllRelease}
                onPress={() => {
                  navigation.navigate('Transaction');
                }}>
                <Text
                  style={{
                    color: isTransactionSeeAllPressed ? 'white' : '#2a80b9',
                    fontSize: 20,
                    marginRight: 20,
                    textDecorationLine: 'underline',
                  }}>
                  See all
                </Text>
              </Pressable>
            </View>
            {!transactions && (
              <View style={{ flex: 'row' }}>
                <ItemLoader count={10} />
              </View>
            )}
            {transactions && transactions.length == 0 && (
              <NoItemYet desc="No transactions yet" />
            )}
            {transactions &&
              transactions.map((transactionData, index) => (
                <TransactionItem
                  key={index}
                  navigation={navigation}
                  transactionData={transactionData}
                />
              ))}
          </ScrollView>
          <BottomSheet
            bottomSheetModalRef={bottomSheetAddTransferTypeModalRef}
            snapPoints={['90%']}
            title={'Select transfer type'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setAddTransferTypeSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.transferTypes
                    ?.filter(
                      (x) =>
                        !addTransferTypeSearchText ||
                        x.transferTypeName
                          .toLowerCase()
                          .includes(addTransferTypeSearchText.toLowerCase())
                    )
                    ?.filter(
                      (e) => e.transferTypeId != 3 && e.transferTypeId != 4
                    )
                    ?.map((transferTypeData, index) => (
                      <TransferTypeItem
                        key={index}
                        transferTypeData={transferTypeData}
                        callback={() => {
                          bottomSheetAddTransferTypeModalRef.current.close();

                          navigation.navigate('AddBalance', {
                            transferType: transferTypeData,
                            balanceData: balanceData,
                          });
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
             <BottomSheet
            bottomSheetModalRef={bottomSheetSendTransferTypeModalRef}
            snapPoints={['90%']}
            title={'Select transfer type'}
            content={
              <View>
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                  <InputSearch
                    borderColor="white"
                    searchData={(value) => {
                      setSendTransferTypeSearchText(value);
                    }}
                  />
                </View>
                <ScrollView>
                  {global.transferTypes
                    ?.filter(
                      (x) =>
                        !sendTransferTypeSearchText ||
                        x.transferTypeName
                          .toLowerCase()
                          .includes(sendTransferTypeSearchText.toLowerCase())
                    )
                    ?.filter(
                      (e) => e.transferTypeId != 3 
                    )
                    ?.map((transferTypeData, index) => (
                      <TransferTypeItem
                        key={index}
                        transferTypeData={transferTypeData}
                        callback={() => {
                          bottomSheetSendTransferTypeModalRef.current.close();

                          navigation.navigate('SendMoney', {
                            transferType: transferTypeData,
                            balanceData: balanceData,
                          });
                        }}
                      />
                    ))}
                </ScrollView>
              </View>
            }
          />
              <BottomSheet
            bottomSheetModalRef={bottomSheetMoreModalRef}
            snapPoints={['25%']}
            title={'More'}
            content={
              <View>
               
                <Pressable
                disabled={!isAutoWithdrawalRequest}
                  style={{
                    paddingBottom: 15,
                    paddingRight: 25,
                    paddingLeft: 25,
                  }}
                  onPress={() => {
                     navigation.navigate('AutoWithdrawalRecipient', {
                      transferTypeId: balanceData?.transferTypeId,
                      payPalEmailAddress: balanceData?.payPalEmailAddress,
                      balanceData: balanceData
                     });

                      bottomSheetMoreModalRef.current.close();
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 27.5,
                        marginRight: 20,
                        backgroundColor: '#2A2C29',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        size={32}
                        color={isAutoWithdrawalRequest ? 
                         'white' : '#636562'
                        }
                        name="autorenew"
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 3,
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View>
                        <Text
                          style={{
                            color:
                             isAutoWithdrawalRequest ? 'white' : '#636562',
                            fontSize: 18,
                            marginTop: 15,
                          }}>
                          Auto withdrawal recipient
                        </Text>
                      </View>
                      <View style={{ marginTop: 15 }}>
                        <Entypo
                          name="chevron-right"
                          size={26}
                          color={isAutoWithdrawalRequest ? 
                           'white' : '#636562'
                          }
                        />
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={{
                    paddingBottom: 15,
                    paddingRight: 25,
                    paddingLeft: 25,
                  }}
                  onPress={() => {
                      Alert.alert(
                        'Confirmation',
                        'Are you sure you want to close this balance?',
                        [
                          {
                            text: 'Close',
                            style: 'destructive',
                            onPress: async () => {
                              let result = await httpRequest('customer/close-balance', 'put', {
                                currencyId: balanceData.currencyId
                              }, true, setIsLoading);
                              if (result.success) {
                                navigation.goBack();
                              } else {
                                Alert.alert('Error', result.Message);
                              }
                            },
                          },
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                        ]
                      );

                      bottomSheetMoreModalRef.current.close();
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 27.5,
                        marginRight: 20,
                        backgroundColor: '#2A2C29',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign
                        size={27.5}
                        color={
                         'white'
                        }
                        name="delete"
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 3,
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View>
                        <Text
                          style={{
                            color:
                             'white',
                            fontSize: 18,
                            marginTop: 15,
                          }}>
                          Close balance
                        </Text>
                      </View>
                      <View style={{ marginTop: 15 }}>
                        <Entypo
                          name="chevron-right"
                          size={26}
                          color={
                           'white'
                          }
                        />
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            }
          />
        </View>
      )}
      {isLoading && <ScreenLoader />}
    </View>
  );
}
