import { useNavigate } from "react-router-dom";

import { Profile } from "./Profile";

import {
  BellSimple,
  ChartPie,
  Gear,
  Heartbeat,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  TrendUp,
} from "phosphor-react";
import { NavigationMenuLink } from "./Link";

// remover token e voltar para login
function handleLogout() {
  const navigate = useNavigate();
  
  sessionStorage.removeItem("jwt"); 
  navigate("/login");
}

interface PropsSidebarHandler {
  disabled: boolean;
}

export const Sidebar = ({ disabled }: PropsSidebarHandler) => {
  return (
    <aside
      className={`${
        disabled ? "w-52 px-5 py-8" : "w-0 invisible"
      } flex flex-col bg-gray-50 border-r border-gray-300 transition-all duration-200 ease-in-out`}
    >
      <nav className="space-y-0.5">
        <NavigationMenuLink icon={PresentationChart} title="Dashboard" path="/main/home" />
        <NavigationMenuLink icon={Heartbeat} title="Monitoramento" path="/monitoring" />
        <NavigationMenuLink icon={Ticket} title="Chamados" path="/main/tickets" />
        <NavigationMenuLink icon={TrendUp} title="Estatísticas" path="/main/statistics" />
        <NavigationMenuLink icon={ChartPie} title="Análises" path="/main/analytics" />
        <NavigationMenuLink
          icon={BellSimple}
          title="Notificações"
          path="/main/notification"
        />
        <NavigationMenuLink icon={Question} title="Ajuda" path="/main/help" />
      </nav>

      <div className="mt-auto">
        <nav className="space-y-0.5">
          <NavigationMenuLink icon={Gear} title="Configuração" path="/main/system" />

          <NavigationMenuLink
            icon={SignOut}
            title="Sair"
            path="/login"
            clickNavigationLink={() => handleLogout()}
          />
        </nav>

        <Profile />
      </div>
    </aside>
  );
}
