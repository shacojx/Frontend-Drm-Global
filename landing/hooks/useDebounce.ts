import { debounce } from "lodash-es";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => unknown;

export const useDebounce = <T extends Fn>(fn: T, wait = 400) => {
  const ref = useRef(debounce(fn, wait));

  useEffect(
    () => () => {
      ref.current.cancel();
    },
    [fn, wait]
  );

  return ref.current;
};
