import httpRequest from '../../utils/httpRequest';

export const autoConversion = async (
  customerBalanceId,
  isAutoConversion,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'customer-auto-conversion',
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
  customerBalanceId,
  isAutoWithdrawalRequest,
  appSecurityData,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'customer-auto-withdrawal-request',
    'post',
    {
      CustomerBalanceId: customerBalanceId,
      IsAutoWithdrawalRequest: isAutoWithdrawalRequest,
      AppSecurityData: appSecurityData,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const updateBalanceStatus = async (
  customerBalanceId,
  customerBalanceStatusId,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'update-customer-balance-status',
    'post',
    {
      CustomerBalanceId: customerBalanceId,
      CustomerBalanceStatusId: customerBalanceStatusId,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const addBalance = async (currencyId, setIsLoading, navigation) => {
  return await httpRequest(
    'add-customer-balance',
    'post',
    {
      CurrencyId: currencyId,
    },
    setIsLoading,
    true,
    navigation
  );
};
