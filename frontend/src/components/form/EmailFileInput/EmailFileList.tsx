import React, { FC } from "react";

export interface EmailFileListing {
  name: string;
  emailsCount: number;
}

interface Props {
  files: EmailFileListing[];
}

export const EmailFileList: FC<Props> = ({ files }) => {
  return files.length > 0 ? (
    <ul>
      {files.map((item) => (
        <li key={item.name}>
          {item.name} ({item.emailsCount})
        </li>
      ))}
    </ul>
  ) : (
    <div>No files were selected.</div>
  );
};
