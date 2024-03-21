import {
  CompanyInformation,
  MailingAddress,
  OwnerInformation,
  ResponseParty,
} from "src/types/my-company";

export const validateCompanyInfo = (info: Partial<CompanyInformation>): string | false => {
  if (info.companyName === "") return "Company name is required";
  if (info.entityEnding === "") return "Entity ending is required";
  if (info.industry === "") return "Industry is required";
  if (info.website === "") return "Website is required";
  if (info.description === "") return "Description is required";
  if (info.region === "") return "Region is required";

  return false;
};

export const validateOwnersInfo = (owners: Partial<OwnerInformation>[]): string | false => {
  for (let owner of owners) {
    if (owner.companyName === "") return "Company name is required";
    if (!owner.ownership) return "Ownership is required";
    if (owner.document?.length && owner.document.length === 0) return "Document is required";
  }

  const totalShare = owners.reduce((acc, cur) => acc + (cur.ownership ?? 0), 0);
  if (totalShare !== 100) return "Total ownership should be 100.";

  return false;
};

export const validateResponseParty = (data: Partial<ResponseParty>): string | false => {
  if (data.firstName === "") return "First name is required";
  if (data.lastName === "") return "Last name is required";

  if (data.hasSSNorITIN && data.SSNorITIN === "") return "SSN or ITIN is required";

  return false;
};

export const validateMailingAddress = (data: Partial<MailingAddress>): string | false => {
  if (data.country === "") return "Country is required";
  if (data.city === "") return "City is required";
  if (data.address === "") return "Address is required";
  if (data.zipCode === "") return "Zip code is required";

  return false;
};
