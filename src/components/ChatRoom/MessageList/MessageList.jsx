import { Box } from "@mui/system";
import clsx from "clsx";
import React from "react";
import { ChatMessage } from "../..";
import useStyles from "./MessageListStyle";
export default function MessageList({
  canselAllEvent,
  messages,
  selectMsg,
  selectMessage,
  editMessage,
  messagesRef,
  dummy,
}) {
  const classes = useStyles();
  return (
    <Box
      className={classes.massagesList}
      onClick={canselAllEvent}
      id="messageBox"
    >
      {messages &&
        messages.map((msg) => (
          <Box
            key={msg.id}
            className={clsx(msg.id === selectMsg?.id ? classes.selectMsg : "")}
          >
            <ChatMessage
              message={msg}
              selectMessage={selectMessage}
              editMessage={editMessage}
              messagesRef={messagesRef}
            />
          </Box>
        ))}

      <span ref={dummy}></span>
    </Box>
  );
}
