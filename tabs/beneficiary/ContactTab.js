import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import InputSearch from '../../components/InputSearch';
import * as SecureStore from 'expo-secure-store';

import { useEffect, useState } from 'react';

import ContactItem from '../../components/ContactItem';

import getContact from '../../utils/getContact';

import * as ContactService from '../../services/ContactService';

export default function ContactTab({ route, navigation }) {
  const [searchText, setSearchText] = useState(null);
  const [contacts, setContacts] = useState(null);

  const onFocus = async () => {
    setContacts(null);

    let contacts = await getContact();
    let emails = [];

    for (var x in contacts) {
      for (var y in contacts[x].emails) {
        emails.push(contacts[x].emails[y].email);
      }
    }

    let customerContacts = await ContactService.getContacts(emails.toString());
    if (customerContacts.Data) setContacts(customerContacts.Data);
    else setContacts([]);
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
          {!contacts && (
            <View style={{ flex: 'row' }}>
              <ContentLoad count={10} />
            </View>
          )}
          {contacts
            ?.filter(
              (x) =>
                !searchText ||
                (x.FirstName + ' ' + x.LastName)
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )
            ?.map((contactData, index) => (
              <ContactItem
                key={index}
                contactData={contactData}
                navigation={navigation}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
