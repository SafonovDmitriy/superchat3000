import { MenuItem, Select } from "@material-ui/core";
import i18next from "i18next";
import React from "react";
import { LANGUAGE_LOCAL_STORAGE } from "../../utils/constants";
import useStyles from "./LanguageSelectStyle";
export default function LanguageSelect() {
  const classes = useStyles();
  const handleChange = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const languageMap = [
    { label: "English", dir: "ltr", value: "en-US" },
    { label: "Русский", dir: "ltr", value: "ru" },
  ];
  const selectLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE);

  return (
    <Select
      label="Language"
      onChange={handleChange}
      value={selectLanguage}
      className={classes.select}
    >
      {languageMap.map((item, idx) => (
        <MenuItem key={idx} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}
