import React, { ButtonHTMLAttributes, FC } from "react";

interface Props {
  type: ButtonHTMLAttributes<void>["type"];
  disabled?: boolean;
  children: string;
}

export const Button: FC<Props> = ({ type, children, disabled }) => {
  return (
    <button type={type} disabled={disabled}>
      {children}
    </button>
  );
};
