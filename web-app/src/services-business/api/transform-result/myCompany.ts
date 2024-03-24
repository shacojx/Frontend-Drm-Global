import {
  CompanyDetail,
  CompanyInformation,
  Document,
  EntityEnding,
  MailingAddress,
  OwnerInformation,
  RawCompanyDetail,
  ResponseParty
} from "src/api/types";

export function transformGetCompanyDetail(data: RawCompanyDetail): CompanyDetail {
  // TODO:  implement after api is ready

  const companyDetail: CompanyDetail = {
    companyInfo: {
      companyName: data.companyName,
      description: data.companyDescription,
      entityEnding: data.entityEnding as EntityEnding,
      industry: data.industry,
      region: data.region ?? '',
      website: data.website
    },
    owners: data.owner,
    responseParty: {
      firstName: data.responsiblePartyFirstName ?? '',
      lastName: data.responsiblePartyLastName ?? '',
      hasSSNorITIN: !!data.responsiblePartySSNOrITIN,
      SSNorITIN: data.responsiblePartySSNOrITIN ?? '',
    },
    mailingAddress: {
      address: data.mailingAddress ?? '',
      city: data.mailingCity ?? '',
      country: data.mailingCountry ?? '',
      zipCode: data.mailingZipCode ?? '',
      state: data.mailingState ?? '', 
    },
    documents: data.document,
  };

  return companyDetail;
}


export const transformPostCompanyDetail = (companyDetail: CompanyDetail): RawCompanyDetail => {
  // TODO:  implement after api is ready

  return {} as unknown as RawCompanyDetail
}
