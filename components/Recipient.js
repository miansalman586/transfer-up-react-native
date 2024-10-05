import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Recipient({ recipient }) {
  return (
    <Pressable
      style={{
        marginTop:10,
        paddingTop: 15,
        paddingBottom: 20,
        backgroundColor: '#13150F',
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
          <Icon
            name={
              recipient.transferTypeId == 1
                ? 'bank'
                : recipient.transferTypeId == 2
                ? 'paypal'
                : ''
            }
            size={27.5}
            color="white"
          />
        </View>
        <View style={{ marginTop: 3, flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                marginRight: 7,
                color: 'white',
                fontSize: 18,
              }}>
              {recipient.firstName} {recipient.lastName}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
            {recipient.emailAddress ? recipient.emailAddress : recipient.accountNumber ? recipient.accountNumber : recipient.iban}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
