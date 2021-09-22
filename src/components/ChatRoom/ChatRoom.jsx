import { Box, Button, Input } from "@material-ui/core";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
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
  const [isOpenSmiles, setIsOpenSmiles] = useState(false);
  const [selectMsg, setSelectMsg] = useState(null);

  const [fieldText, setFieldText] = useState([
    {
      name: "text",
      value: "",
      any: { variant: "outlined", placeholder: "Change Message" },
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

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const onSubmitHendler = ({ text }) => {
    if (text !== selectMsg.text && auth.currentUser.uid === selectMsg.uid) {
      messagesRef.doc(selectMsg.id).update({
        text,
        isChanged: true,
      });
    }
    setIsOpenSmiles(false);
    setIsOpenUpdateMessage(false);
    setSelectMsg(null);
  };

  useEffect(() => {
    if (!selectMsg) {
      setIsOpenUpdateMessage(false);
    }
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
    setIsOpenSmiles(false);
    setIsOpenUpdateMessage(false);
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const selectMessage = (e, msg) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if ((selectMsg && msg?.id === selectMsg?.id) || msg === null) {
      setSelectMsg(null);
      return null;
    }
    setSelectMsg(msg);
  };
  const editMessage = (message) => {
    if (message.uid === auth.currentUser.uid) {
      setFieldText((prevFieldText) =>
        prevFieldText.map((item) => ({
          ...item,
          value: message.text,
        }))
      );
      setIsOpenUpdateMessage(true);
      return null;
    }
    setIsOpenUpdateMessage(false);
  };
  const canselAllEvent = (e) => {
    if (e.target.id === "message") {
      if (isOpenSmiles) {
        setIsOpenSmiles(false);
        return null;
      }
      setSelectMsg(null);
    }
  };
  const onEmojiClick = (_, emojiObject) => {
    if (isOpenUpdateMessage) {
      setFieldText((prevFieldText) =>
        prevFieldText.map((item) => ({
          ...item,
          value: `${item.value}${emojiObject.emoji}`,
        }))
      );
    } else {
      setFormValue((prevText) => `${prevText}${emojiObject.emoji}`);
    }
  };
  const setIsOpenSmilesHendler = () => {
    setIsOpenSmiles((prev) => !prev);
  };
  return (
    <>
      <Box className={classes.massagesList}>
        {messages &&
          messages.map((msg) => (
            <Box
              key={msg.id}
              className={msg.id === selectMsg?.id ? classes.selectMsg : ""}
              onClick={canselAllEvent}
            >
              <ChatMessage
                message={msg}
                selectMessage={selectMessage}
                editMessage={editMessage}
                messagesRef={messagesRef}
              />
            </Box>
          ))}

        <span ref={dummy}></span>
      </Box>

      <Box className={classes.changeMsg}>
        <DropDownBox
          flag={isOpenUpdateMessage}
          chieldren={changeMessageForm()}
        />
        <DropDownBox
          flag={isOpenSmiles}
          chieldren={
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          }
          height={325}
          className={classes.smilesBox}
        />
      </Box>

      <form onSubmit={sendMessage} className={classes.form}>
        <Input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
          className={classes.inputForSendMessage}
          endAdornment={
            <Box className={classes.smileButton}>
              <Button color="secondary" onClick={setIsOpenSmilesHendler}>
                😀
              </Button>
            </Box>
          }
        />

        <Button type="submit" disabled={!formValue} color="secondary">
          🕊️
        </Button>
      </form>
    </>
  );
};
export default ChatRoom;
