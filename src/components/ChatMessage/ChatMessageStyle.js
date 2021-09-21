import { makeStyles } from "@material-ui/core";

export default makeStyles({
  message: {
    display: "flex",
    alignItems: "center",
    "& p": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      "& svg": {
        fontSize: 10,
      },
    },
  },
  sent: {
    flexDirection: "row-reverse",
    "& p": {
      color: "white",
      background: "#0b93f6",
      alignSelf: "flex-end",
      borderRadius: "25px 0 25px 25px",
    },
  },
  received: {
    "& p": {
      background: "#e5e5ea",
      color: "black",
      borderRadius: "0px 25px 25px 25px",
    },
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    margin: "2px 5px",
  },
});
