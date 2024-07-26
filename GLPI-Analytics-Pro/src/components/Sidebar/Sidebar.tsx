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

export default function Sidebar() {
  return (
    <div className="flex flex-col p-6 w-60 m-0 text-gray-100 bg-gray-600 justify-between h-full">
      <nav className="flex flex-col gap-4">
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center gap-2">
            <PresentationChart size={16} />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-2">
            <Ticket size={16} />
            <span>Chamados</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendUp size={16} />
            <span>Estatísticas</span>
          </li>
          <li className="flex items-center gap-2">
            <ChartPie size={16} />
            <span>Análises</span>
          </li>
          <li className="flex items-center gap-2">
            <BellSimple size={16} />
            <span>Notificações</span>
          </li>
          <li className="flex items-center gap-2">
            <Question size={16} />
            <span>Ajuda</span>
          </li>
        </ul>
      </nav>
      <nav className="flex flex-col gap-4">
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center gap-2">
            <SignOut size={16} />
            <span>Logout</span>
          </li>
          <li className="flex items-center gap-2">
            <ToggleRight size={16} />
            <span>Light Mode</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
