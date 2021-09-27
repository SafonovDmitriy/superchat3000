import { Box } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import clsx from "clsx";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import { ChatMessage, DropDownBox, SendMessageInput } from "..";
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
  getRootProps,
  getInputProps,
  isDragActive,
  deleteOneSelectImg,
  sendMessage,
  formValue,
  setFormValue,
  setIsOpenSmilesHendler,
  setIsOpenAtachFileHendler,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
                  <p>{t("drop_the_files_here")}</p>
                ) : (
                  <p>
                    {t("dragn_drop_some_files_here_or_click_to_select_files")}
                  </p>
                )}
              </Box>
              <Box className={classes.galleryPhoto}>
                {selectPhoto?.map((photo, idx) => (
                  <Box key={photo.lastModified} className={classes.selectImage}>
                    <span onClick={() => deleteOneSelectImg(idx)}>
                      <Close />
                    </span>
                    <img src={URL.createObjectURL(photo)} alt="" />
                  </Box>
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
        editMessage={editMessage}
        messages={messages}
        selectPhoto={selectPhoto}
      />
    </>
  );
};
export default ChatRoom;
