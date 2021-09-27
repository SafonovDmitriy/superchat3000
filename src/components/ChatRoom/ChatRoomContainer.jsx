import React, { useEffect, useRef, useState } from "react";
import Notifier from "react-desktop-notification";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { auth, firebase, firestore, storage } from "../../firebase";
import { generateId } from "../../utils/ChatRoom";
import formGenerator from "../../utils/formGenerator";
import ChatRoom from "./ChatRoom";

const ChatRoomContainer = () => {
  const { idRoom } = useParams();
  const { t } = useTranslation();
  const [isOpenUpdateMessage, setIsOpenUpdateMessage] = useState(false);
  const [isOpenSmiles, setIsOpenSmiles] = useState(false);
  const [isOpenAttachFile, setIsOpenAttachFile] = useState(false);
  const [selectMsg, setSelectMsg] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [fieldText, setFieldText] = useState([
    {
      name: "text",
      value: "",
      any: { variant: "outlined", placeholder: t("change_message") },
    },
  ]);

  const changeMessageForm = () => {
    return formGenerator({
      form: fieldText,
      setValue: setFieldText,
      onSubmit: onSubmitHendler,
      submitText: t("save"),
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

  useEffect(() => {
    if (messages?.length) {
      const _lastMessage = messages[messages.length - 1];
      dummy.current.scrollIntoView({ behavior: "smooth" });

      if (lastMessage && _lastMessage?.uid !== auth?.currentUser?.uid) {
        Notifier.start(
          "New Message",
          _lastMessage.text,
          window.location.href,
          null
        );
        setLastMessage(_lastMessage);
        return null;
      }
      setLastMessage(_lastMessage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

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
    const { uid, photoURL, displayName } = auth.currentUser;
    const id = generateId();
    const message = {
      text: formValue,
      displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      isChanged: false,
    };
    if (selectPhoto.length) {
      const storageRef = storage.ref(`/${id}`);
      selectPhoto.forEach(async (photo) => {
        await storageRef.child(photo.name).put(photo);
        await messagesRef.doc(id).set(message);
      });
    } else {
      await messagesRef.add(message);
    }
    setFormValue("");
    setSelectPhoto([]);
    setIsOpenSmiles(false);
    setIsOpenUpdateMessage(false);
  };
  const selectMessage = (e = null, msg = null) => {
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
      setSelectMsg(message);
      setIsOpenAttachFile(false);
      setIsOpenUpdateMessage(true);
      return null;
    }
    setIsOpenUpdateMessage(false);
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
    setIsOpenAttachFile(false);
  };
  const setIsOpenAtachFileHendler = () => {
    setIsOpenUpdateMessage(false);
    setIsOpenAttachFile((prev) => !prev);
  };

  const canselAllEvent = (e) => {
    if (e.target.id === "message" || e.target.id === "messageBox") {
      if (isOpenSmiles) {
        setIsOpenSmiles(false);
        return null;
      }
      if (isOpenAttachFile) {
        setIsOpenAttachFile(false);
        return null;
      }
      setSelectMsg(null);
      setIsOpenUpdateMessage(false);
    }
  };
  const deleteOneSelectImg = (idx) => {
    setSelectPhoto(
      selectPhoto.filter((item, itemId) => itemId !== idx && item)
    );
  };
  return (
    <ChatRoom
      canselAllEvent={canselAllEvent}
      messages={messages}
      selectMsg={selectMsg}
      selectMessage={selectMessage}
      editMessage={editMessage}
      messagesRef={messagesRef}
      dummy={dummy}
      isOpenUpdateMessage={isOpenUpdateMessage}
      changeMessageForm={changeMessageForm}
      isOpenSmiles={isOpenSmiles}
      onEmojiClick={onEmojiClick}
      isOpenAttachFile={isOpenAttachFile}
      selectPhoto={selectPhoto}
      setSelectPhoto={setSelectPhoto}
      deleteOneSelectImg={deleteOneSelectImg}
      sendMessage={sendMessage}
      formValue={formValue}
      setFormValue={setFormValue}
      setIsOpenSmilesHendler={setIsOpenSmilesHendler}
      setIsOpenAtachFileHendler={setIsOpenAtachFileHendler}
    />
  );
};
export default ChatRoomContainer;
