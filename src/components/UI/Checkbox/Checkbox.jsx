import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import React from "react";
import useStyles from "./CheckboxStyle";
const CustomeCheckbox = ({ label, checked, onChange, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={classes.checkbox}>
      <FormControlLabel
        control={
          <Checkbox
            {...props}
            checked={checked}
            onChange={onChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            style={{
              color: `#54ab26`,
              "&.MuiChecked": {
                color: green[600],
              },
            }}
          />
        }
        label={`${label}`}
      />
    </Box>
  );
};
export default CustomeCheckbox;
