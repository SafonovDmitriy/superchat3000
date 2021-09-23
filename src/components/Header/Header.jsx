import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { LanguageSelect, SignOut } from "..";
import { ROOMS_PAGE } from "../../utils/rootPath";

const Header = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <header>
      <LanguageSelect />
      {!pathname.indexOf(`${ROOMS_PAGE}/`) ? (
        <Link to={ROOMS_PAGE}>
          <Button color="secondary">{t("return_to_room_list")}</Button>
        </Link>
      ) : null}

      <SignOut />
    </header>
  );
};

export default Header;
