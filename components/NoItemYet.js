import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function NoItemYet({ desc }) {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
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
          <Feather size={32} color="#636562" name="clock" />
        </View>
        <View
          style={{
            marginTop: 3,
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View>
            <Text
              style={{
                color: '#636562',
                fontSize: 18,
                marginTop: 15,
              }}>
              {desc}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
