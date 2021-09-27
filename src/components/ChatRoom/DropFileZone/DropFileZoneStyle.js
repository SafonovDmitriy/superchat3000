import { makeStyles } from "@material-ui/core";

export default makeStyles({
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
