import {
  BellSimple,
  ChartPie,
  Gear,
  Heartbeat,
  MagnifyingGlass,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  ToggleLeft,
  TrendUp,
} from 'phosphor-react'
import { NavItem } from './NavItem/NavItem'
import * as Input from '../Input/Input'
import { Profile } from './MainProfile'
import { MainProps } from '../Header/Header'

export default function Sidebar({ menuOpen }: MainProps) {
  return (
    <aside
      className={` ${menuOpen ? 'w-64 px-5 py-8' : 'w-0 opacity-0'} flex flex-col gap-6 border-r border-zinc-300  overflow-hidden transition-all duration-200 ease-in-out `}
    >
      <Input.Root>
        <Input.Prefix>
          <MagnifyingGlass />
        </Input.Prefix>
        <Input.Control placeholder="Search" />
      </Input.Root>

      <nav className="space-y-0.5">
        <NavItem icon={PresentationChart} title="Dashboard" link="/home" />
        <NavItem icon={Heartbeat} title="Monitoramento" link="/monitoring" />
        <NavItem icon={Ticket} title="Chamados" link="" />
        <NavItem icon={TrendUp} title="Estatísticas" link="/statistics" />
        <NavItem icon={ChartPie} title="Análises" link="" />
        <NavItem icon={BellSimple} title="Notificações" link="" />
        <NavItem icon={Question} title="Ajuda" link="" />
      </nav>

      <div className="mt-auto">
        <nav className="space-y-0.5">
          <NavItem icon={Gear} title="Configuração" link="" />
          <NavItem icon={SignOut} title="Sair" link="/login" />
          <NavItem icon={ToggleLeft} title="Modo claro" link="" />
        </nav>

        <Profile />
      </div>
    </aside>
  )
}
