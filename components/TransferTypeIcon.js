import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TransferTypeIcon({ transferType, color  }) {
return (
    <View>
  {transferType?.transferTypeId == 2 && (
            <FontAwesome
              name={ 'paypal'}
              size={23.5}
              color={color}
            />
          )}
             {transferType?.transferTypeId == 9 && (
            <FontAwesome
              name={'bank'}
              size={23.5}
              color={color}
            />
          )}
            {transferType?.transferTypeId == 5 && (
            <Image
              style={{ height: 32, width: 28 }}
              source={require('../assets/icons/ali-pay.png')}
            />
          )}
             {transferType?.transferTypeId == 4 && color == 'white' && (
            
            <Image
            style={{ height: 32, width: 34 }}
            source={require('../assets/icons/transfer-up-white.png')}
          />
          
          
          )}
            {transferType?.transferTypeId == 4 && color == '#2a80b9' && (
            
            <Image
            style={{ height: 32, width: 34 }}
            source={require('../assets/icons/transfer-up-theme.png')}
          />
          
          
          )}
    </View>
)
}