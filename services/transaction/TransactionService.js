import httpRequest from '../../utils/httpRequest';

export const updateTransactionRequestStatus = async (
  requestId,
  requestStatusId,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'update-transaction-request-status',
    'post',
    {
      RequestId: requestId,
      RequestStatusId: requestStatusId,
    },
    setIsLoading,
    true,
    navigation
  );
};
