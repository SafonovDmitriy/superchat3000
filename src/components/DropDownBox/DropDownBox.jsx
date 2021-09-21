import { Box } from "@mui/system";
import clsx from "clsx";
import useStyles from "./DropDownBoxStyle";
export const DropDownBoxNull = ({ flag, chieldren }) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(classes.createGroup, flag !== null ? classes.open : "")}
    >
      {flag !== null && <Box className={classes.fields}>{chieldren}</Box>}
    </Box>
  );
};
const DropDownBox = ({ flag, chieldren }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.createGroup, flag ? classes.open : "")}>
      {flag !== null && <Box className={classes.fields}>{chieldren}</Box>}
    </Box>
  );
};
export default DropDownBox;
