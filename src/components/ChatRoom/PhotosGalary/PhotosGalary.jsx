import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";
import useStyles from "./PhotosGalaryStyle";
export default function PhotosGalary({ selectPhoto, deleteOneSelectImg }) {
  const classes = useStyles();
  return (
    <Box className={classes.galleryPhoto}>
      {selectPhoto?.map((photo, idx) => (
        <Box key={photo.lastModified} className={classes.selectImage}>
          <span onClick={() => deleteOneSelectImg(idx)}>
            <Close />
          </span>
          <img src={URL.createObjectURL(photo)} alt="" />
        </Box>
      ))}
    </Box>
  );
}
