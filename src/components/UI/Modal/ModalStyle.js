import { makeStyles } from "@material-ui/core";

export default makeStyles({
  modal: {
    animation: `$show 500ms `,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 1s",
  },
  modalWindow: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
  },

  "@keyframes show": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});
