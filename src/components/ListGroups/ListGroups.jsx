import { Box } from "@material-ui/core";
import React from "react";
import { ShowListRooms } from "..";
import { DropDownBoxNull } from "../ChatRoom/DropDownBox/DropDownBox";
import ControleBox from "./ControleBox/ControleBox";
import useStyles from "./ListGroupsStyle";
const ListGroups = ({
  canselAllBox,
  createIsGroupHendler,
  isCheckPrivet,
  setIsCheckPrivetHendler,
  updateOpenForm,
  showCreateForm,
  showRooms,
  setEditGroupHendler,
}) => {
  const classes = useStyles();

  return (
    <Box onClick={canselAllBox} id="rooms" className={classes.listGroups}>
      <ControleBox
        createIsGroupHendler={createIsGroupHendler}
        isCheckPrivet={isCheckPrivet}
        setIsCheckPrivetHendler={setIsCheckPrivetHendler}
      />
      <DropDownBoxNull flag={updateOpenForm} chieldren={showCreateForm()} />
      <ShowListRooms
        showRooms={showRooms}
        setEditGroupHendler={setEditGroupHendler}
      />
    </Box>
  );
};

export default ListGroups;
