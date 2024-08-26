import { View, Text, Image, Pressable } from 'react-native';
import RadioButton from './RadionButton';
import { useState } from 'react';

export default function CountryItem({
  countryId,
  countryData,
  navigation,
  callback,
}) {
  return (
    <Pressable
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: '#2A2C29',
      }}
      onPress={() => {
        callback(countryData);
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
          source={{ uri: countryData.Flag }}
        />
        <View style={{ marginTop: 3, flex: 1 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            {countryData.CountryName}
          </Text>
          <Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
            {countryData.Description}
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <RadioButton selected={countryId == countryData.CountryId} />
        </View>
      </View>
    </Pressable>
  );
}
