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
import { Separator } from "../ui/separator";
import { Profile } from "./profile";

export const Sidebar = (className: any) => {
  return (
    <aside
      className={`flex flex-col justify-between border-r border-gray-300 bg-gray-50 p-2 transition-all duration-300 ease-in-out ${className}`}
    >
      <nav className=" space-y-0.5">
        <Link
          className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Home"
          to="/home"
        >
          <Home className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
          Home
        </Link>
        <Link
          className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Tickets"
          to="/home/tickets"
        >
          <Tickets className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
          Chamados
        </Link>
        <Link
          className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Monitoring"
          to="/home/monitoring"
        >
          <MonitorIcon className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
          Monitoramento
        </Link>
        <Link
          className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Analytics"
          to="/home/analytics"
        >
          <Database className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
          Análises
        </Link>
        <Link
          className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          title="Statistics"
          to="/home/statistics"
        >
          <Calculator className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
          Estatísticas
        </Link>
      </nav>

      <div className="flex flex-col gap-4">
        <Profile />
        <nav className="rounded-md bg-white">
          <Link
            className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
            title="Help"
            to="/home/help"
          >
            <HelpCircleIcon className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
            Ajuda
          </Link>
          <Separator />
          <Link
            className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
            title="Settings"
            to="/home/settings"
          >
            <Settings className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
            Configurações
          </Link>
        </nav>
      </div>
    </aside>
  );
};
