import httpRequest from '../utils/httpRequest';
import * as SecureStore from 'expo-secure-store';

export const getAppearance = async (navigation) => {
  return await httpRequest(
    'get-appearance',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getAddressVerificationDocument = async (navigation) => {
  return await httpRequest(
    'get-address-verification-document',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getAppSecurity = async (navigation) => {
  return await httpRequest(
    'get-app-security',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getTwoStepVerification = async (navigation) => {
  return await httpRequest(
    'get-two-step-verification',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const logout = async (navigation, entityId) => {
  await SecureStore.deleteItemAsync('JwtToken');
  navigation.navigate('Login', { entityId });
};

export const login = async (navigation, jwtToken) => {
  await SecureStore.setItemAsync('JwtToken', jwtToken);
  navigation.navigate('Tab');
};

export const isLoggedIn = async () => {
  return await SecureStore.getItemAsync('JwtToken');
};

export const getCityByCountryId = async (
  countryId,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'get-city-by-countryid',
    'post',
    (data = { countryId: countryId }),
    setIsLoading,
    false,
    navigation
  );
};

export const getCurrency = async (navigation) => {
  return await httpRequest(
    'get-currency',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getTransactionFee = async (navigation) => {
  return await httpRequest(
    'get-transaction-fee',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getCountry = async (navigation) => {
  return await httpRequest('get-country', 'get', null, null, false, navigation);
};

export const getTransferType = async (navigation) => {
  return await httpRequest(
    'get-transfer-type',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getTransferMethod = async (navigation) => {
  return await httpRequest(
    'get-transfer-method',
    'get',
    null,
    null,
    false,
    navigation
  );
};

export const getPayPalAccount = async (navigation) => {
  return await httpRequest(
    'get-paypal-account',
    'get',
    null,
    null,
    false,
    navigation
  );
};
