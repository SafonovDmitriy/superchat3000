import { Box, useMediaQuery } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import { HomePage } from "..";
import { HOME_PAGE } from "../../utils/rootPath";
import useStyles from "./RootStyle";
import clsx from "clsx";
const Root = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:700px)");
  return (
    <Box
      className={clsx(
        classes.root,
        matches ? classes.sideBarOpen : classes.sideBarClose
      )}
    >
      <Switch>
        <Route exact path={HOME_PAGE} component={HomePage} />
      </Switch>
    </Box>
  );
};

export default Root;
