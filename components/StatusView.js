import { View, Text } from 'react-native';

export default function StatusView({
  borderColor,
  backgroundColor,
  fontWeight,
  color,
  status,
}) {
  return (
    <View
      style={{
        width: '100%',
        height: 30,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: borderColor,
        borderWidth: 2,
        backgroundColor: backgroundColor,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontWeight: fontWeight,
            color: color,
          }}>
          {status}
        </Text>
      </View>
    </View>
  );
}
