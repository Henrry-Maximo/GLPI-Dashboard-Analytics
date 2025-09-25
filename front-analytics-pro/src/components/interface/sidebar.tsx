import {
  Calculator,
  Database,
  HelpCircleIcon,
  Home,
  MonitorIcon,
  Settings,
  Tickets,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col border-r border-gray-300 bg-gray-50 transition-all duration-300 ease-in-out">
      <nav className="space-y-0.5">
        <Link className="flex flex-row items-center" title="Home" to="/home">
          <Home size={18} />
          Home
        </Link>
        <Link
          className="flex flex-row items-center"
          title="Tickets"
          to="/home/tickets"
        >
          <Tickets size={18} />
          Chamados
        </Link>
        <Link
          className="flex flex-row items-center"
          title="Monitoring"
          to="/home/monitoring"
        >
          <MonitorIcon size={18} />
          Monitoramento
        </Link>
        <Link
          className="flex flex-row items-center"
          title="Analytics"
          to="/home/analytics"
        >
          <Database size={18} />
          Análises
        </Link>
        <Link
          className="flex flex-row items-center"
          title="Statistics"
          to="/home/statistics"
        >
          <Calculator size={18} />
          Estatísticas
        </Link>
        <Link
          className="flex flex-row items-center"
          title="Help"
          to="/home/help"
        >
          <HelpCircleIcon size={18} />
          Ajuda
        </Link>
        <Link
          className="flex flex-row items-center"
          title="Settings"
          to="/home/settings"
        >
          <Settings size={18} />
          Configurações
        </Link>
      </nav>
    </aside>
  );
};
