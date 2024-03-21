import { createContext } from "react";

import React, { useState } from "react";
import { StepType } from "../types/my-service.type";

interface AppContextInterface {
  detailFilling: StepType | null;
  setDetailFilling: React.Dispatch<React.SetStateAction<StepType>>;
}

const initialAppContext: AppContextInterface = {
  detailFilling: null,
  setDetailFilling: () => null,
};

export const LLCMyServiceContext = createContext(initialAppContext);

export const LLCMyServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [detailFilling, setDetailFilling] = useState<StepType>(
    initialAppContext.detailFilling as StepType
  );

  return (
    <LLCMyServiceContext.Provider
      value={{
        detailFilling,
        setDetailFilling,
      }}
    >
      {children}
    </LLCMyServiceContext.Provider>
  );
};
