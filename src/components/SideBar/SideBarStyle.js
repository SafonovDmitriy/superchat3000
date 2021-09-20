import { makeStyles } from "@material-ui/core";

export default makeStyles({
  sidebar: {
    backgroundColor: "#7b757a52",
    height: "100%",
    transition: "all 1s",
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
  },
  open: {
    width: 180,
  },
  close: {
    width: 60,
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  logo: {
    width: 25,
  },
});
