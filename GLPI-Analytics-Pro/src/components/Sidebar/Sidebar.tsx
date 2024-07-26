import {
  BellSimple,
  ChartPie,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  ToggleRight,
  TrendUp,
} from "phosphor-react";
// import style from "./style.module.css";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-3 w-60 m-0 text-gray-100 bg-gray-600">
      <div className="flex flex-col flex-1 justify-between gap-4 m-4 p-1">
        <div className="flex flex-col gap-2">
          <div>
            <PresentationChart size={16} />
            Dashboard
          </div>
          <div>
            <Ticket size={16} />
            Chamados
          </div>
          <div>
            <TrendUp size={16} />
            Estatísticas
          </div>
          <div>
            <ChartPie size={16} />
            Análises
          </div>
          <div>
            <BellSimple size={16} />
            Notificações
          </div>
          <div>
            <Question size={16} />
            Ajuda
          </div>
        </div>
        <div>
          <div><SignOut size={16} />Logout</div>
          <div><ToggleRight size={16} />Light Mode</div>
        </div>
      </div>
    </div>
  );
}
