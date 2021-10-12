import { Box } from "@material-ui/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useStyles from "./AppStyle";
import { Header, Intercom, Root, SignIn } from "./components";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <Header />
      <section className={classes.section}>
        {user ? <Root /> : <SignIn />}
      </section>
      <Intercom />
    </Box>
  );
}

export default App;
