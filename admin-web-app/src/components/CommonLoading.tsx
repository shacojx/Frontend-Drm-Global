import { IconSpinner } from "./icons";

export type CommonLoadingProps = {
  loading: boolean;
};
export function CommonLoading(props: CommonLoadingProps) {
  if (props?.loading) {
    return (
      <div
        className={
          "absolute w-full h-full flex justify-center items-center bg-[#11111120] z-999"
        }
      >
        <IconSpinner className="w-20 h-20" />
      </div>
    );
  }

  return <></>;
}
