import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { useWindowDimensions, View } from 'react-native';

export default function NotificationLoader({ count }) {
  const { height, width } = useWindowDimensions();

  const loaders = Array.from({ length: count }, (_, index) => (
    <View style={{ marginTop: -10, marginLeft: -10, marginRight: 20, marginBottom:-50 }}>
      <ContentLoader
        key={index}
        height={210}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 210'}>
        <Circle cx="40" cy="35" r="7.5" />
        <Rect x="65" y="25" width={(width - 140) * 0.75} height="20" />
        <Rect x="65" y="60" width={width} height="15" />
        <Rect x="65" y="87.5" width={width} height="15" />
        <Rect x="65" y="115" width={width} height="15" />
      </ContentLoader>
    </View>
  ));

  return <>{loaders}</>;
}
