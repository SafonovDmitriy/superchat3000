import { Box, Button } from "@material-ui/core";
import { Delete, Edit, Lock, LockOpen } from "@mui/icons-material";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { ModalPasswordConfirmation } from "../..";
import { auth, firestore } from "../../../firebase";
import { ROOMS_PAGE } from "../../../utils/rootPath";
import useStyles from "./RoomStyle";

const Room = ({ room, setNewGroupHendler }) => {
  const classes = useStyles();
  const history = useHistory();

  const messagesRef = firestore
    .collection("rooms")
    .doc(room.id)
    .collection("messages");
  const [messages] = useCollectionData(messagesRef, { idField: "id" });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const setIsOpenModalHendler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const moveToRoom = () => {
    if (room.password.length) {
      setIsOpenModal(true);
      return null;
    }
    history.push(`${ROOMS_PAGE}/${room.id}`);
  };
  const stopPropagatio = (e, func, room) => {
    e.stopPropagation();
    func(room);
  };
  const editRoom = (room) => {
    setNewGroupHendler({ room });
  };
  const deleteRoom = (room) => {
    messages.forEach((message) => {
      messagesRef.doc(message.id).delete();
    });

    firestore.collection("rooms").doc(room.id).delete();
  };
  return (
    <>
      <ModalPasswordConfirmation
        isOpenModal={isOpenModal}
        setIsOpenModalHendler={setIsOpenModalHendler}
        room={room}
      />
      <Box className={classes.room} onClick={moveToRoom}>
        {room.password.length ? <Lock /> : <LockOpen />}
        <Box className={classes.controleRooms}>
          <p>{room.name}</p>
          {auth.currentUser.uid === room.autorGroup && (
            <Box>
              <Button onClick={(e) => stopPropagatio(e, editRoom, room)}>
                <Edit />
              </Button>
              <Button onClick={(e) => stopPropagatio(e, deleteRoom, room)}>
                <Delete />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Room;
