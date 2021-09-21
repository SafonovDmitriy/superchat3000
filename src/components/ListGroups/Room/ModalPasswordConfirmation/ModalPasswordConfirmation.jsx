import { Box, Button, Modal, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
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
        <h1>{`Введите пароль от ${room.name} комнаты`}</h1>
        <form onSubmit={moveToRoom}>
          <TextField
            placeholder="Вот прям сюда"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="password"
          />
          <Button
            color="secondary"
            type="submit"
            disabled={chance === 0}
            children={"Ну погнали"}
          />
        </form>

        {chance < 3 && chance !== 0 && (
          <Box>{`Пароль не верный,у вас осталось ${chance} попыток`} </Box>
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
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      end();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return <p style={{ color: "black" }}>{`Ну теперь жди ${timer} сек`}</p>;
};
