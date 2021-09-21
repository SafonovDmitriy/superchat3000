import { Box, Button, TextField } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { ChatMessage, DropDownBox } from "..";
import { auth, firebase, firestore } from "../../firebase";
import formGenerator from "../../utils/formGenerator";

import useStyles from "./ChatRoomStyle";
const ChatRoom = () => {
  const { idRoom } = useParams();

  const classes = useStyles();

  const [isOpenUpdateMessage, setIsOpenUpdateMessage] = useState(false);
  const [selectMsg, setSelectMsg] = useState(null);
  const [fieldText, setFieldText] = useState([
    {
      name: "text",
      value: "",
      any: { variant: "outlined", placeholder: "Name your group" },
    },
  ]);
  const changeMessageForm = () => {
    return formGenerator({
      form: fieldText,
      setValue: setFieldText,
      onSubmit: onSubmitHendler,
      submitText: "Save",
      submitProps: { color: "secondary" },
    });
  };

  const dummy = useRef();
  const messagesRef = firestore
    .collection("rooms")
    .doc(idRoom)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const onSubmitHendler = ({ text }) => {
    if (text !== selectMsg.text) {
      messagesRef.doc(selectMsg.id).update({
        text,
        isChanged: true,
      });
    }
    setSelectMsg(null);
  };
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  useEffect(() => {
    if (selectMsg && selectMsg.uid === auth.currentUser.uid) {
      setFieldText(
        fieldText.map((item) => ({
          ...item,
          value: selectMsg.text,
        }))
      );
      setIsOpenUpdateMessage(true);
      return null;
    }
    setIsOpenUpdateMessage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMsg]);
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      isChanged: false,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const selectMessage = (msg) => {
    if (selectMsg && msg.id === selectMsg.id) {
      setSelectMsg(null);
      return null;
    }
    setSelectMsg(msg);
  };
  return (
    <>
      <Box className={classes.massagesList}>
        {messages &&
          messages.map((msg) => (
            <Box
              key={msg.id}
              onClick={() => selectMessage(msg)}
              className={msg.id === selectMsg?.id ? classes.selectMsg : ""}
            >
              <ChatMessage message={msg} />
            </Box>
          ))}

        <span ref={dummy}></span>
      </Box>
      <Box className={classes.changeMsg}>
        <DropDownBox
          flag={isOpenUpdateMessage}
          chieldren={changeMessageForm()}
        />
      </Box>

      <form onSubmit={sendMessage} className={classes.form}>
        <TextField
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
          className={classes.inputForSendMessage}
        />

        <Button type="submit" disabled={!formValue} color="secondary">
          🕊️
        </Button>
      </form>
    </>
  );
};
export default ChatRoom;
