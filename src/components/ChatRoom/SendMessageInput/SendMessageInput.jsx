import { Button, Input } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./SendMessageInputStyle";
import { AttachFile } from "@mui/icons-material";
import { auth } from "../../../firebase";
export default function SendMessageInput({
  sendMessage,
  formValue,
  setFormValue,
  setIsOpenSmilesHendler,
  setIsOpenAtachFileHendler,
  editMessage,
  messages,
  selectPhoto,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const onKeyDownHendler = (e) => {
    if (e.keyCode === 38 && !String(formValue).length) {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].uid === auth.currentUser.uid) {
          editMessage(messages[i]);
          return null;
        }
      }
    }
  };
  return (
    <form onSubmit={sendMessage} className={classes.form}>
      <Input
        value={formValue}
        onKeyDown={onKeyDownHendler}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder={t("say_something_nice")}
        className={classes.inputForSendMessage}
        endAdornment={
          <Box className={classes.smileButton}>
            <Button color="secondary" onClick={setIsOpenSmilesHendler}>
              😀
            </Button>
            <Button color="secondary" onClick={setIsOpenAtachFileHendler}>
              <AttachFile />
            </Button>
          </Box>
        }
      />

      <Button
        type="submit"
        disabled={!selectPhoto.length && !formValue}
        color="secondary"
      >
        🕊️
      </Button>
    </form>
  );
}
