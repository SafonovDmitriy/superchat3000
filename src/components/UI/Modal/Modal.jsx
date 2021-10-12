import { Modal } from "@material-ui/core";
import { Box } from "@mui/system";
import clsx from "clsx";
import React from "react";
import useStyles from "./ModalStyle";
export default function CustomeModal({
  children,
  open,
  onClose,
  className = {},
  ...props
}) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      {...props}
      className={clsx(className, classes.modal)}
    >
      <Box className={classes.modalWindow}> {children}</Box>
    </Modal>
  );
}
