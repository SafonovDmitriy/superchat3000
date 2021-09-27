import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./ControleBoxStyle";
export default function ControleBox({
  createIsGroupHendler,
  isCheckPrivet,
  setIsCheckPrivetHendler,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.controleList}>
      <Button
        color="secondary"
        onClick={() => createIsGroupHendler(false)}
        children={t("create_room")}
      />
      <FormControlLabel
        color="secondary"
        control={
          <Checkbox
            color="secondary"
            checked={isCheckPrivet}
            onChange={setIsCheckPrivetHendler}
          />
        }
        label={t("show_private_rooms")}
      />
    </Box>
  );
}
