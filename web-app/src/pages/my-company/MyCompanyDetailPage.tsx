import clsx from "clsx";
import { useState } from "react";
import { CompanyInformationTab } from "./CompanyInformationTab";
import { OwnerInformationTab } from "./OwnerInformationTab";
import { MailingAddressTab } from "./MailingAddressTab";
import { ResponsePartyTab } from "./ResponsePartyTab";
import { DocumentTab } from "./DocumentTab";

const TABS = [
  "Company Information",
  "Owner Information",
  "Responsible Party",
  "Mailing address",
  "Document",
] as const;

export function MyCompanyDetailPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white w-full flex flex-col border border-l border-stroke">
      <div className="grow p-10 overflow-y-auto">
        <h2 className="mb-12 text-lg font-semibold relative after:absolute after:w-16 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1">
          Company Detail
        </h2>

        <div className="rounded-lg p-1 border border-solid border-surface mb-12 overflow-x-scroll">
          <div className="flex justify-between">
            {TABS.map((tab) => (
              <div
                key={tab}
                className={clsx(
                  "h-12 flex justify-center items-center grow font-bold rounded-lg cursor-pointer transition-all w-max line-clamp-1 min-w-52",
                  activeTab === tab ? "bg-primary_25 text-black" : "text-surface"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-solid border-surface rounded-lg p-6">
          {activeTab === "Company Information" && <CompanyInformationTab readonly={!isEditing} />}
          {activeTab === "Owner Information" && <OwnerInformationTab readonly={!isEditing} />}
          {activeTab === "Responsible Party" && <ResponsePartyTab readonly={!isEditing} />}
          {activeTab === "Mailing address" && <MailingAddressTab readonly={!isEditing} />}
          {activeTab === "Document" && <DocumentTab readonly={!isEditing} />}
        </div>
      </div>

      <div className="h-20 shrink-0 border-t border-solid border-stroke flex justify-end gap-2 items-center px-8">
        {isEditing && (
          <button
            className="border border-solid border-surface h-13 px-6 rounded-lg font-semibold"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
        <button
          className="rounded-lg bg-primary h-13 px-6 text-white font-semibold"
          onClick={() => {
            if (isEditing) {
              // INFO: handle save
              alert("Save success");
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
