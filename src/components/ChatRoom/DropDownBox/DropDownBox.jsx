import { Box } from "@mui/system";
import clsx from "clsx";
import useStyles from "./DropDownBoxStyle";

export const DropDownBoxNull = ({ flag, chieldren, height = 150 }) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(classes.createGroup, flag !== null ? classes.open : "")}
      style={{
        height: flag !== null ? height : null,
      }}
    >
      {flag !== null && <Box className={classes.fields}>{chieldren}</Box>}
    </Box>
  );
};
const DropDownBox = ({ flag, chieldren, height = 150, className = null }) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(className, classes.createGroup, flag ? classes.open : "")}
      style={{
        height: flag ? height : null,
      }}
    >
      {flag !== null && <Box className={classes.fields}>{chieldren}</Box>}
    </Box>
  );
};
export default DropDownBox;
