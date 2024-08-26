import { View } from 'react-native';

export default function RadioButton({ selected }) {
  return (
    <View
      style={{
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2a80b9',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {selected && (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: '#2a80b9',
          }}
        />
      )}
    </View>
  );
}
