import clsx from "clsx";
import { auth } from "../../firebase";
import useStyles from "./ChatMessageStyle";
const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const classes = useStyles();
  return (
    <div className={clsx(classes.message, classes[messageClass])}>
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
        alt=""
        className={classes.avatar}
      />
      <p>{text}</p>
    </div>
  );
};
export default ChatMessage;
