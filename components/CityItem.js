import { View, Text, Image, Pressable } from 'react-native';

import { useState } from 'react';

export default function CityItem({ callback, cityData, navigation }) {
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
      style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        backgroundColor: isPressed ? '#2A2C29' : '#13150F',
      }}
      onPress={() => {
        callback(cityData);
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            {cityData.CityName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
