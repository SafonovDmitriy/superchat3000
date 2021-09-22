import { Button } from "@material-ui/core";
import { auth, firebase } from "../../firebase";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  console.log("asd");
  return (
    <Button color="secondary" className="sign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
}
export default SignIn;
