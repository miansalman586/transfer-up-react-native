import {View, ScrollView, Text, Pressable, Alert, Switch} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import GoBackTopBar from '../../components/GoBackTopBar';
import httpRequest from '../../utils/httpRequest';

import ScreenLoader from '../../components/ScreenLoader';

export default function RecipientDetailScreen({ route, navigation })  {
const { recipientId } = route.params;

const [isLoading, setIsLoading] = useState(false);

const [recipientDetail, setRecipientDetail] = useState(null);
const [isSendMoneyPressed, setIsSendMoneyPressed] = useState(false);
const [isAutoWithdrawalRecipient, setIsAutoWithdrawalRecipient] = useState(false);


const handleSendMoneyPressIn = () => {
    setIsSendMoneyPressed(true);
  };

  const handleSendMoneyPressOut = () => {
    setIsSendMoneyPressed(false);
  };

  const setAutoWithdrawalRecipient = async () => {
    setIsAutoWithdrawalRecipient(!isAutoWithdrawalRecipient);

    
    if (!isAutoWithdrawalRecipient) {
    let result = await httpRequest('customer/update-auto-withdrawal-recipient', 'put',{
      currencyId: recipientDetail?.currencyId,
      transferTypeId: recipientDetail?.transferTypeId,
      emailAddress: recipientDetail?.emailAddress
    }, true, setIsLoading);
    if (!result.success) {
    Alert.alert('Error', result.Message);
  }  else {
    setIsAutoWithdrawalRecipient(!isAutoWithdrawalRecipient);
  }
} else {
  let result = await httpRequest('customer/update-auto-withdrawal-recipient', 'put', {
    currencyId: recipientDetail?.currencyId,
  }, true, setIsLoading);

  if (!result.success) {
  Alert.alert('Error', result.Message);
}  else {
  setIsAutoWithdrawalRecipient(!isAutoWithdrawalRecipient);
}
}


  };

  const [isDeletePressed, setIsDeletePressed] = useState(false);

  const handleDeletePressIn = () => {
    setIsDeletePressed(true);
  };

  const handleDeletePressOut = () => {
    setIsDeletePressed(false);
  };

const onFocus = async () =>{
let result = await httpRequest('customer/get-recipient-detail?recipientId=' + recipientId, 'get', null, true, setIsLoading);
if (result.success) {
    setRecipientDetail(result.data);
    setIsAutoWithdrawalRecipient(result?.data?.isAutoWithdrawal);
}


};

useEffect(() => {
  navigation.addListener('focus', onFocus);
}, []);

    return(
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
              <View style={{ alignItems: 'center' }}>
              <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            marginBottom: 20,
            backgroundColor: '#2A2C29',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome5
            name={
                recipientDetail?.transferTypeId == 1
                ? 'bank'
                : recipientDetail?.transferTypeId == 2
                ? 'paypal'
                : ''
            }
            size={27.5}
            color="white"
          />
        </View>
             
                <Text
                  style={{
                    color: 'white',
                    fontSize: 28,
                    marginBottom: 20,
                  }}>
                  {recipientDetail?.transferType}
                </Text>
                <Pressable
                   onPressIn={handleSendMoneyPressIn}
                   onPressOut={handleSendMoneyPressOut}
                style={{ marginBottom: 20 }}
                onPress={() => {

                  navigation.navigate('SendMoney', {
                            transferType: global.transferTypes.find(e=>e.transferTypeId == recipientDetail?.transferTypeId),
                            balanceData: global.balances.find(e=>e.currencyId == recipientDetail?.currencyId),
                            emailAddress: recipientDetail?.emailAddress
                          });
                }}>
                     <View
                  style={{
                    width: 90,
                    height: 35,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      !global.balances.some((e) => e.currencyId == recipientDetail?.currencyId && e.totalBalance > 0.0)
                        ? '#2A2C29'
                        : isSendMoneyPressed ? 'white' 
                        : '#2a80b9',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: isSendMoneyPressed ? 'black' : 'white',
                    }}>
                    Send 
                  </Text>
                </View>
              </Pressable>
              </View>
           
              <View style={{ marginTop: 40 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                  Full Name
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: 'white' }}>{recipientDetail?.name}</Text>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Email Address</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: 'white' }}>{recipientDetail?.emailAddress}</Text>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Currency</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: 'white' }}>{recipientDetail?.description}</Text>
              </View>


              <View
                style={{
                  marginTop: 40,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Auto Withdrawal Recipient
                </Text>
                <Switch
                disabled={!global.balances?.find(e=>e.currencyId == recipientDetail?.currencyId)?.isAutoWithdrawal}
                  trackColor={{ false: '#2A2C29', true: '#2a80b9' }}
                  thumbColor={isAutoWithdrawalRecipient ? '#13150F' : '#13150F'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setAutoWithdrawalRecipient}
                  value={isAutoWithdrawalRecipient}
                />
              </View>

            </ScrollView>
            <View
                style={{
                  paddingLeft: 20,
                  paddingTop: 20,
                  backgroundColor: '#13150F',
                }}>
             
                <Pressable
                  onPressIn={handleDeletePressIn}
                  onPressOut={handleDeletePressOut}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to delete this recipient?',
                      [
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: async () => {
                           let result = await httpRequest('customer/delete-recipient?recipientId=' + recipientDetail?.customerRecipientId, 'delete', null, true, setIsLoading);

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
                    backgroundColor: isDeletePressed ? '#FFBDBB' : '#13150F',
                    borderColor: '#FFBDBB',
                  }}>
                  <Text
                    style={{
                      color: isDeletePressed ? 'black' : 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Delete
                  </Text>
                </Pressable>
              </View>
          </View>
        )}
        {isLoading && <ScreenLoader />}
      </View>
    )
}