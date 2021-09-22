import { makeStyles } from "@material-ui/core";

export default makeStyles({
  listGroups: {
    paddingTop: 100,
  },
  controleList: {
    display: "flex",
    justifyContent: "space-around",
    userSelect: "none",
    color: "white",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 20,
  },
});
