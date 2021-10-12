import { Chat } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IntercomProvider, useIntercom } from "react-use-intercom";
import { auth } from "../../firebase";
import { FabBtn } from "../UI";
import useStyles from "./IntercomStyle";

const IntercomBtn = () => {
  const classes = useStyles();
  const {
    shutdown,
    hide,
    show,
    update,
    showNewMessages,
    showMessages,
    boot,
    startTour,
  } = useIntercom();
  const [user] = useAuthState(auth);
  const onShowHendler = () => {
    boot({
      name: user.displayName,
      customAttributes: { custom_attribute_key: "hi mom" },
    });
    // startTour(1);
    showNewMessages();
  };
  return (
    <Box className={classes.intercomBtn}>
      <FabBtn onClick={onShowHendler} icon={<Chat />} />
    </Box>
  );
};

const Intercom = () => {
  const onHide = React.useCallback(
    () => console.log("Intercom did hide the Messenger"),
    []
  );
  return (
    <IntercomProvider
      appId={process.env.REACT_APP_INTERCOM_APP_ID}
      onHide={onHide}
      children={<IntercomBtn />}
    />
  );
};

export default Intercom;
