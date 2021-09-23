import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase";

const SignOut = () => {
  const { t } = useTranslation();
  return (
    auth.currentUser && (
      <Button
        color="secondary"
        className="sign-out"
        onClick={() => auth.signOut()}
        children={t("sign_out")}
      />
    )
  );
};

export default SignOut;
