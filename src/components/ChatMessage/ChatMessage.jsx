import { Box } from "@mui/system";
import clsx from "clsx";
import { auth } from "../../firebase";
import useStyles from "./ChatMessageStyle";
import { Edit } from "@mui/icons-material";
const ChatMessage = ({ message }) => {
  const { text, uid, photoURL, isChanged } = message;
  console.log(`props.message`, message);
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const classes = useStyles();
  return (
    <Box className={clsx(classes.message, classes[messageClass])}>
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
        alt=""
        className={classes.avatar}
      />

      <p>
        {text} {isChanged ? <Edit /> : null}
      </p>
    </Box>
  );
};
export default ChatMessage;
