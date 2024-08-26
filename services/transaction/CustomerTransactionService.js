import httpRequest from '../../utils/httpRequest';

export const getTransferPayDetail = async (
  emailAddress,
  payeeId,
  currencyId,
  navigation
) => {
  return await httpRequest(
    'get-transfer-pay-payee-detail',
    'post',
    {
      EmailAddress: emailAddress,
      PayeeId: payeeId,
      CurrencyId: currencyId,
    },
    null,
    true,
    navigation
  );
};

export const initiateTransactionRequest = async (
  inputValue,
  requestTypeId,
  transferTypeId,
  currencyId,
  setIsLoading,
  navigation,
  transactionMethodId
) => {
  return await httpRequest(
    'initiate-transaction-request',
    'post',
    {
      Amount: inputValue,
      RequestTypeId: requestTypeId,
      TransferTypeId: transferTypeId,
      CurrencyId: currencyId,
      TransactionMethodId: transactionMethodId,
    },
    setIsLoading,
    true,
    navigation
  );
};

export const updateTransactionStatus = async (
  transactionId,
  transactionStatusId,
  setIsLoading,
  navigation,
  paypalTransactionId
) => {
  return await httpRequest(
    'update-customer-transaction-status',
    'post',
    {
      TransactionId: transactionId,
      TransactionStatusId: transactionStatusId,
      PayPalTransactionId: paypalTransactionId,
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
    'get-customer-transaction',
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
