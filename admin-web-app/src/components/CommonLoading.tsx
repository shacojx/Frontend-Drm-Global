import { IconSpinner } from "./icons";

export type CommonLoadingProps = {
  loading: boolean;
};

export type DisabledUIProps = {
  disabled: boolean;
  children?: React.ReactNode | React.ReactElement;
};

export function DisabledUI(props: DisabledUIProps) {
  if (props?.disabled) {
    return (
      <div
        className={[
          "absolute w-full h-full flex justify-center items-center bg-[#11111120] disabled z-999",
        ].join(" ")}
      >
        {props.children}
      </div>
    );
  }

  return <></>;
}

export function CommonLoading(props: CommonLoadingProps) {
  if (props?.loading) {
    return (
      <DisabledUI
        disabled={true}
        children={<IconSpinner className="w-20 h-20" />}
      ></DisabledUI>
    );
  }

  return <></>;
}
