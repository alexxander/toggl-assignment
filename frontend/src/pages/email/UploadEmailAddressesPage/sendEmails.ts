export const sendEmailsErrorMessages: Record<string, string> = {
  send_failure: "Failed to send emails to some addresses",
  invalid_email_address: "Some addresses are invalid",
  default: "Something went wrong",
};

/**
 * Send the email addresses to the API
 * @param emails
 */
export async function sendEmails(emails: string[]) {
  return fetch("https://toggl-hire-frontend-homework.onrender.com/api/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emails }),
  });
}
