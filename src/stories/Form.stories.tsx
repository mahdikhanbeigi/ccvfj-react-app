import { ComponentMeta, ComponentStory } from "@storybook/react";
import FormGenerator from "../Components/FormGenerator";
import { BasicArgs, SignArgs, Sign2fa } from "../data/form";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Config/Form",
  component: FormGenerator,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FormGenerator>;

const Template: ComponentStory<typeof FormGenerator> = (args) => (
  <FormGenerator {...args} />
);

export const Basic = Template.bind({});
export const Sign = Template.bind({});
export const SignTwoFA = Template.bind({});

Basic.args = BasicArgs;
Sign.args = SignArgs;
SignTwoFA.args = Sign2fa;
