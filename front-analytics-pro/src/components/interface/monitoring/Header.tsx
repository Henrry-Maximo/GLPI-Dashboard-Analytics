import { Link } from "react-router-dom";

export const HeaderMonitoring = () => {
  return (
    <header className="flex flex-row items-center justify-between gap-4 bg-orange-500 p-4 text-slate-100">
      <div className="mr-24">
        <Link to={"/main/home"} />
      </div>

      <h2 className="text-4xl font-medium">GLPI: MONITORAMENTO CHAMADOS</h2>

      <p className="flex flex-col items-end">
        <span className="text-base font-bold">
          10/11/2023
          {/* {currentTime.format("DD/MM/YYYY")} */}
        </span>
        <span className="text-3xl font-semibold tabular-nums">
          10/11/2023
          {/* {currentTime.format("HH:mm:ss")} */}
        </span>
      </p>
    </header>
  );
};
// Painel de Gestão Técnica &copy; GLPI - {new Date().getFullYear()}
