import {
  BellSimple,
  ChartPie,
  Gear,
  Heartbeat,
  // MagnifyingGlass,
  PresentationChart,
  Question,
  SignOut,
  Ticket,
  TrendUp,
} from 'phosphor-react'
import { NavItem } from './NavItem/NavItem'
// import * as Input from '../Input/Input'
import { Profile } from './MainProfile'
import { MainProps } from '../Header/Header'
import { Switch } from '@headlessui/react'

export default function Sidebar({ menuOpen }: MainProps) {
  // const [enabled, setEnabled] = useState(true)

  return (
    <aside
      className={`${menuOpen ? 'w-64 px-5 py-8' : 'w-0 opacity-0'} flex flex-col bg-gray-50 border-r border-gray-300 transition-all duration-200 ease-in-out`}
    >
      {/* <Input.Root>
        <Input.Prefix>
          <MagnifyingGlass />
        </Input.Prefix>
        <Input.Control placeholder="Search" />
      </Input.Root> */}

      <nav className="space-y-0.5">
        <NavItem icon={PresentationChart} title="Dashboard" link="/home" />
        <NavItem icon={Heartbeat} title="Monitoramento" link="/monitoring" />
        <NavItem icon={Ticket} title="Chamados" link="/tickets" />
        <NavItem icon={TrendUp} title="Estatísticas" link="/statistics" />
        <NavItem icon={ChartPie} title="Análises" link="/analytics" />
        <NavItem icon={BellSimple} title="Notificações" link="/notification" />
        <NavItem icon={Question} title="Ajuda" link="/help" />
      </nav>

      <div className="mt-auto">
        <nav className="space-y-0.5">
          <NavItem icon={Gear} title="Configuração" link="" />
          <NavItem icon={SignOut} title="Sair" link="/login" />
          {/* <NavItem icon={ToggleLeft} title="Modo claro" link="" /> */}
          <div className="group flex items-center gap-2 p-2 rounded hover:bg-white border border-transparent hover:border-orange-400 transition duration-300 ease-in-out">
            <Switch className="group relative flex h-5 w-12 cursor-pointer rounded-full bg-white border border-gray-300 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10">
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-3 translate-x-0 rounded-full bg-gray-600 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
              ></span>
            </Switch>
            <span>Modo Escuro/Claro</span>
          </div>
        </nav>

        <Profile />
      </div>
    </aside>
  )
}
