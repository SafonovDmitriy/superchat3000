import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
export default StartTimer;
