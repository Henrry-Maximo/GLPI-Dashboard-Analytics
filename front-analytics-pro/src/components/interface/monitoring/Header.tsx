import { CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const HeaderMonitoring = () => {
  const currentDate = new Date();

  return (
    <header className="flex flex-row items-center justify-between gap-4 bg-orange-500 p-4 text-slate-100">
      <Link
        to={"/home"}
        className="group flex items-center gap-2 rounded border border-white bg-slate-100 p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
      >
        <CircleArrowLeft className="h-5 w-5 text-gray-700 transition duration-300 ease-in-out group-hover:text-orange-500" />
      </Link>

      <h2 className="text-4xl font-medium">GLPI: MONITORAMENTO CHAMADOS</h2>

      <p className="flex flex-col items-end">
        <span className="text-base font-bold">
          {currentDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="text-3xl font-semibold tabular-nums">
          {/* {`${hours}:${minutes}:${seconds}`} */}
        </span>
      </p>
    </header>
  );
};
