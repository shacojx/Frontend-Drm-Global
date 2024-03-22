import { CompanyInformation, MailingAddress, OwnerInformation, ResponseParty } from "../api/types";

// TODO add i18n for all following error message
export const validateCompanyInfo = (info: Partial<CompanyInformation>): info is CompanyInformation => {
  if (info.companyName === "") throw "Company name is required";
  if (info.entityEnding === "") throw "Entity ending is required";
  if (info.industry === "") throw "Industry is required";
  if (info.website === "") throw "Website is required";
  if (info.description === "") throw "Description is required";
  if (info.region === "") throw "Region is required";

  return true;
};

export const validateOwnersInfo = (owners: Partial<OwnerInformation>[]): owners is OwnerInformation[]  => {
  for (let owner of owners) {
    if (owner.companyName === "") throw "Company name is required";
    if (!owner.ownership) throw "Ownership is required";
    if (owner.document?.length && owner.document.length === 0) throw "Document is required";
  }

  const totalShare = owners.reduce((acc, cur) => acc + (cur.ownership ?? 0), 0);
  if (totalShare !== 100) throw "Total ownership should be 100.";

  return true;
};

export const validateResponseParty = (data: Partial<ResponseParty>): data is ResponseParty => {
  if (data.firstName === "") throw "First name is required";
  if (data.lastName === "") throw "Last name is required";

  if (data.hasSSNorITIN && data.SSNorITIN === "") throw "SSN or ITIN is required";

  return true;
};

export const validateMailingAddress = (data: Partial<MailingAddress>): data is MailingAddress => {
  if (data.country === "") throw "Country is required";
  if (data.city === "") throw "City is required";
  if (data.address === "") throw "Address is required";
  if (data.zipCode === "") throw "Zip code is required";

  return true;
};

