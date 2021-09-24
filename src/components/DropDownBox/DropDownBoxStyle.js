import { makeStyles } from "@material-ui/core";

export default makeStyles({
  createGroup: {
    height: 0,
    justifyContent: "center",
    overflow: "hidden",
    transition: "height 1s",
    border: "solid 0px",
    borderRadius: 10,
    boxSizing: "border-box",
    "& form": {
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "center",
      flexDirection: "column",
      gap: 10,
    },
  },
  open: {
    display: "block",
    padding: 20,
    border: "solid 1px",
  },
  fields: {
    height: "100%",
    "& input": {
      color: "white",
    },
  },
});
