import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";
import { copyMessage, deleteMessage, getPhotos } from "../../utils/ChatMessage";
import ChatMessage from "./ChatMessage";

export default function ChatMessageContainer({
  message,
  selectMessage,
  editMessage,
  messagesRef,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [allImages, setImages] = useState([]);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const { uid, id } = message;
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
    <ChatMessage
      message={message}
      openContextMenu={openContextMenu}
      allImages={allImages}
      anchorEl={anchorEl}
      open={open}
      handleClose={handleClose}
      canselSelectMsg={canselSelectMsg}
      popupMenu={popupMenu}
    />
  );
}
