import { View, StatusBar, Pressable } from 'react-native';

import { useState } from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function GoBackTopBar({ navigation, callback }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };
  return (
    <View style={{ height: '13%', paddingLeft: 20, justifyContent: 'center' }}>
      <StatusBar barStyle="light-content" />
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handleRelease}
        style={{
          width: 55,
          height: 55,
          marginTop: 40,
          borderRadius: 27.5,
          backgroundColor: isPressed ? 'white' : '#2A2C29',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (callback) {
            callback();
          } else {
            navigation.goBack();
          }
        }}>
        <FontAwesome5
          name="arrow-left"
          size={27.5}
          color={isPressed ? 'black' : '#2a80b9'}
        />
      </Pressable>
    </View>
  );
}
