import { Alert } from 'react-native';

import * as SecureStore from 'expo-secure-store';

export default async function httpRequest(
  url,
  method,
  body,
  auth,
  setIsLoading
) {
  try {
    if (setIsLoading) setIsLoading(true);

    let jwt;
    if (auth) {
      jwt = await SecureStore.getItemAsync('JwtToken');
    }

    let requestBody;
    if (body) {
      requestBody = JSON.stringify(body);
    }

    const response = await fetch('http://10.101.57.31/api/' + url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const data = await response.json();

    if (setIsLoading) setIsLoading(false);

    return data;
  } catch (error) {
    if (setIsLoading) setIsLoading(false);

    Alert.alert('Error', error.toString());
  }
}
