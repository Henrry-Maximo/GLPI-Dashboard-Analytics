import { Switch } from "@headlessui/react";
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

import type { MainProps } from "../Header/Header";
// import * as Input from '../Input/Input'
import { Profile } from "./MainProfile";
import { NavItem } from "./NavItem/NavItem";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ menuOpen }: MainProps) {
  // const [enabled, setEnabled] = useState(true)

  function handleLogout() {
    const navigate = useNavigate();

    // Remove o token do sessionStorage
    sessionStorage.removeItem("jwt");

    // Redireciona o usuário para a página de login
    navigate("/login");
  }

  return (
    <aside
      className={`${
        menuOpen ? "w-64 px-5 py-8" : "w-0 opacity-0"
      } flex flex-col bg-gray-50 border-r border-gray-300 transition-all duration-200 ease-in-out`}
    >
      {/* <Input.Root>
        <Input.Prefix>
          <MagnifyingGlass />
        </Input.Prefix>
        <Input.Control placeholder="Search" />
      </Input.Root> */}

      <nav className="space-y-0.5">
        <NavItem icon={PresentationChart} title="Dashboard" link="/main/home" />
        <NavItem icon={Heartbeat} title="Monitoramento" link="/monitoring" />
        <NavItem icon={Ticket} title="Chamados" link="/main/tickets" />
        <NavItem icon={TrendUp} title="Estatísticas" link="/main/statistics" />
        <NavItem icon={ChartPie} title="Análises" link="/main/analytics" />
        <NavItem
          icon={BellSimple}
          title="Notificações"
          link="/main/notification"
        />
        <NavItem icon={Question} title="Ajuda" link="/main/help" />
      </nav>

      <div className="mt-auto">
        <nav className="space-y-0.5">
          <NavItem icon={Gear} title="Configuração" link="/main/system" />

          <NavItem
            icon={SignOut}
            title="Sair"
            link="/login"
            onClick={handleLogout}
          />

          <div className="group flex items-center gap-2 p-2 rounded hover:bg-white border border-transparent hover:border-orange-400 transition duration-300 ease-in-out">
            <Switch className="group relative flex h-5 w-12 cursor-pointer rounded-full bg-white border border-gray-300 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10">
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-3 translate-x-0 rounded-full bg-gray-300 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
              />
            </Switch>
            <span className="text-gray-300">Modo Escuro/Claro</span>
          </div>
        </nav>

        <Profile />
      </div>
    </aside>
  );
}
