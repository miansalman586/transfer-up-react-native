import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { useWindowDimensions, View } from 'react-native';

export default function AddressVerificationLoader() {
  const { height, width } = useWindowDimensions();

  return (
    <View style={{  }}>
      <ContentLoader
        height={200}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 70'}>
        <Rect x="0" y="0" width={width} height="20" />
        <Rect x="0" y="42.5" width={(width - 100) * 0.95} height="15" />
        <Rect x="0" y="70" width={(width - 140) * 0.8} height="15" />
        <Rect x="0" y="97.5" width={(width - 100) * 0.95} height="15" />
        <Rect x="0" y="125" width={(width - 140) * 0.8} height="15" />
      </ContentLoader>
    </View>
  );
}
