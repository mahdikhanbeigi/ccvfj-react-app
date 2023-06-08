import { formComponent } from "ccvfj-react-app";
import { FormControlInput, FormControlSelect } from "./Control";
import { FormProvider } from "./Provider";
formComponent.formElm = {
  /// [componentName] : Component
  input: FormControlInput,
  select: FormControlSelect,
};

formComponent.context = FormProvider;
