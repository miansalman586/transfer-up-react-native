import { Pressable, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

export default function PressableButton({ text, onPress }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handleRelease}
      onPress={onPress}>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          height: 35,
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isPressed ? 'white' : '#2a80b9',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: isPressed ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
