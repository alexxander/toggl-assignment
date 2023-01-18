import React, { FC } from "react";

enum MessageType {
  success = "success",
  error = "error",
}

export interface Message {
  mode: MessageType;
  message: string;
}

interface Props {
  message: Message;
}

export const MessageView: FC<Props> = (props) => {
  const { message } = props;

  return (
    <div
      style={{ color: message.mode === MessageType.success ? "green" : "red" }}
    >
      {message.message}
    </div>
  );
};

export const createErrorMessage = (message: string): Message => {
  return { message, mode: MessageType.error };
};

export const createSuccessMessage = (message: string): Message => {
  return { message, mode: MessageType.success };
};
