import { Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { Room } from "..";
import { auth, firebase, firestore } from "../../firebase";
import { IS_CHECK_PRIVAT_LOCAL_STORAGE } from "../../utils/constants";
import formGenerator from "../../utils/formGenerator";
import { ROOMS_PAGE } from "../../utils/rootPath";
import { DropDownBoxNull } from "../DropDownBox/DropDownBox";
import useStyles from "./ListGroupsStyle";
const ListGroups = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isCheckPrivet, setIsCheckPrivet] = useState(
    JSON.parse(localStorage.getItem(IS_CHECK_PRIVAT_LOCAL_STORAGE))
  );
  const messagesRef = firestore.collection("rooms");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [rooms] = useCollectionData(query, { idField: "id" });

  const [showRooms, setShowRooms] = useState([]);

  const [updateOpenForm, setUpdateOpenForm] = useState(null);
  const [selectRoomId, setSelectRoomId] = useState(null);
  const [newGroup, setNewGroup] = useState([
    {
      name: "name",
      value: "",
      group: 1,
      any: { variant: "outlined", placeholder: "Name your group" },
    },
    {
      name: "password",
      value: "",
      group: 1,
      any: { variant: "outlined", placeholder: "Password", type: "password" },
    },
  ]);

  const setEditGroupHendler = ({ room }) => {
    setNewGroup(
      newGroup.reduce((acc, item) => {
        for (const key in room) {
          if (key === item.name) {
            acc.push({
              ...item,
              value: room[key],
            });
          }
        }
        return acc;
      }, [])
    );
    createIsGroupHendler(true);
    setSelectRoomId(room.id);
  };
  const setIsCheckPrivetHendler = () => {
    setIsCheckPrivet(!isCheckPrivet);
  };
  const createIsGroupHendler = (flag) => {
    if (flag === false) {
      setNewGroup(
        newGroup.reduce((acc, item) => {
          acc.push({
            ...item,
            value: "",
          });

          return acc;
        }, [])
      );
    }
    if (updateOpenForm === false || updateOpenForm === true) {
      setUpdateOpenForm(null);
      setSelectRoomId(null);
      return null;
    }

    setUpdateOpenForm(flag);
  };

  useEffect(() => {
    if (Array.isArray(rooms)) {
      let _rooms = [...rooms];
      if (!isCheckPrivet) {
        _rooms = _rooms.filter((item) => !item.password.length && item);
      }
      setShowRooms(_rooms);
    }
    localStorage.setItem(IS_CHECK_PRIVAT_LOCAL_STORAGE, isCheckPrivet);
  }, [rooms, isCheckPrivet]);

  const onSubmitHendler = async (form) => {
    if (!!String(form.name).trim()) {
      createIsGroupHendler(null);
      const { uid } = auth.currentUser;
      const { E_ } = await messagesRef.add({
        ...form,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        autorGroup: uid,
      });
      const idNewRoom = E_.path.segments[1];
      history.push(`${ROOMS_PAGE}/${idNewRoom}`);
    }
  };
  const editRoomHendler = (form) => {
    createIsGroupHendler(null);
    messagesRef.doc(selectRoomId).update({
      ...form,
    });
  };
  const showCreateForm = () =>
    formGenerator({
      form: newGroup,
      setValue: setNewGroup,
      onSubmit: updateOpenForm ? editRoomHendler : onSubmitHendler,
      submitText: updateOpenForm ? "Save" : "Create",
      submitProps: { color: "secondary" },
    });

  return (
    <Box className={classes.listGroups}>
      <Box className={classes.controleList}>
        <Button
          color="secondary"
          onClick={() => createIsGroupHendler(false)}
          children={"Create Group"}
        />
        <FormControlLabel
          color="secondary"
          control={
            <Checkbox
              color="secondary"
              checked={isCheckPrivet}
              onChange={setIsCheckPrivetHendler}
            />
          }
          label="Show Privat Group"
        />
      </Box>

      <DropDownBoxNull flag={updateOpenForm} chieldren={showCreateForm()} />

      {showRooms.length ? (
        <Box className={classes.list}>
          {showRooms.map((item) => (
            <Room
              room={item}
              key={item.id}
              setNewGroupHendler={setEditGroupHendler}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default ListGroups;
