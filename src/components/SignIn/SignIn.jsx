import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { auth, firebase } from "../../firebase";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const { t } = useTranslation();
  return (
    <Button color="secondary" className="sign-in" onClick={signInWithGoogle}>
      {t("sign_in_with_google")}
    </Button>
  );
}
export default SignIn;
