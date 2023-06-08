/// src/FormGenerator/FormGeneratorExample.tsx

import FormGenerator, { IGeneratorForm } from "ccvfj-react-app";

function parseDotNotation(str: any, val: any, obj: any) {
  var currentObj = obj,
    keys = str.split("."),
    i,
    l = Math.max(1, keys.length - 1),
    key;

  for (i = 0; i < l; ++i) {
    key = keys[i];
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }

  currentObj[keys[i]] = val;
  delete obj[str];
}

function expandObj(obj: any) {
  for (var key in obj) {
    if (key.indexOf(".") !== -1) {
      parseDotNotation(key, obj[key], obj);
    }
  }
  return obj;
}

const FormGeneratorExample = ({
  validationSchema,
  listForm,
  initialValues,
  onSubmit,
  defaultComponentProps,
}: IGeneratorForm<any>) => {
  return (
    <FormGenerator
      defaultComponentProps={defaultComponentProps}
      validationSchema={validationSchema}
      listForm={listForm}
      onSubmit={onSubmit}
      initialValues={expandObj(initialValues)}
    />
  );
};

export default FormGeneratorExample;
