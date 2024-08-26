import * as ImagePicker from 'expo-image-picker';
import { Image, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';

async function resizeImage(uri, base64, width, height) {
  return {
    uri: uri,
    base64: base64,
    width: Dimensions.get('window').width - 20,
    height: (height / width) * (Dimensions.get('window').width - 20),
  };
}

export default async function pickImage() {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status == 'granted') {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      base64: true,
    });

    if (!result.canceled) {
      return new Promise((resolve, reject) => {
        Image.getSize(
          result.uri,
          (width, height) => {
            const resizedImage = resizeImage(
              result.uri,
              result.base64,
              width,
              height
            );
            resolve(resizedImage);
          },
          reject
        );
      });
    }
  }
}
