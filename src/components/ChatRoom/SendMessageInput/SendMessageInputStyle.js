import { makeStyles } from "@material-ui/core";

export default makeStyles({
  form: {
    // height: "10vh",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgb(24, 23, 23)",
    width: "100%",
    maxWidth: 728,
    display: "flex",
    fontSize: "1.5rem",

    "& button": {
      width: "20%",
      backgroundColor: "rgb(56, 56, 143)",
      border: "none",
      color: "white",
      padding: "15px 32px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      cursor: "pointer",
      fontSize: "1.25rem",
      "&:disabled": {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },
  },
  inputForSendMessage: {
    background: "rgb(58, 58, 58)",
    "& .MuiInput-root": {
      height: "100%",
    },
    width: "100%",
    "& input": {
      padding: 20,
      lineHeight: "1.5",
      fontSize: "1.5rem",
      background: "rgb(58, 58, 58)",
      color: "white",
      height: "100%",
      boxSizing: "border-box",
    },
  },

  smileButton: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    "& button": {
      display: "flex",
    },
  },
});
