import { Menu, MenuItem } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useTranslation } from "react-i18next";
import { auth, storage } from "../../firebase";
import useStyles from "./ChatMessageStyle";

const ShowPhoto = ({ dirPath, fileName }) => {
  const storageRef = storage.ref(`/${dirPath}/${fileName}`);
  // eslint-disable-next-line no-unused-vars
  const [downloadUrl, loading, error] = useDownloadURL(storageRef);
  if (error?.code === "storage/object-not-found") {
    return <ShowPhoto dirPath={dirPath} fileName={fileName} />;
  }

  return <img src={downloadUrl} alt="" />;
};

const ChatMessage = ({ message, selectMessage, editMessage, messagesRef }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { text, uid, photoURL, isChanged, displayName } = message;
  const storageRef = storage.ref(`/${message.id}`);
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [allImages, setImages] = useState([]);
  const editMessageHendler = (e) => {
    editMessage(message);
    handleClose(e);
  };

  useEffect(() => {
    const getPhotos = async () => {
      const _photosList = await storageRef.listAll();
      _photosList.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
          setImages((allImages) => [...allImages, url]);
        });
      });
    };
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMessageHendler = async (e) => {
    const storageRef = await storage.ref(`/${message.id}`);
    const { items } = await storageRef.listAll();
    for await (let imageRef of items) {
      await imageRef.delete();
    }
    storageRef.delete();
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
      <Box onContextMenu={handleClick} className="body">
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
