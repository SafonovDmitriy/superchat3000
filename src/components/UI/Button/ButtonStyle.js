import { makeStyles } from "@material-ui/core";

export default makeStyles({
  btn: {
    maxHeight: 50,
    "& .MuiButton-label": {
      color: "white",
      padding: "3px 8px",
    },
    backgroundColor: "#448aff",
    textAlign: "center",
    letterSpacing: ".5px",
    boxShadow:
      "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%)",
    borderRadius: 0,

    "&:hover": {
      backgroundColor: "#448aff",
      boxShadow:
        "0 3px 3px 0 rgb(0 0 0 / 14%), 0 1px 7px 0 rgb(0 0 0 / 12%), 0 3px 1px -1px rgb(0 0 0 / 20%)",
    },
    "&:disabled": {
      backgroundColor: "grey",
    },
  },
});
