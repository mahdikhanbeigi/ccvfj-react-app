/// src/FormGenerator/FormControl.tsx

import { IFormElmClient } from "ccvfj-react-app";
import { IFormEntity, IValues, ParentValues } from "./types";
import * as FormComponent from "../Form";
import { useMemo } from "react";
import { objectByString } from "@starter-frontend/constants";

export interface FormControlProps extends IFormElmClient {
  component: React.FC<any>;
}

export const FormControl = ({
  component: Component,
  name = "",
  isActive,
  label,
  parents,
  form,
  inputProps,
}: FormControlProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
  } = form;
  const value = objectByString(values, name) as IValues;
  const error = objectByString(errors, name);
  const touch = objectByString(touched, name);

  const _onChange: IFormEntity["onChange"] = (event, value) => {
    if (!isActive) return;
    if (
      typeof event === "string" &&
      typeof value !== "undefined" &&
      setFieldValue
    ) {
      setFieldValue(event, value);
    } else if (handleChange) {
      handleChange(event);
    }
  };

  const parentValues = useMemo(() => {
    if (parents?.value && parents.value.length > 0) {
      return parents.value.reduce((p, c) => {
        const parentValue = objectByString(values, c[0]);
        p.push([c[0], parentValue]);
        return p;
      }, [] as ParentValues);
    }
    return [];
  }, [values, parents]);

  return (
    <Component
      {...inputProps}
      parentValues={parentValues}
      label={inputProps.label || label}
      name={name}
      value={value}
      onChange={_onChange}
      disabled={isSubmitting || !isActive}
      onBlur={() => {
        setFieldTouched(name, true);
      }}
      touch={touch}
      error={error}
      hideLabel={!inputProps.label}
    />
  );
};

export const FormControlInput = (props: IFormElmClient) => {
  return <FormControl {...props} component={FormComponent.CustomInput} />;
};
export const FormControlSelect = (props: IFormElmClient) => {
  return <FormControl {...props} component={FormComponent.CustomSelect} />;
};
