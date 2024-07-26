import {
  BellSimple,
  ChartPie,
  Gear,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  ToggleRight,
  TrendUp,
} from "phosphor-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-6 w-60 m-0 text-orange-500 bg-gray-600 justify-between h-full border-r border-solid border-orange-500">
      <nav className="flex flex-col gap-4">
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <PresentationChart size={16} />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <Ticket size={16} />
            <span>Chamados</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <TrendUp size={16} />
            <span>Estatísticas</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <ChartPie size={16} />
            <span>Análises</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <BellSimple size={16} />
            <span>Notificações</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <Question size={16} />
            <span>Ajuda</span>
          </li>
        </ul>
      </nav>
      <nav className="flex flex-col gap-4">
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <Gear size={16} />
            <span>Logout</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded">
            <SignOut size={16} />
            <span>Logout</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-100 p-1 rounded enabled:hover:bg-sky-500">
            <ToggleRight size={16} />
            <span>Light Mode</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
