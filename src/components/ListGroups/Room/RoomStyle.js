import { makeStyles } from "@material-ui/core";

export default makeStyles({
  room: {
    border: "solid 1px",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: "0 15px",
    alignItems: "center",
    borderRadius: 10,
    userSelect: "none",
    "&:hover": {
      backgroundColor: "rgb(63 59 78)",
    },
  },
  controleRooms: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    "& button": {
      "&:hover": {
        color: "white",
      },
    },
  },
});
