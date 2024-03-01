import React from "react";

export type FormStatus = 'typing' | 'requesting' | 'success' | 'error'
type OptionInfo<T extends React.Key > = {
  value: T,
  label: string,
  iconElement?: JSX.Element,
}
