import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';

import { View, Text, Pressable } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

export default function BottomSheet({
  snapPoints,
  bottomSheetModalRef,
  content,
  title,
}) {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backgroundStyle={{ borderRadius: 50, backgroundColor: '#2A2C29' }}
        snapPoints={snapPoints}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}>
          <View
            style={{
              marginRight: 25,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'white',
                marginLeft: 25,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>
            <Pressable
              onPress={() => {
                bottomSheetModalRef.current.close();
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="cross" size={32} color={'white'} />
            </Pressable>
          </View>
        </View>
        {content}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
