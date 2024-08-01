import {
  BellSimple,
  ChartPie,
  Gear,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  ToggleLeft,
  TrendUp,
} from "phosphor-react";
import { NavItem } from "./NavItem/NavItem";
import { Search } from "./Search/Search";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-300 px-5 py-8 bg-zinc-100">
      <Search />

      <nav className="space-y-0.5">
        <NavItem icon={PresentationChart} title="Dashboard" />
        <NavItem icon={Ticket} title="Chamados" />
        <NavItem icon={TrendUp} title="Estatísticas" />
        <NavItem icon={ChartPie} title="Análises" />
        <NavItem icon={BellSimple} title="Notificações" />
        <NavItem icon={Question} title="Ajuda" />
      </nav>

      <div className="mt-auto">
        <nav className="space-y-0.5">
          <NavItem icon={Gear} title="Configuração" />
          <NavItem icon={SignOut} title="Sair" />
          <NavItem icon={ToggleLeft} title="Modo claro" />
        </nav>
      </div>
    </aside>
  );
}
