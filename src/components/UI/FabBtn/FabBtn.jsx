import { Fab } from "@material-ui/core";
import { Add } from "@mui/icons-material";

const fabBtn = ({ onClick, icon = <Add /> }) => (
  <Fab
    aria-label="Add"
    color="primary"
    style={{ marginLeft: "auto" }}
    onClick={onClick}
    children={icon}
  />
);
export default fabBtn;
