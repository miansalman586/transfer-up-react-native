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

    await SecureStore.setItemAsync('JwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6InN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFiYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3Bvc3RhbGNvZGUiOiIrOTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjEyMzQ1NiIsImV4cCI6MjM1OTU3NDAwNX0.XUgbOfnHtO-Ylr1MKshoQBj0EV1LYZRtIXwsMY6GjQc')

    let jwt;
    if (auth) {
      jwt = await SecureStore.getItemAsync('JwtToken');
    }

    let requestBody;
    if (body) {
      requestBody = JSON.stringify(body);
    }

    const response = await fetch('http://10.101.59.133/api/' + url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (setIsLoading) setIsLoading(false);

    return response;
  } catch (error) {
    if (setIsLoading) setIsLoading(false);

    Alert.alert('Error', error.toString());
  }
}
