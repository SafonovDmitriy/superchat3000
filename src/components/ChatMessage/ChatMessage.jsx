import { Menu, MenuItem } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import clsx from "clsx";
import { auth } from "../../firebase";
import useStyles from "./ChatMessageStyle";

const ChatMessage = ({
  message,
  openContextMenu,
  allImages,
  anchorEl,
  open,
  handleClose,
  canselSelectMsg,
  popupMenu,
}) => {
  const classes = useStyles();
  const { text, uid, photoURL, isChanged, displayName } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

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
