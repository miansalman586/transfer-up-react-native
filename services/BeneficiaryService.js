import httpRequest from '../utils/httpRequest';

export const getBeneficiaries = async (navigation) => {
  return await httpRequest(
    'get-customer-beneficiary',
    'get',
    null,
    null,
    true,
    navigation
  );
};
