import httpRequest from '../../utils/httpRequest';

export const updateTransactionStatus = async (
  transactionId,
  transactionStatusId,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'update-merchant-transaction-status',
    'post',
    {
      TransactionId: transactionId,
      TransactionStatusId: transactionStatusId,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const getTransactions = async (
  offset,
  fetch,
  currencyId,
  searchByName,
  navigation
) => {
  return await httpRequest(
    'get-merchant-transaction',
    'post',
    {
      Offset: offset,
      Fetch: fetch,
      CurrencyId: currencyId,
      SearchByName: searchByName,
    },
    null,
    true,
    navigation
  );
};
