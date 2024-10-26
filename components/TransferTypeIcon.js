import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TransferTypeIcon({ transferType  }) {
return (
    <View>
  {transferType?.transferTypeId == 2 && (
            <FontAwesome
              name={ 'paypal'}
              size={23.5}
              color={'white'}
            />
          )}
             {transferType?.transferTypeId == 9 && (
            <FontAwesome
              name={'bank'}
              size={23.5}
              color={'white'}
            />
          )}
            {transferType?.transferTypeId == 5 && (
            <Image
              style={{ height: 32, width: 28 }}
              source={require('../assets/icons/ali-pay.png')}
            />
          )}
    </View>
)
}