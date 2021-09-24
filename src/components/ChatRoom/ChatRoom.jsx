import { Box } from "@material-ui/core";
import clsx from "clsx";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Notifier from "react-desktop-notification";
import { useDropzone } from "react-dropzone";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { ChatMessage, DropDownBox, SendMessageInput } from "..";
import { auth, firebase, firestore, storage } from "../../firebase";
import formGenerator from "../../utils/formGenerator";
import useStyles from "./ChatRoomStyle";

const ChatRoom = () => {
  const { idRoom } = useParams();

  const classes = useStyles();

  const [isOpenUpdateMessage, setIsOpenUpdateMessage] = useState(false);
  const [isOpenSmiles, setIsOpenSmiles] = useState(false);
  const [isOpenAttachFile, setIsOpenAttachFile] = useState(false);
  const [selectMsg, setSelectMsg] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const { t } = useTranslation();
  const [selectPhoto, setselectPhoto] = useState([]);
  const [fieldText, setFieldText] = useState([
    {
      name: "text",
      value: "",
      any: { variant: "outlined", placeholder: t("change_message") },
    },
  ]);

  const onDrop = useCallback((acceptedFiles) => {
    const _photoList = [];
    acceptedFiles.forEach((file) => {
      const type = file.type.slice(0, file.type.indexOf("/"));
      if (type === "image") {
        _photoList.push(file);
      }
    });

    setselectPhoto(_photoList);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    const { E_ } = await messagesRef.add({
      text: formValue,
      displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      isChanged: false,
    });

    if (selectPhoto.length) {
      const segments = E_?.path?.segments;
      const storageRef = storage.ref(`/${segments[segments.length - 1]}`);
      selectPhoto.forEach((photo) => {
        storageRef.child(photo.name).put(photo);
      });
    }
    setFormValue("");
    setselectPhoto([]);
    setIsOpenSmiles(false);
    setIsOpenUpdateMessage(false);
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
      setIsOpenAttachFile(false);
      setIsOpenUpdateMessage(true);
      return null;
    }
    setIsOpenUpdateMessage(false);
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
  const setIsOpenAtachFileHendler = () => {
    setIsOpenUpdateMessage(false);
    setIsOpenAttachFile((prev) => !prev);
  };

  return (
    <>
      <Box
        className={classes.massagesList}
        onClick={canselAllEvent}
        id="messageBox"
      >
        {messages &&
          messages.map((msg) => (
            <Box
              key={msg.id}
              className={clsx(
                msg.id === selectMsg?.id ? classes.selectMsg : ""
              )}
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

      <Box className={classes.changeMessageForm}>
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
        <DropDownBox
          flag={isOpenAttachFile}
          className={classes.dropFileZoneWrapper}
          height={selectPhoto.length ? 300 : 100}
          chieldren={
            <>
              <Box {...getRootProps()} className={classes.dropFileZone}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag'n drop some files here, or click to select files</p>
                )}
              </Box>
              <Box className={classes.galleryPhoto}>
                {selectPhoto?.map((photo, idx) => (
                  <img src={URL.createObjectURL(photo)} alt="" key={idx} />
                ))}
              </Box>
            </>
          }
        />
      </Box>

      <SendMessageInput
        sendMessage={sendMessage}
        formValue={formValue}
        setFormValue={setFormValue}
        setIsOpenSmilesHendler={setIsOpenSmilesHendler}
        setIsOpenAtachFileHendler={setIsOpenAtachFileHendler}
      />
    </>
  );
};
export default ChatRoom;
