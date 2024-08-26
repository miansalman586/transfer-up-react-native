import httpRequest from '../../utils/httpRequest';

export const changePassword = async (
  currentPassword,
  newPassword,
  appSecurityData,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'customer-change-password',
    'post',
    {
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
      AppSecurityData: appSecurityData,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const changeEmailAddress = async (
  newEmailAddress,
  password,
  appSecurityData,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'customer-change-email-address',
    'post',
    {
      NewEmailAddress: newEmailAddress,
      Password: password,
      AppSecurityData: appSecurityData,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const verifyPassword = async (
  currentPassword,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'customer-verify-password',
    'post',
    {
      Password: currentPassword,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const verifyPasscode = async (passcode, setIsLoading, navigation) => {
  return await httpRequest(
    'customer-verify-passcode',
    'post',
    {
      Passcode: passcode,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const verifyEmailAddress = async (
  emailAddress,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'has-customer-email-address',
    'post',
    {
      EmailAddress: emailAddress,
    },
    setIsLoading,
    false,
    navigation
  );
};

export const getUnverifiedEmailAddress = async (navigation) => {
  return await httpRequest(
    'get-customer-unverified-email-address',
    'get',
    null,
    null,
    true,
    navigation
  );
};

export const login = async (
  emailAddress,
  password,
  emailOTPCode,
  smsOTPCode,
  setIsLoading,
  navigation,
  notificationCode
) => {
  return await httpRequest(
    'authenticate-customer',
    'post',
    {
      EmailAddress: emailAddress,
      Password: password,
      EmailOTPCode: emailOTPCode,
      SMSOTPCode: smsOTPCode,
      TwoStepVerificationNotificationCode: notificationCode,
    },
    setIsLoading,
    false,
    navigation
  );
};

export const getOtherCustomerAccount = async (navigation) => {
  return await httpRequest(
    'get-other-merchant-account',
    'get',
    null,
    null,
    true,
    navigation
  );
};

export const logoutAll = async (setIsLoading, navigation) => {
  return await httpRequest(
    'customer-logout-all',
    'get',
    null,
    setIsLoading,
    true,
    navigation
  );
};

export const hasPhoneNumber = async (
  countryCode,
  phoneNumber,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'has-customer-phone-number',
    'post',
    {
      CountryCode: countryCode,
      PhoneNumber: phoneNumber,
    },
    setIsLoading,
    false,
    navigation
  );
};
