import { MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { LANGUAGE_LOCAL_STORAGE } from "../../utils/constants";
import useStyles from "./LanguageSelectStyle";
export default function LanguageSelect() {
  const classes = useStyles();
  const handleChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE, e.target.value);
  };

  const languageMap = [
    { label: "English", dir: "ltr", value: "en" },
    { label: "Русский", dir: "ltr", value: "ru" },
  ];
  const [selectLanguage, setLanguage] = useState(
    localStorage.getItem(LANGUAGE_LOCAL_STORAGE) || "en"
  );
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
