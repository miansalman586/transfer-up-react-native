import { Alert } from 'react-native';

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
      jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0IiwiZXhwIjoxNzU0NTY1MzIzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTMzLyIsImF1ZCI6ImxvY2FsaG9zdCJ9.CCH101YfR8XwsEciDFZhD5WShQrjTl9uLbb-KRuPbyw';
    }

    let requestBody;
    if (body) {
      requestBody = JSON.stringify(body);
    }

    const response = await fetch('http://10.101.133.173/api/' + url, {
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
