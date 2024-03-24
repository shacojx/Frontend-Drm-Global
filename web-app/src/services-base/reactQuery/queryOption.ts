import { QueryObserverOptions } from "@tanstack/react-query";

export type ExtraOptionQuery = Omit<QueryObserverOptions, 'queryFn' | 'queryKey'>

export function mergeQueryOptions<QueryOption extends QueryObserverOptions>(queryOption: QueryOption, extraOption?: ExtraOptionQuery): QueryOption {
  const mergedOption = {
    ...queryOption,
    enable: !extraOption?.enabled && !!queryOption.enabled
  }
  return mergedOption
}
