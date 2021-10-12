import { Button } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useStyles from "./ButtonStyle";
export default function CustomButton({ children, className, ...props }) {
  const classes = useStyles();
  return (
    <Button {...props} className={clsx(className, classes.btn)}>
      {children}
    </Button>
  );
}
