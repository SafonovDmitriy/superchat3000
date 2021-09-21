import { Button } from "@material-ui/core";
import { auth } from "../../firebase";

const SignOut = () =>
  auth.currentUser && (
    <Button
      color="secondary"
      className="sign-out"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  );

export default SignOut;
