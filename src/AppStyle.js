import { makeStyles } from "@material-ui/core";

export default makeStyles({
  app: {
    textAlign: "center",
    maxWidth: 728,
    margin: "0 auto",
    "& header": {
      backgroundColor: "#181717",
      height: "10vh",
      minHeight: 50,
      color: "white",
      position: "fixed",
      width: "100%",
      maxWidth: 728,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 99,
      padding: 10,
      boxSizing: "border-box",
    },
    section: {
      padding: "95px 0",
      boxSizing: "border-box",
      height: "100vh",
      backgroundColor: "rgb(40, 37, 53)",
    },
  },
});
