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
} from 'phosphor-react';

import type { MainProps } from '../Header/Header';
// import * as Input from '../Input/Input'
import { Profile } from './MainProfile';
import { NavItem } from './NavItem/NavItem';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ menuOpen }: MainProps) {
  // const [enabled, setEnabled] = useState(true)

  function handleLogout() {
    const navigate = useNavigate();

    // Remove o token do sessionStorage
    sessionStorage.removeItem('jwt');

    // Redireciona o usuário para a página de login
    navigate('/login');
  }

  return (
    <aside
      className={`${
        menuOpen ? 'w-52 px-5 py-8' : 'w-0 opacity-0'
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
        </nav>

        <Profile />
      </div>
    </aside>
  );
}
