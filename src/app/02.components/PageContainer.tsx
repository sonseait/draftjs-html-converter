import * as React from "react";
import "./page-container.css";

export interface PageContainerProps {
  title: string;
}

export const PageContainer: React.FunctionComponent<PageContainerProps> = (
  props
) => {
  return (
    <div>
      <div className="page_container__title">
        <strong>{props.title}</strong>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
