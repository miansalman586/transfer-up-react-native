import { View, Text, Image, Pressable } from 'react-native';

import RadioButton from './RadionButton';

export default function CurrencyItem({
  currencyId,
  currencyData,
  callback,
  isRadioButton,
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
        callback();
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 20,
            backgroundColor: '#2A2C29',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{uri:'data:image/jpeg;base64,' + currencyData.currencyFlag}}
        />
        <View style={{ marginTop: 3, flex: 1 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            {currencyData.description}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              marginTop: 10,
            }}>
            {currencyData.currencyName}
          </Text>
        </View>
        {isRadioButton && (
          <View style={{ marginTop: 15 }}>
            <RadioButton selected={currencyId == currencyData.currencyId} />
          </View>
        )}
      </View>
    </Pressable>
  );
}
