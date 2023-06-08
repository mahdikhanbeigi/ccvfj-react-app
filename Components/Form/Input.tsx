/// src/Form/CustomInput.tsx

import { Input } from "@storybook/design-system";
import { IFormEntity } from "../FormGenerator/types";

interface Props extends IFormEntity {
  type: string;
}
export const CustomInput = ({
  name,
  error,
  touch,
  value,
  ...inputProps
}: Props) => {
  return (
    <Input
      {...inputProps}
      value={String(value)}
      id={name}
      label={name}
      errorTooltipPlacement={"auto"}
      error={error && touch ? error : ""}
      hideLabel={true}
    />
  );
};
