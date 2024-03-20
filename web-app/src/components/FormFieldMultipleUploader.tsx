import { useValidate } from "../hooks-ui/useValidateCaller";
import { FormFieldProps } from "../types/common";

type File = {
  id: string;
  name: string;
  url: string;
};

export function FormFieldMultipleUploader({
  id,
  onChange,
  validateCaller,
  isRequired,
  value,
}: FormFieldProps<File[]>) {
  const [shouldShowError, setShouldShowError] = useValidate(id, isRequired, value, validateCaller);

  return <div>FormFieldMultipleUploader</div>;
}
