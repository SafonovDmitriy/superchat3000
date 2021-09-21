import { Box, Button, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { ChatMessage } from "..";
import { auth, firebase, firestore } from "../../firebase";
import useStyles from "./ChatRoomStyle";
const ChatRoom = () => {
  const { idRoom } = useParams();

  const classes = useStyles();
  const dummy = useRef();
  const messagesRef = firestore.collection("rooms");
  const query = messagesRef.doc(idRoom).collection("messages");
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await query.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box className={classes.massagesList}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
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
