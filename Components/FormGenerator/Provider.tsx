/// src/FormGenerator/ContextControl.tsx

import React, { Fragment, ReactNode, useMemo } from "react";
import { IContextElm, IForm, IFormElm, ListForm } from "ccvfj-react-app";
import { TabContainer, TabContainerProps } from "../Tab/TabContainer";
import { Tab } from "../Tab/Tab";
import { Button } from "@storybook/design-system";

export interface FormProviderProps {
  tab?: TabContainerProps;
  btns?: ((form: IForm) => typeof Button)[];
}
export const FormProvider = ({
  form,
  listForm,
  tab,
  btns,
}: FormProviderProps & IContextElm) => {
  const { isSubmitting } = form;

  // const _submitForm = (e: any) => {
  //   e.preventDefault(); /// stop submit form;
  //   console.log("form", form);
  //   // return;
  // };

  const data = useMemo(
    () =>
      listForm.map((item) => ({
        title: item.title,
        content: <ListForm form={item.form} />,
      })),
    [listForm]
  );

  return (
    <TabContainer defaultActiveIndex={tab?.defaultActiveIndex}>
      {data.map((tab, index) => {
        return (
          <Tab title={tab.title} key={index}>
            <div className="p-4">
              {tab.content}
              {btns ? (
                <Fragment>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {btns.map((btn, index) => {
                      const Btn = btn(form);
                      return React.cloneElement(Btn as any, {
                        key: index,
                      });
                    })}
                  </div>
                </Fragment>
              ) : (
                <Button
                  // onClick={_submitForm}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </div>
          </Tab>
        );
      })}
    </TabContainer>
  );
};
