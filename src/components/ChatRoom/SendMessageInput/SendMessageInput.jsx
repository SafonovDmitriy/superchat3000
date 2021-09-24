import { Button, Input } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./SendMessageInputStyle";
import { AttachFile } from "@mui/icons-material";
export default function SendMessageInput({
  sendMessage,
  formValue,
  setFormValue,
  setIsOpenSmilesHendler,
  setIsOpenAtachFileHendler,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <form onSubmit={sendMessage} className={classes.form}>
      <Input
        value={formValue}
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

      <Button type="submit" disabled={!formValue} color="secondary">
        🕊️
      </Button>
    </form>
  );
}
