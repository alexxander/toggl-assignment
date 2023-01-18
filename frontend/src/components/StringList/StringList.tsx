import React, { FC } from "react";

interface Props {
  items: string[];
}
export const StringList: FC<Props> = (props) => {
  const { items } = props;
  return (
    <ul>
      {items.map((item, i) => (
        // Adding i for handling of duplicate items
        <li key={i + item}>{item}</li>
      ))}
    </ul>
  );
};
