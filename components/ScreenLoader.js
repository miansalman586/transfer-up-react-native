import { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import PreLoader from './PreLoader';

export default function ScreenLoader() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13150F',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[PreLoader.preloader, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
}
