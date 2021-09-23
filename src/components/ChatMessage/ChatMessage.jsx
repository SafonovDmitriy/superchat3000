import { Menu, MenuItem } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import useStyles from "./ChatMessageStyle";
const ChatMessage = ({ message, selectMessage, editMessage, messagesRef }) => {
  const classes = useStyles();
  const { t } = useTranslation();
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
    selectMessage(null, null);
    handleClose(e);
  };
  const copyMessageHendler = (e) => {
    navigator.clipboard.writeText(message.text);
    selectMessage(null, null);
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
  const sendPopup = [
    { children: t("edit"), onClick: editMessageHendler },
    { children: t("delete"), onClick: deleteMessageHendler },
  ];
  const receivedPopup = [{ children: t("copy"), onClick: copyMessageHendler }];
  const popupMenu =
    uid === auth.currentUser.uid
      ? [...sendPopup, ...receivedPopup]
      : receivedPopup;
  const canselSelectMsg = (e) => {
    if (!e.target.outerText) {
      selectMessage(null, null);
    }
  };
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={canselSelectMsg}
      >
        {popupMenu.map((item, idx) => (
          <MenuItem {...item} key={idx} />
        ))}
      </Menu>
    </Box>
  );
};
export default ChatMessage;
