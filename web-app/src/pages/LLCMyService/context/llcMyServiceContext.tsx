import { createContext } from "react";
import React, { useState } from "react";
import { MyServiceStepType } from "../../../api/types";

interface AppContextInterface {
  detailFilling: MyServiceStepType | null;
  setDetailFilling: React.Dispatch<React.SetStateAction<MyServiceStepType>>;
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
  const [detailFilling, setDetailFilling] = useState<MyServiceStepType>(
    initialAppContext.detailFilling as MyServiceStepType
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
