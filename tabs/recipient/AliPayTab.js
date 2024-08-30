import { View, ScrollView } from 'react-native';

import { useEffect, useState } from 'react';

import ItemLoader from '../../components/ItemLoader';

import RecipientItem from '../../components/RecipientItem';

import NoItemYet from '../../components/NoItemYet';

import httpRequest from '../../utils/httpRequest';

export default function AliPayTab({  navigation }) {
const [recipients, setRecipients] = useState(null);


  const onFocus = async () => {
    setRecipients(null);
    let recipients = await httpRequest(
      'customer/get-recipient?transferTypeId=5',
      'get',
null,
      true,
      null
    );
    if (recipients.success) setRecipients(recipients.data);
    else setRecipients([]);
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13150F',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
        {!recipients &&
          <View style={{ flex: 'row' }}>
  <ItemLoader count={10} />
          </View>
             }
           
           {recipients?.map((recipientData, index) => (
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
