import { Button } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSelect, SignOut } from "..";
import { ROOMS_PAGE } from "../../utils/rootPath";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <LanguageSelect />
      {!pathname.indexOf(`${ROOMS_PAGE}/`) ? (
        <Link to={ROOMS_PAGE}>
          <Button color="secondary">Go to List</Button>
        </Link>
      ) : null}

      <SignOut />
    </header>
  );
};

export default Header;
