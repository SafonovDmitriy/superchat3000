import { Box, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useStyles from "./HeaderStyles";
const Header = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:700px)");
  return (
    <Box
      className={clsx(
        classes.header,
        matches ? classes.sideBarOpen : classes.sideBarClose
      )}
    ></Box>
  );
};

export default Header;
