import { Box, Button, Modal, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ROOMS_PAGE } from "../../../../utils/rootPath";
import useStyles from "./ModalPasswordConfirmationStyle";

const ModalPasswordConfirmation = ({
  isOpenModal,
  setIsOpenModalHendler,
  room,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [value, onChange] = useState("");
  const [chance, setChance] = useState(3);

  const moveToRoom = (e) => {
    e.preventDefault();
    if (value.trim().length) {
      if (value === room.password) {
        history.push(`${ROOMS_PAGE}/${room.id}`);
      }
      setChance(chance - 1);
    }
  };

  return (
    <Modal
      open={isOpenModal}
      onClose={setIsOpenModalHendler}
      className={classes.modal}
    >
      <Box className={classes.modal_content}>
        <h1>{`${t("enter_the_password_from")} ${room.name} ${t("rooms")}`}</h1>
        <form onSubmit={moveToRoom}>
          <TextField
            placeholder={t("right_here")}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="password"
          />
          <Button
            color="secondary"
            type="submit"
            disabled={chance === 0}
            children={t("done")}
          />
        </form>

        {chance < 3 && chance !== 0 && (
          <Box>
            {`${t("the_password_is_wrong_you_still_have")} ${chance} ${t(
              "chances"
            )}`}
          </Box>
        )}
        {chance === 0 && (
          <StartTimer
            time={100}
            end={() => {
              setChance(3);
            }}
          />
        )}
      </Box>
    </Modal>
  );
};
export default ModalPasswordConfirmation;

const StartTimer = ({ time, end }) => {
  const [timer, setTimer] = useState(time);
  const { t } = useTranslation();
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      end();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <p style={{ color: "black" }}>{`${t("now_wait")} ${timer} ${t(
      "seconds"
    )}`}</p>
  );
};
