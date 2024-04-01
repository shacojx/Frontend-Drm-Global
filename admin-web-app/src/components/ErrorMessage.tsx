import React from "react";

export interface ErrorMessageProps {
  message: string;
  isError: boolean;
  showErrorMessage: boolean;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const containerClass = React.useMemo(() => {
    if (props.isError) {
      return "text-red-500";
    }

    return "";
  }, [props.isError]);

  if (props?.showErrorMessage && props.isError) {
    return <div className={[containerClass, 'mt-2'].join(' ')}>{props.message}</div>;
  }

  return <></>;
}
