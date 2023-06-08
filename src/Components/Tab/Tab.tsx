import { Fragment, PropsWithChildren, ReactNode } from "react";

interface Props {
  title: ReactNode;
  badge?: string;
}
export const Tab = ({ children }: PropsWithChildren<Props>) => {
  return <Fragment>{children}</Fragment>;
};
