import { View, Text, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { useState } from 'react';
import ItemLoader from '../../components/ItemLoader';

import InputSearch from '../../components/InputSearch';
import RecipientItem from '../../components/RecipientItem';

import httpRequest from '../../utils/httpRequest';
import * as Contacts from 'expo-contacts';

import {useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getSetting } from '../../utils/common';

export default function RecipientTab({route, navigation}) {

    const [isAddPressed, setIsAddPressed] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
  
  const [recipientSearchText, setRecipientSearchText] = useState(null);

    const [transferTypes, setTransferTypes ] = useState(null);
    const [recipients, setRecipients] = useState(null);

    const onFucus = async ()=>{
   
let firstId = null;

  let result = await httpRequest('customer/get-recipient-transfer-type', 'get', null, true, null);
  if (result.status == 200) {
    result = await result.json();
  
    let setting = await getSetting();
    if (setting.isSyncPhoneContact) {
      result.push({
        transferTypeId: 4,
        transferTypeName: 'Transfer Pay'
      });
      setCurrentScreen('TransferPay');
      const index = result.findIndex(item => item.transferTypeId === 4);
  if (index !== -1) {
    const [targetItem] = result.splice(index, 1);
    result.unshift(targetItem);
  }
    } else {
      setCurrentScreen('PayPal');
  
    }
  
    firstId= result[0];
    setTransferTypes(result);
  }

  if (firstId?.transferTypeId == 4) {
    getContactRecipiet();
  } else {

    getRecipiet(firstId);

  }

    };

    const getContactRecipiet = async ()=> {
        let contacts = await getContacts();
        const emailAddresses = contacts?.map(contact => contact.emails.map(e => e.email)).flat().join(',');

        
        setRecipients(null);
        let recipients = await httpRequest(
          'customer/get-transfer-pay-recipient?emailAddress='+emailAddresses,
          'get',
      null,
          true,
          null
        );
        if (recipients.status == 200){
        recipients = await recipients.json();
           setRecipients(recipients);
        }
        else setRecipients([]);
    };

    const getRecipiet = async (firstId)=> {
        setRecipients(null);
        let recipients = await httpRequest(
          'customer/get-recipient-by-transfer-type-id?transferTypeId='+firstId?.transferTypeId,
          'get',
      null,
          true,
          null
        );
        if (recipients.status == 200){
        recipients = await recipients.json();
           setRecipients(recipients);
        }
        else setRecipients([]);
    };

    const getContacts = async () => {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
          });
          if (data.length > 0) {
            const contactsWithEmail = data.filter(contact => contact.emails && contact.emails.length > 0);
            return contactsWithEmail;
          }
      };
  
    useEffect(() => {
      navigation.addListener('focus', onFucus);

      (async () => {
        let setting =  await getSetting();
  
        if (setting.isSyncPhoneContact) {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          setHasPermission(true);
        }
      }
      })();

    }, []);
  
    const handleAddPressIn = () => {
      setIsAddPressed(true);
    };
  
    const handleAddRelease = () => {
      setIsAddPressed(false);
    };

    return (
        <View
        style={{
          height: '100%',
          backgroundColor: '#13150F',
        }}> 
        <View style={{ paddingTop: 60, backgroundColor: '#13150F' }}>
        <View
          style={{
            height: '13%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPressIn={handleAddPressIn}
            onPressOut={handleAddRelease}
            style={{ marginRight: 20, marginLeft: 'auto' }}
            onPress={() => {
              navigation.navigate('AddRecipient');
            }}>
            <View
              style={{
            marginTop:20,
                width: 70,
                height: 35,
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isAddPressed ? 'white' : '#2a80b9',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isAddPressed ? 'black' : 'white',
                }}>
                Add
              </Text>
            </View>
          </Pressable>
        </View>
  
        <Text
          style={{
            marginTop: 40,
            marginLeft: 20,
            marginBottom: 10,
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          Recipient
        </Text>
        <InputSearch searchData={(value) => {
                      setRecipientSearchText(value);
        }} />
        <View style={{ marginBottom: -70, flexDirection: 'row' }}>
        <ScrollView contentContainerStyle={{
       
          }} showsHorizontalScrollIndicator={false}
          horizontal={true}>
           <View style={{flexDirection: 'row'}}>
  
           
        {transferTypes?.map((transferType, index) => (
       
  
       
                           <TouchableOpacity
                           index={index}
                           onPress={async () => {
                                setCurrentScreen(transferType.transferTypeName.replace(' ', ''));
                          
                               
  if (transferType.transferTypeId == 4) {
    getContactRecipiet();
  } else {

    getRecipiet(transferType);

  }


                           }}
                           activeOpacity={0.5}
                           style={{
                             alignItems: 'center',
                             paddingTop: 25,
                             paddingBottom: 20,
                             marginLeft: 20,
                             width: (Dimensions.get('window').width - 60) / 2,
                             marginRight: index == transferTypes.length - 1 ? 25 : 0,
                             borderBottomColor: currentScreen == transferType.transferTypeName.replace(' ', '') ? '#2a80b9' : '#2A2C29',
                             borderBottomWidth: 4,
                           }}>
                           <Text
                             style={{
                               color: currentScreen == transferType.transferTypeName.replace(' ', '') ? '#2a80b9' : 'white',
                               fontSize: 18,
                               fontWeight: currentScreen == transferType.transferTypeName.replace(' ', '') ? 'bold' : '',
                             }}>
                             {transferType.transferTypeName}
                           </Text>
                         </TouchableOpacity>
                       
                      ))}
                      </View>
                        </ScrollView>
                     
        </View>
      </View>
         
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20 }}>
            {!recipients &&
              <View style={{ flex: 'row' }}>
      <ItemLoader count={10} />
              </View>
                 }
               
               {recipients && recipients?.filter(
                      (x) =>
                        !recipientSearchText ||
                        (x.firstName + ' ' + x.lastName)
                          .toLowerCase()
                          .includes(recipientSearchText.toLowerCase())
                    )?.map((recipientData, index) => (
                  <RecipientItem
                    key={index}
                    navigation={navigation}
                    recipientData={recipientData}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
    );
}