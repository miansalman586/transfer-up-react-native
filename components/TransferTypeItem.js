import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RadioButton from './RadionButton';

export default function TransferTypeItem({ transferTypeId, transferTypeData, callback, isRadioButton }) {
  return (
    <Pressable
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 20,
        backgroundColor: '#2A2C29',
      }}
      onPress={() => {
        callback();
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
          {transferTypeData.transferTypeId == 2 && (
            <FontAwesome
              name={transferTypeData.transferTypeId == 2 ? 'paypal' : ''}
              size={23.5}
              color={'white'}
            />
          )}
        </View>
        <View style={{ marginTop: 3, flex: 1 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 15,
              }}>
              {transferTypeData.transferTypeName}
            </Text>
          </View>
        </View>
        {isRadioButton && (
          <View style={{ marginTop: 15 }}>
            <RadioButton selected={transferTypeId == transferTypeData.transferTypeId} />
          </View>
        )}
      </View>
    </Pressable>
  );
}
