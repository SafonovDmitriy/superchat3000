import { makeStyles } from "@material-ui/core";

export default makeStyles({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(2px)",
  },
  modal_content: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 50,
    borderRadius: 10,
    boxShadow: "2px 2px 4px 0 red",
  },
});
