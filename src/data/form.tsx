import { IForm, IGeneratorForm } from "ccvfj-react-app";
import { Fragment } from "react";
import * as Yup from "yup";
import { Modal, ClipboardInput, Title, Button } from "@storybook/design-system";
import type { FormikValues } from "formik";

const validationSchemaBasic: any = Yup.object({
  name: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});
const validationSchemaSign: any = Yup.object({
  signIn: Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  }),
});
const validationSchemaSign2fa: any = Yup.object({
  phoneNumber: Yup.string().min(11).max(11).required(),
  verifyCode: Yup.string().when("message", {
    is: (val) => !!val?.code,
    then: Yup.string()
      .required("Number input is required")
      .min(4, "Number input must have exactly 4 digits")
      .max(4, "Number input must have exactly 4 digits")
      .matches(/^[0-9]+$/, "Number input must be a valid number"),
  }),
});

export const BasicArgs: IGeneratorForm<FormikValues> = {
  defaultComponentProps: {
    context: {
      tab: {
        defaultActiveIndex: 0,
      },
    },
  },
  onSubmit: (values, { setSubmitting }) => {
    console.log("values", values);
    setSubmitting(false);
  },
  initialValues: {
    name: "",
    province: "",
    city: "",
  },
  validationSchema: validationSchemaBasic,
  listForm: [
    {
      title: "form test",
      form: [
        {
          name: "name",
          label: "Name",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            icon: "user",
          },
        },
        {
          name: "province",
          label: "Province",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "select",
            icon: "flag",
            options: [
              {
                value: 31,
                label: "Alborz",
              },
              {
                value: 24,
                label: "Tehran",
              },
            ],
          },
        },
        {
          name: "city",
          label: "City",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "select",
            icon: "flag",
            options: [
              {
                label: "Tehran",
                value: "358",
                parent_id: "24",
              },
              {
                label: "Karaj",
                value: "424",
                parent_id: "31",
              },
              {
                label: "Taleghan",
                value: "427",
                parent_id: "31",
              },
              {
                label: "Savojbolagh",
                value: "425",
                parent_id: "31",
              },
              {
                label: "Firouzkouh",
                value: "367",
                parent_id: "24",
              },
              {
                label: "Fardis",
                value: "429",
                parent_id: "31",
              },
            ],
          },
          parents: {
            value: [["province"]],
            type: "hide",
          },
        },
      ],
    },
  ],
};

export const SignArgs: IGeneratorForm<FormikValues> = {
  validationSchema: validationSchemaSign,
  onSubmit: (values, { setSubmitting }) => {
    console.log("values", values);
    setSubmitting(false);
  },
  defaultComponentProps: {
    context: {
      tab: {
        defaultActiveIndex: 1,
      },
    },
  },

  initialValues: {
    "signIn.email": "",
    "signIn.password": "",
    "signUp.firsname": "",
    "signUp.lastName": "",
    "signUp.email": "",
    "signUp.password": "",
    "signUp.rePassword": "",
  },
  listForm: [
    {
      title: "Sign In",
      form: [
        {
          name: "signIn.email",
          label: "Email",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            icon: "email",
          },
        },
        {
          name: "signIn.password",
          label: "Password",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            icon: "key",
            type: "password",
          },
        },
      ],
    },
    {
      title: "Sign Up",
      form: [
        {
          name: "signUp.firsname",
          label: "First name",
          col: {
            xs: 6,
          },
          inputProps: {
            componentName: "input",
          },
        },
        {
          name: "signUp.lastName",
          label: "Last name",
          col: {
            xs: 6,
          },
          inputProps: {
            componentName: "input",
          },
        },
        {
          name: "signUp.email",
          label: "Email",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            type: "email",
          },
        },
        {
          name: "signUp.password",
          label: "Password",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            type: "password",
          },
        },
        {
          name: "signUp.rePassword",
          label: "Repeat password",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            type: "password",
          },
        },
      ],
    },
  ],
};
function generateRandomNumberString() {
  let numberString = "";
  for (let i = 0; i < 4; i++) {
    numberString += Math.floor(Math.random() * 10);
  }
  return numberString;
}
export const Sign2fa: IGeneratorForm<{
  phoneNumber: string;
  verifyCode: string;
  message?: {
    code?: string;
    isOpen: boolean;
  };
}> = {
  validationSchema: validationSchemaSign2fa,
  onSubmit: (values, { setSubmitting, setFieldValue }) => {
    console.log("values", values, !!values.message);
    // action(JSON.stringify(values));
    if (!!values.message?.code) {
      setSubmitting(false);
    } else {
      setTimeout(() => {
        setFieldValue("message", {
          code: generateRandomNumberString(),
          isOpen: true,
        });
        setSubmitting(false);
      }, 3000);
    }
  },
  defaultComponentProps: {
    context: {
      tab: {
        defaultActiveIndex: 0,
      },
      btns: [
        (form: IForm) => {
          return (
            <Button
              appearance="primary"
              disabled={form.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          );
        },
        (form: IForm) => {
          return (
            <Button
              disabled={form.isSubmitting}
              onClick={() => form.resetForm()}
              type="reset"
              className="ms-2"
              appearance="outline"
            >
              Reset
            </Button>
          );
        },
      ],
    },
  },

  initialValues: {
    phoneNumber: "09",
    verifyCode: "",
  },
  listForm: [
    {
      title: "Sign",
      form: [
        {
          name: "phoneNumber",
          label: "Phone number",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            icon: "phone",
          },
        },
        {
          name: "message",
          label: "",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "custom",
            render: (form, isActive) => {
              const msg = form.values["message"];
              return (
                <Modal
                  isOpen={!!msg?.isOpen}
                  onClose={() => {
                    form.setFieldValue("message", {
                      ...msg,
                      isOpen: false,
                    });
                  }}
                >
                  {({ onClose }) => {
                    return (
                      <Fragment>
                        <div
                          style={{
                            padding: "3em",
                            width: 320,
                            margin: "auto",
                          }}
                        >
                          <Title>Verification code :</Title>
                          <ClipboardInput
                            id={msg?.code}
                            label="Verification code"
                            value={msg?.code}
                          />
                        </div>
                      </Fragment>
                    );
                  }}
                </Modal>
              );
            },
          },
        },
        {
          name: "verifyCode",
          label: "Code",
          col: {
            xs: 12,
          },
          inputProps: {
            componentName: "input",
            icon: "key",
          },
          parents: {
            type: "hide",
            value: [["message"]],
          },
        },
      ],
    },
  ],
};
