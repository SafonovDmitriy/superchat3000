import { Box } from "@material-ui/core";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import {
  DropDownBox,
  DropFileZone,
  MessageList,
  PhotosGalary,
  SendMessageInput,
} from "..";
import useStyles from "./ChatRoomStyle";

const ChatRoom = ({
  canselAllEvent,
  messages,
  selectMsg,
  selectMessage,
  editMessage,
  messagesRef,
  dummy,
  isOpenUpdateMessage,
  changeMessageForm,
  isOpenSmiles,
  onEmojiClick,
  isOpenAttachFile,
  selectPhoto,
  deleteOneSelectImg,
  sendMessage,
  formValue,
  setFormValue,
  setIsOpenSmilesHendler,
  setIsOpenAtachFileHendler,
  setSelectPhoto,
}) => {
  const classes = useStyles();

  return (
    <>
      <MessageList
        canselAllEvent={canselAllEvent}
        messages={messages}
        selectMsg={selectMsg}
        selectMessage={selectMessage}
        editMessage={editMessage}
        messagesRef={messagesRef}
        dummy={dummy}
      />

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
              <DropFileZone setSelectPhoto={setSelectPhoto} />
              <PhotosGalary
                selectPhoto={selectPhoto}
                deleteOneSelectImg={deleteOneSelectImg}
              />
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
        editMessage={editMessage}
        messages={messages}
        selectPhoto={selectPhoto}
      />
    </>
  );
};
export default ChatRoom;
