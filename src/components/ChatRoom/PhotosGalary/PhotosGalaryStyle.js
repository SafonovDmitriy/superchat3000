import { makeStyles } from "@material-ui/core";

export default makeStyles({
  galleryPhoto: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    overflowY: "scroll",
    margin: "-50px 0",
    "& img": {
      height: 50,
    },
  },
});
