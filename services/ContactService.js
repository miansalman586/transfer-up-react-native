import httpRequest from '../utils/httpRequest';

export const getContacts = async (emailAddress, navigation) => {
  return await httpRequest(
    'get-customer-contact',
    'post',
    {
      EmailAddress: emailAddress,
    },
    null,
    true,
    navigation
  );
};

export const getContactDetail = async (
  merchantId,
  customerId,
  entityId,
  setIsLoading,
  navigation
) => {
  return await httpRequest(
    'get-customer-contact-detail',
    'post',
    {
      MerchantId: merchantId,
      CustomerId: customerId,
      EntityId: entityId,
    },
    setIsLoading,
    true,
    navigation
  );
};


