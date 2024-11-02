import { Alert } from 'react-native';

import * as SecureStore from 'expo-secure-store';

export default async function httpRequest(
  url,
  method,
  body,
  auth,
  setIsLoading,
  navigation,
  isPublic
) {
  try {
    if (setIsLoading) setIsLoading(true);

    let  jwt = await SecureStore.getItemAsync('JwtToken');
    if (!jwt && !isPublic) {
      navigation.navigate('Login');

      return;
    }


    let requestBody;
    if (body) {
      requestBody = JSON.stringify(body);
    }

    const response = await fetch('http://10.101.41.218/api/' + url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + (auth ? jwt : ''),
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    

    if (setIsLoading) setIsLoading(false);

    if (response.status == 401 && !isPublic) {
      await SecureStore.deleteItemAsync('JwtToken');
      navigation.navigate('Login');

      return;
    }

    return response;
  } catch (error) {
    if (setIsLoading) setIsLoading(false);

    Alert.alert('Error', error.toString());
  }
}
