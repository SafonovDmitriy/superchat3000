import { Box } from "@mui/system";
import React from "react";
import { Room } from "../..";
import useStyles from "./ShowListRoomsStyle";
export default function ShowListRooms({ showRooms, setEditGroupHendler }) {
  const classes = useStyles();
  return showRooms.length ? (
    <Box className={classes.list}>
      {showRooms.map((item) => (
        <Room
          room={item}
          key={item.id}
          setNewGroupHendler={setEditGroupHendler}
        />
      ))}
    </Box>
  ) : null;
}
