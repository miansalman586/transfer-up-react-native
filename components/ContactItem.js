import { View, Image, Text, Pressable } from 'react-native';
import { useState } from 'react';

export default function ContactItem({ contactData, navigation }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handleRelease}
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: isPressed ? '#2A2C29' : '#13150F',
      }}
      onPress={() => {
        navigation.navigate('ContactDetail', {
          customerId: contactData.CustomerId,
          merchantId: contactData.MerchantId,
          entityId: contactData.EntityId,
          emailAddress: contactData.EmailAddress,
        });
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            marginRight: 20,
            backgroundColor: '#2A2C29',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{ uri: contactData.ProfilePic }}
        />
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
              {contactData.FirstName} {contactData.LastName}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>
              {contactData.CountryName}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: 'white',
              }}>
              {contactData.EntityId == 1
                ? 'Merchant Account'
                : contactData.EntityId == 2
                ? 'Customer Account'
                : ''}
            </Text>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
              {contactData.EmailAddress ? 'Email' : ''}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
