import { Box } from "@material-ui/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useStyles from "./AppStyle";
import { Header, Root, SignIn } from "./components";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <Header />
      <section>{user ? <Root /> : <SignIn />}</section>
    </Box>
  );
}

export default App;
