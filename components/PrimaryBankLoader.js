import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

import { useWindowDimensions, View } from 'react-native';

export default function PrimaryBankContentLoader() {
  const { height, width } = useWindowDimensions();

  return (
    <View style={{}}>
      <ContentLoader
        height={20}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 20'}>
        <Rect width={width} height="20" />
      </ContentLoader>
      <View
        style={{
          marginTop: 10,
          borderWidth: 1,
          borderColor: '#2A2C29',
        }}></View>
      <ContentLoader
        style={{ marginTop: 15 }}
        height={12}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 12'}>
        <Rect width={width} height="12" />
      </ContentLoader>
      <ContentLoader
        style={{ marginTop: 15 }}
        height={12}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 12'}>
        <Rect width={width} height="12" />
      </ContentLoader>
      <ContentLoader
        style={{ marginTop: 15 }}
        height={12}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 12'}>
        <Rect width={width} height="12" />
      </ContentLoader>
      <ContentLoader
        style={{ marginTop: 15 }}
        height={12}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox={width + ' 12'}>
        <Rect width={width} height="12" />
      </ContentLoader>
    </View>
  );
}
