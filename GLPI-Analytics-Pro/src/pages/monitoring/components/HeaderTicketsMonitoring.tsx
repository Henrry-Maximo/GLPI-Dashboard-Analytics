import { useEffect, useState } from "react";
import { NavItem } from "../../../components/Header/NavItem/NavItem";
import dayjs from "dayjs";
import { ArrowCircleLeft } from "phosphor-react";

export function HeaderTicketsMonitoring() {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="flex flex-row items-center gap-4 justify-between bg-orange-500 p-4 text-slate-100">
      <div className="mr-24">
        <NavItem icon={ArrowCircleLeft} route="/main/home" />
      </div>

      <h2 className="text-4xl font-medium">GLPI: MONITORAMENTO CHAMADOS</h2>

      <p className="flex flex-col items-end">
        <span className="text-base font-bold">
          {currentTime.format("DD/MM/YYYY")}
        </span>
        <span className="text-3xl font-semibold tabular-nums">
          {currentTime.format("HH:mm:ss")}
        </span>
      </p>
    </header>
  );
}
