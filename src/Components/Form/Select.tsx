/// src/Form/CustomInput.tsx

import { Select } from "@storybook/design-system";
import { IFormEntity } from "../FormGenerator/types";

interface Option {
  label: string;
  value: string;
  parent_id?: string;
}

interface Props extends IFormEntity {
  type: string;
  options: Option[];
}
export const CustomSelect = ({
  name,
  error,
  touch,
  value,
  parentValues,
  ...inputProps
}: Props) => {
  return (
    <Select
      {...inputProps}
      options={[
        {
          label: "",
          value: "",
        },
        ...inputProps.options.filter((item) => {
          if (item.parent_id) {
            if (parentValues.length > 0) {
              return item.parent_id === parentValues[0][1];
            }
          } else {
            return true;
          }
        }),
      ]}
      value={String(value)}
      id={name}
      label={name}
      error={error && touch ? error : ""}
    />
  );
};
