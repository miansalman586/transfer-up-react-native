import httpRequest from '../../utils/httpRequest';

export const setAppearance = async (appearanceId, setIsLoading, navigation) => {
  return await httpRequest(
    'merchant-appearance',
    'post',
    {
      AppearanceId: appearanceId,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const getSettings = async (navigation) => {
  return await httpRequest(
    'get-merchant-setting',
    'get',
    null,
    null,
    true,
    navigation
  );
};

export const setTwoStepVerification = async (
  twoStepVerificationId,
  appSecurityData,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'merchant-two-step-verification',
    'post',
    {
      TwoStepVerificationId: twoStepVerificationId,
      AppSecurityData: appSecurityData,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const setAppSecurity = async (
  appSecurityId,
  appSecurityData,
  setIsLoading,
  navigation,
  currentPasscode
) => {
  return await httpRequest(
    'merchant-app-security',
    'post',
    {
      AppSecurityId: appSecurityId,
      AppSecurityData: appSecurityData,
      CurrentPasscode: currentPasscode,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const emailAddressSearchable = async (
  isSearchable,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'merchant-email-address-searchable',
    'post',
    {
      IsEmailAddressSearchable: isSearchable,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const phoneNumberSearchable = async (
  isSearchable,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'merchant-phone-number-searchable',
    'post',
    {
      IsPhoneNumberSearchable: isSearchable,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const changePhoneNumberOTP = async (
  newPhoneNumber,
  newCountryCode,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'generate-merchant-change-phone-number-otp-code',
    'post',
    {
      NewPhoneNumber: newPhoneNumber,
      NewCountryCode: newCountryCode,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const changePhoneNumber = async (
  appSecurityData,
  phoneCode,
  newPhoneCode,
  newPhoneNumber,
  newCountryCode,
  cityId,
  address,
  zipCode,
  addressVerificationDocumentId,
  addressVerificationDocument,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'merchant-change-phone-number',
    'post',
    {
      AppSecurityData: appSecurityData,
      PhoneNumberOTPCode: phoneCode,
      NewPhoneNumberOTPCode: newPhoneCode,
      NewPhoneNumber: newPhoneNumber,
      NewCountryCode: newCountryCode,
      CityId: cityId,
      Address: address,
      ZipCode: zipCode,
      AddressVerificationDocumentId: addressVerificationDocumentId,
      AddressVerificationDocument: addressVerificationDocument,
    },
    setIsLoading,
    true,
    navigation
  );
};
