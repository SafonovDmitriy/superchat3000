import { makeStyles } from "@material-ui/core";

export default makeStyles({
  massagesList: {
    height: "83vh",
    // padding: "0 10px",
    // minHeight: "80vh",
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
  dropFileZone: {
    width: "100%",
    minHeight: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "$scale 0.8s ease-out",
    animationIterationCount: "infinite",
    "& p": {
      userSelect: "none",
      border: "solid black 1px",
      borderRadius: 10,
      animation: "$pulsate 0.8s ease-out",
      animationIterationCount: "infinite",
      color: "red",
    },
  },
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
  "@keyframes pulsate": {
    "0%": {
      padding: 8,
      color: "red",
    },
    "25%": {
      color: "##29dc13",
    },
    "50%": {
      padding: 10,
      color: "#d2c423",
    },
    "100%": {
      padding: 8,
    },
  },
  "@keyframes scale": {
    "0%": {
      transform: "scale(1)",
    },
    "20%": {
      transform: "scale(1.05)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "80%": {
      transform: "scale(1.05)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
});
