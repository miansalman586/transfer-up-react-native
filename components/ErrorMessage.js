import { View, Text } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ErrorMessage({ flag, message }) {
  return (
    <View>
      {flag && (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: 14,
              height: 14,
              marginTop: 11,
              borderRadius: 7,
              borderWidth: 1,
              padding: 2,
              marginRight: 7,
              borderColor: '#FFBDBB',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 name="exclamation" size={10} color="#FFBDBB" />
          </View>
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              color: '#FFBDBB',
            }}>
            {message}
          </Text>
        </View>
      )}
    </View>
  );
}
