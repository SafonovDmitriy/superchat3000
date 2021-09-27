import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { auth, firebase, firestore } from "../../firebase";
import { IS_CHECK_PRIVAT_LOCAL_STORAGE } from "../../utils/constants";
import formGenerator from "../../utils/formGenerator";
import { clearFields, fillFields } from "../../utils/ListGroups";
import { ROOMS_PAGE } from "../../utils/rootPath";
import ListGroups from "./ListGroups";

export default function ListGroupsContainer() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isCheckPrivet, setIsCheckPrivet] = useState(
    JSON.parse(localStorage.getItem(IS_CHECK_PRIVAT_LOCAL_STORAGE))
  );
  const messagesRef = firestore.collection("rooms");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [rooms] = useCollectionData(query, { idField: "id" });

  const [showRooms, setShowRooms] = useState([]);
  const [updateOpenForm, setUpdateOpenForm] = useState(null);
  const [selectRoom, setSelectRoom] = useState(null);
  const [newGroup, setNewGroup] = useState([
    {
      name: "name",
      value: "",
      group: 1,
      any: { variant: "outlined", placeholder: t("room_name") },
    },
    {
      name: "password",
      value: "",
      group: 1,
      any: {
        variant: "outlined",
        placeholder: t("password"),
        type: "password",
      },
    },
  ]);

  const setEditGroupHendler = ({ room }) => {
    fillFields({ setNewGroup, room });
    createIsGroupHendler(true);
    if (room.id === selectRoom?.id) {
      setSelectRoom(null);
      createIsGroupHendler(null);
      return null;
    }
    setSelectRoom(room);
  };

  const setIsCheckPrivetHendler = () => {
    setIsCheckPrivet(!isCheckPrivet);
  };
  const createIsGroupHendler = (flag) => {
    if (flag === false) {
      clearFields({ setNewGroup });
      if (updateOpenForm === false) {
        setUpdateOpenForm(null);
        return null;
      }
      if (updateOpenForm) {
        setSelectRoom(null);
      }
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
    messagesRef.doc(selectRoom.id).update({
      ...form,
    });
  };
  const showCreateForm = () =>
    formGenerator({
      form: newGroup,
      setValue: setNewGroup,
      onSubmit: updateOpenForm ? editRoomHendler : onSubmitHendler,
      submitText: updateOpenForm ? t("save") : t("create"),
      submitProps: { color: "secondary" },
    });
  const canselAllBox = (e) => {
    if (e.target.id === "rooms") setUpdateOpenForm(null);
  };
  return (
    <ListGroups
      canselAllBox={canselAllBox}
      createIsGroupHendler={createIsGroupHendler}
      isCheckPrivet={isCheckPrivet}
      setIsCheckPrivetHendler={setIsCheckPrivetHendler}
      updateOpenForm={updateOpenForm}
      showCreateForm={showCreateForm}
      showRooms={showRooms}
      setEditGroupHendler={setEditGroupHendler}
    />
  );
}
