import { Page } from "../../../components/Page/Page";
import { EmailFileInput } from "../../../components/form/EmailFileInput/EmailFileInput";
import { Button } from "../../../components/Button/Button";
import React, { FC, FormEvent, useCallback, useState } from "react";
import { EmailFileData } from "../../../tools/processEmailFileList";
import { sendEmails, sendEmailsErrorMessages } from "./sendEmails";
import {
  createErrorMessage,
  createSuccessMessage,
  Message,
  MessageView,
} from "../../../components/form/MessageView/MessageView";
import { StringList } from "../../../components/StringList/StringList";

export const UploadEmailAddressesPage: FC = () => {
  const [files, setFiles] = useState<EmailFileData[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [failedEmails, setFailedEmails] = useState<string[] | null>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        const form: HTMLFormElement = event.target as HTMLFormElement;
        event.preventDefault();
        if (files === null) {
          setMessage(createErrorMessage("No emails were selected!"));
        } else {
          // Get the array of email addresses
          const emails = files.reduce((acc, file) => {
            acc.push(...file.emails);
            return acc;
          }, [] as string[]);

          // Submit the email addresses and display a message
          setLoading(true);
          setMessage(null);
          setFailedEmails(null);
          const res = await sendEmails(emails);
          if (res.ok) {
            // Clear the form
            form.reset();
            setFiles(null);

            setMessage(createSuccessMessage("Emails sent successfully!"));
          } else {
            const data = await res.json();
            const errorCode = data.error;
            const errorMessage =
              sendEmailsErrorMessages[errorCode] ??
              sendEmailsErrorMessages.default;

            setMessage(
              createErrorMessage(`There was an error: ${errorMessage}`)
            );
            setFailedEmails(data.emails);
          }
        }
      } catch (error) {
        setMessage(
          createErrorMessage(
            `There was an error: ${sendEmailsErrorMessages.default}`
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [files]
  );

  return (
    <Page>
      <h1>Awesome Send-Emails Interface</h1>
      <form onSubmit={handleSubmit}>
        <EmailFileInput onChange={setFiles} value={files} />
        <Button type="submit" disabled={!files || files.length === 0}>
          Send emails
        </Button>
        {loading ? <div>Loading...</div> : null}
        {message ? (
          <>
            <MessageView message={message} />
            {failedEmails ? <StringList items={failedEmails} /> : null}
          </>
        ) : null}
      </form>
    </Page>
  );
};
