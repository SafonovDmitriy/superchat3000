import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useMediaQuery,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../img";
import { HOME_PAGE } from "../../utils/rootPath";
import useStyles from "./SideBarStyle";

const SideBar = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:700px)");
  const menu = [{ title: "About us", href: "/about", icon: <Info /> }];
  return (
    <Box
      className={clsx(classes.sidebar, matches ? classes.open : classes.close)}
    >
      <List
        subheader={
          <Link to={HOME_PAGE}>
            <ListSubheader className={classes.logoWrapper}>
              <img src={logo} alt="" className={classes.logo} />
            </ListSubheader>
          </Link>
        }
      >
        {menu.map((menuItem) => (
          <Link to={menuItem.href} key={menuItem.title}>
            <ListItem button>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
