import { makeStyles } from "@material-ui/core";

export default makeStyles({
  massagesList: {
    height: "83vh",
    overflowY: "scroll",
    display: "flex",
    gap: 10,
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
});
