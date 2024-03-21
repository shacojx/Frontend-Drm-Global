import {
  ApiMasterServiceParam
} from "../../../api/types";

export function generateEditMasterServiceParam(
  data: ApiMasterServiceParam
): ApiMasterServiceParam {
  return {...data} as ApiMasterServiceParam
}
