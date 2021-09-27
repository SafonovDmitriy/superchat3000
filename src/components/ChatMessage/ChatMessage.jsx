import { Menu, MenuItem } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import useStyles from "./ChatMessageStyle";
import { copyMessage, deleteMessage, getPhotos } from "./services";

const ChatMessage = ({ message, selectMessage, editMessage, messagesRef }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { text, uid, photoURL, isChanged, displayName, id } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const [anchorEl, setAnchorEl] = useState(null);
  const [allImages, setImages] = useState([]);

  const open = Boolean(anchorEl);

  const editMessageHendler = (e) => {
    editMessage(message);
    handleClose(e);
  };

  useEffect(() => {
    const getPhotosHendler = async () => {
      const _listPhoto = await getPhotos({ storageIdFolder: id });
      setImages(_listPhoto);
    };
    getPhotosHendler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMessageHendler = async (e) => {
    deleteMessage({ messagesRef, messageId: id });
    selectMessage();
    handleClose(e);
  };
  const copyMessageHendler = (e) => {
    copyMessage({ text: message.text });
    selectMessage();
    handleClose(e);
  };
  const openContextMenu = (e) => {
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
      selectMessage();
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
      <Box onContextMenu={openContextMenu} className="body">
        <h5>{displayName}</h5>
        <span>
          {text} {isChanged ? <Edit /> : null}
        </span>
        {allImages.length ? (
          <Box className={classes.galleryPhoto}>
            {allImages.map((photo, idx) => (
              <Box key={`${photo}+${idx}`}>
                <img src={photo} alt="" />
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>

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
