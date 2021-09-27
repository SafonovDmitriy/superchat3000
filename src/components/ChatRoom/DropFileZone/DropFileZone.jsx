import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import useStyles from "./DropFileZoneStyle";
export default function DropFileZone({ setSelectPhoto }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const onDrop = useCallback(
    (acceptedFiles) => {
      const _photoList = [];
      acceptedFiles.forEach((file) => {
        const type = file.type.slice(0, file.type.indexOf("/"));
        if (type === "image") {
          _photoList.push(file);
        }
      });

      setSelectPhoto(_photoList);
    },
    [setSelectPhoto]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Box {...getRootProps()} className={classes.dropFileZone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{t("drop_the_files_here")}</p>
      ) : (
        <p>{t("dragn_drop_some_files_here_or_click_to_select_files")}</p>
      )}
    </Box>
  );
}
