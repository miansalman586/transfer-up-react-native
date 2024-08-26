import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FilterView({
  disabled,
  filterName,
  flag,
  callback,
  close,
  crose,
  color,
  textColor,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled}
      style={{ marginRight: 10 }}
      onPress={callback}>
      <View
        style={{
          width: '100%',
          height: 30,
          marginTop: 23,
          borderRadius: '50%',
          paddingLeft: 20,
          paddingRight: flag && !disabled && !crose ? 7 : 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: color ?? '#2a80b9',
          borderWidth: 2,
          backgroundColor: flag
            ? '#2a80b9'
            : color == '#ecd271'
            ? 'transparent'
            : '#13150F',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontWeight: flag || color ? 'bold' : '',
              color: flag
                ? 'white'
                : color == '#ecd271'
                ? '#ecd271'
                : '#2a80b9',
              marginTop: flag && !disabled && !crose ? 2 : 0,
              marginRight: flag && !disabled && !crose ? 10 : 0,
            }}>
            {filterName}
          </Text>
          {flag && !disabled && !crose && (
            <TouchableOpacity onPress={close}>
              <Ionicons name="close-circle-sharp" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
