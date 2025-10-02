import {
  Calculator,
  Database,
  Ellipsis,
  HelpCircleIcon,
  Home,
  LogOut,
  MonitorIcon,
  Settings,
  Tickets,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Profile } from "./Profile";

interface PropsSidebarHandler {
  disabled?: boolean;
}

export const Sidebar = ({ disabled }: PropsSidebarHandler) => {
  const location = useLocation();
  const pathname = location.pathname.split("/");

  return (
    <aside
      className={`flex flex-col justify-between border-r border-gray-300 bg-gray-50 p-2 transition-all duration-300 ease-in-out
      ${disabled ? "w-62 visible" : "invisible w-0 overflow-hidden px-0 py-0"}`}
    >
      <nav className="flex flex-1 flex-col pb-2 pt-2">
        <Breadcrumb className="pl-2">
          <BreadcrumbList>
            {pathname.length > 2 && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/home" className="capitalize">
                    {pathname.at(-2)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbLink href={location.pathname} className="capitalize">
                {pathname.at(-1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex h-full flex-col justify-between">
          <div>
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
              title="Tela para busca/filtragem de chamados."
              to="/home/tickets"
            >
              <Tickets className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
              Chamados
            </Link>
            <Link
              className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
              title="Tela de monitoramento das operações | Em tempo real."
              to="/home/monitoring"
            >
              <MonitorIcon className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
              Monitoramento
            </Link>
            <Link
              className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
              title="Dashboard para análise a curto prazo das operações."
              to="/home/analytics"
            >
              <Database className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
              Análises
            </Link>
            <Link
              className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
              title="Dashboard para relatório de estatísticas sobre a operação."
              to="/home/statistics"
            >
              <Calculator className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
              Estatísticas
            </Link>
          </div>
          <div>
            <Link
              className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
              title="Detalhes"
              to="/home"
            >
              <Ellipsis className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-pulse group-hover:text-orange-500" />
              Mais
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-4">
        <Separator />
        <Profile />
        <nav className="rounded-md bg-white">
          <Link
            className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
            title="Precisa de ajuda? Aperta aqui."
            to="/home/help"
          >
            <HelpCircleIcon className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
            Ajuda
          </Link>
          <Separator />
          <Link
            className="group flex items-center gap-2 rounded border border-transparent p-2 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
            title="Tela para modificar configurações do sistema."
            to="/home/settings"
          >
            <Settings className="h-5 w-5 text-gray-500 transition duration-300 ease-in-out group-hover:animate-bounce group-hover:text-orange-500" />
            Configurações
          </Link>
          <Separator />
          <Button
            type="button"
            className="group flex w-full gap-2 rounded border border-transparent bg-white p-2 text-gray-500 transition duration-300 ease-in-out hover:border-orange-400 hover:bg-white"
          >
            <LogOut className="h-5 w-5 text-gray-700 transition duration-300 ease-in-out group-hover:text-orange-500" />
            Sair
          </Button>
        </nav>
      </div>
    </aside>
  );
};
