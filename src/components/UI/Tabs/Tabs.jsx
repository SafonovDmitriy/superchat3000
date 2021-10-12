import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import useStyles from "./TabsStyle";
export default function CustomeTabs({ tabs, tabBtns }) {
  const classes = useStyles();
  return (
    <Tabs {...tabs} className={classes.tabs}>
      {tabBtns.map((tab, idx) => (
        <Tab {...tab} key={idx} tabIndex={idx} />
      ))}
    </Tabs>
  );
}
