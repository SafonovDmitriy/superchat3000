import { makeStyles } from "@material-ui/core";

export default makeStyles({
  massagesList: {
    height: "83vh",
    // padding: "0 10px",
    // minHeight: "80vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      width: "0.25rem",
    },
    "&::-webkit-scrollbar-track": {
      background: "#1e1e24",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#6649b8",
    },
  },

  selectMsg: {
    backgroundColor: "#4c4a4a24",
  },

  changeMessageForm: {
    paddingBottom: 65,
  },
  smilesBox: {
    display: "flex",
    justifyContent: "end",
    position: "absolute",
    bottom: 80,
    right: 20,
    border: "none !important",
    padding: "0 !important",
    "& .makeStyles-fields-18 input": {
      color: "black",
    },
  },
});
