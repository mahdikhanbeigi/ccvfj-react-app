import React, { Fragment, PropsWithChildren, useMemo, useState } from "react";
import styles from "./style.module.scss";

export interface TabContainerProps {
  defaultActiveIndex?: number;
}
export const TabContainer = ({
  defaultActiveIndex,
  children,
}: PropsWithChildren<TabContainerProps>) => {
  const tabs = React.Children.toArray(children).filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(
    defaultActiveIndex && defaultActiveIndex <= tabs.length
      ? defaultActiveIndex
      : 0
  );

  const steps: any = useMemo(() => {
    if (tabs.length >= activeIndex) {
      const currentTab = tabs[activeIndex];
      return currentTab;
    }
    return <Fragment />;
  }, [tabs, activeIndex]);

  return (
    <Fragment>
      <div className={styles["container"]}>
        {tabs.length > 1 && (
          <ul className={styles["list"]}>
            {tabs.map((tab: any, index) => {
              return (
                <li key={index}>
                  <button
                    type="button"
                    className={index === activeIndex ? styles["active"] : ""}
                    onClick={() => setActiveIndex(index)}
                  >
                    {tab.props.title}
                    {tab.props.badge && (
                      <span className={styles["badge"]}>{tab.props.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles["content"]}>{steps}</div>
      </div>
    </Fragment>
  );
};
