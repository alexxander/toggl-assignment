import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useRef,
} from "react";
import { EmailFileList } from "./EmailFileList";
import {
  EmailFileData,
  processEmailFileList,
} from "../../../tools/processEmailFileList";

interface Props {
  onChange: (files: EmailFileData[]) => void;
  value: EmailFileData[] | null;
}

export const EmailFileInput: FC<Props> = (props) => {
  const { onChange, value } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const files: EmailFileData[] = e.target.files
        ? await processEmailFileList(e.target.files)
        : [];

      // Reset the input value
      e.target.value = "";

      onChange(files);
    },
    [onChange]
  );

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (fileInputRef.current) fileInputRef.current.click();
    }, []);

  return (
    <div>
      <div>
        <input
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
          multiple
          onChange={handleChange}
        />
        <button type="button" onClick={handleButtonClick}>
          Select files
        </button>
      </div>
      <EmailFileList
        files={
          value
            ? value.map((file) => ({
                name: file.name,
                emailsCount: file.emails.length,
              }))
            : []
        }
      />
    </div>
  );
};
