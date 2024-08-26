import httpRequest from '../../utils/httpRequest';

export const autoConversion = async (
  customerBalanceId,
  isAutoConversion,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'merchant-auto-conversion',
    'post',
    {
      IsAutoConversion: isAutoConversion,
      CustomerBalanceId: customerBalanceId,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const autoWithdrawalRequest = async (
  merchantSecurityId,
  isAutoWithdrawalRequest,
  appSecurityData,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'merchant-auto-withdrawal-request',
    'post',
    {
      MerchantSecurityId: merchantSecurityId,
      IsAutoWithdrawalRequest: isAutoWithdrawalRequest,
      AppSecurityData: appSecurityData,
    },
    setIsLoading,
    true,
    navigation
  );
};
