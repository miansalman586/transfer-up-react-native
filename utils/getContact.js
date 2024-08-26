import * as Contacts from 'expo-contacts';

export default async function getContact() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [ Contacts.Fields.Emails],
    });

    return data;
  }
}
