import { makeStyles } from "@material-ui/core";

export default makeStyles({
  message: {
    display: "flex",
    alignItems: "center",
  },
  sent: {
    flexDirection: "row-reverse",
    "& p": {
      color: "white",
      background: "#0b93f6",
      alignSelf: "flex-end",
    },
  },
  received: {
    "& p": {
      background: "#e5e5ea",
      color: "black",
    },
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    margin: "2px 5px",
  },
});
