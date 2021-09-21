import { makeStyles } from "@material-ui/core";

export default makeStyles({
  createGroup: {
    height: 0,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    transition: "all 1s",
    transitionDelay: "0.2s",
    border: "solid 0px",
    borderRadius: 10,
    boxSizing: "border-box",
    "& form": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: 10,
    },
  },
  open: {
    padding: 20,
    height: 150,
    border: "solid 1px",
  },
  fields: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    "& input": {
      color: "white",
    },
  },
});
