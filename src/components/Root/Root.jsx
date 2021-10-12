import { Box, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ChatRoom, ListGroups } from "..";
import { ROOMS_PAGE, ROOM_PAGE } from "../../utils/rootPath";
import useStyles from "./RootStyle";

const Root = ({ onShowHendler }) => {
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
        <Route exact path={ROOMS_PAGE} component={ListGroups} />
        <Route exact path={ROOM_PAGE} component={ChatRoom} />
        <Redirect to={ROOMS_PAGE} />
      </Switch>
    </Box>
  );
};

export default Root;
