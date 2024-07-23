import {
  BellSimple,
  ChartPie,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  TrendUp,
} from "phosphor-react";
import style from "./style.module.css";

export default function Sidebar() {
  return (
    <div className={style.wrapper}>
      {/* <div className={style.titleSidebar}>Menu</div> */}
      <div className={style.optionsSidebar}>
        <div>
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
          <div>Light Mode</div>
        </div>
      </div>
    </div>
  );
}
