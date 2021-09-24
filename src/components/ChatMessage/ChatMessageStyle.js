import { makeStyles } from "@material-ui/core";

export default makeStyles({
  message: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    "& .body": {
      "& h5": { margin: 0 },
      padding: 10,
      width: "45%",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",

      "& svg": {
        fontSize: 10,
      },
    },
  },
  sent: {
    flexDirection: "row-reverse",
    "& .body": {
      color: "white",
      background: "#0860a0",
      alignSelf: "flex-end",
      borderRadius: "25px 0 25px 25px",
    },
  },
  received: {
    "& .body": {
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
  galleryPhoto: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    padding: "0 !important",
    width: "100% !important",
    "& img": {
      height: 50,
      "&:hover": {
        transition: "all 2s",
        transform: "scale(2)",
      },
    },
  },
});
