import { Box } from "@mui/system";
import clsx from "clsx";
import { auth } from "../../firebase";
import useStyles from "./ChatMessageStyle";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
const ChatMessage = ({ message, selectMessage, editMessage, messagesRef }) => {
  const classes = useStyles();

  const { text, uid, photoURL, isChanged } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const editMessageHendler = (e) => {
    editMessage(message);
    handleClose(e);
  };
  const deleteMessageHendler = (e) => {
    messagesRef.doc(message.id).delete();
    handleClose(e);
  };
  const copyMessageHendler = (e) => {
    navigator.clipboard.writeText(message.text);
    handleClose(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    selectMessage(e, message);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const popupMenu =
    uid === auth.currentUser.uid
      ? [
          { children: "Edit", onClick: editMessageHendler },
          { children: "Copy", onClick: copyMessageHendler },
          { children: "Delete", onClick: deleteMessageHendler },
          // { children: "Forward", onClick: () => {} },
        ]
      : [
          { children: "Copy", onClick: copyMessageHendler },
          // { children: "Forward", onClick: () => {} },
        ];

  return (
    <Box className={clsx(classes.message, classes[messageClass])} id="message">
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
        alt=""
        className={classes.avatar}
      />

      <p onContextMenu={handleClick}>
        {text} {isChanged ? <Edit /> : null}
      </p>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {popupMenu.map((item, idx) => (
          <MenuItem {...item} key={idx} />
        ))}
      </Menu>
    </Box>
  );
};
export default ChatMessage;
