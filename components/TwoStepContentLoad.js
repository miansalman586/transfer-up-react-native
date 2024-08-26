import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { useWindowDimensions, View } from 'react-native';

export default function TwoStepContentLoad({ count }) {
  const { height, width } = useWindowDimensions();

  const loaders = Array.from({ length: count }, (_, index) => (
    <View style={{ marginTop: -10, marginLeft: -10, marginRight: 20 }}>
      <ContentLoader
        key={index}
        height={150}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 70'}>
        <Circle cx="55" cy="55" r="27.5" />
        <Rect x="95" y="30" width={width} height="20" />
        <Rect x="95" y="62.5" width={(width - 140) * 0.95} height="15" />
        <Rect x="95" y="92.5" width={(width - 140) * 0.80} height="15" />
        <Rect x="95" y="120.5" width={(width - 140) * 0.25} height="15" />
      </ContentLoader>
    </View>
  ));

  return <>{loaders}</>;
}
