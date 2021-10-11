import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useIntercom } from "react-use-intercom";
import useStyles from "./AppStyle";
import { Header, Root, SignIn } from "./components";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  const classes = useStyles();
  const { boot, shutdown, hide, show, update } = useIntercom();
  // useEffect(() => {
  //   boot();
  // }, []);
  return (
    <Box className={classes.app}>
      <Header />

      <section className={classes.section}>
        {user ? <Root /> : <SignIn />}
      </section>
      {/* <button onClick={show}>Boot intercom! ☎️</button> */}
    </Box>
  );
}

export default App;
