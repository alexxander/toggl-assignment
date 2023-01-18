import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
