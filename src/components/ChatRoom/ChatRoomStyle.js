import { makeStyles } from "@material-ui/core";

export default makeStyles({
  selectImage: {
    position: "relative",
    padding: 10,
    "& span": {
      display: "flex",
      top: 0,
      right: -5,
      height: 10,
      position: "absolute",
      background: "white",
      borderRadius: 25,
      "& svg": {
        fontSize: 10,
      },
    },
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
  dropFileZoneWrapper: {
    padding: "0 !important",
    width: "100%",
  },
});
