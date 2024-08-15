import {
  Clock,
  CheckCircle,
  ShieldCheck,
  Hourglass,
  UserCirclePlus,
} from 'phosphor-react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Card } from '../../components/Card/Card'
import { CardGraph } from '../../components/CardGraph/CardGraph'
import { CardPie } from '../../components/CardPie/CardPie'
import { useState } from 'react'

// import { SettingsTabs } from '../../components/SettingsTabs'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleSidebar = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <div className="flex flex-col h-screen grid-cols-app">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
          <main className="flex flex-1 flex-col px-4 pb-12 pt-14 bg-gray-200">
            {/* <h1 className=" text-3xl mb-6 font-medium text-zinc-700">
              Dashboard
            </h1> */}

            <section className="mb-4">
              {/* grid-cols-profile grid items-center gap-3 */}
              <div className="grid md:grid-cols-5 grid-cols-card gap-4 border-b border-zinc-4 00 pb-5">
                <Card
                  icon={Clock}
                  quantity={12}
                  title="Chamados Abertos"
                  className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
                />
                <Card
                  icon={UserCirclePlus}
                  quantity={2}
                  title="Chamados Atribuídos"
                  className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2 border border-blue-500"
                />
                <Card
                  icon={Hourglass}
                  quantity={10}
                  title="Chamados Pendentes"
                  className="h-10 w-10 bg-orange-100 text-orange-500 rounded-md p-2 border border-orange-500"
                />
                <Card
                  icon={CheckCircle}
                  quantity={25}
                  title="Chamados Solucionados"
                  className="h-10 w-10 bg-green-200 text-green-600 rounded-md p-2 border border-green-500"
                />
                <Card
                  icon={ShieldCheck}
                  quantity={2500}
                  title="Chamados Fechados"
                  className="h-10 w-10 bg-green-700 text-green-100 rounded-md p-2 border border-green-500"
                />
              </div>
            </section>

            {/* <SettingsTabs /> */}

            {/* className="grid md:grid-cols-4 grid-cols-card gap-4" */}
            {/* gap-7 grid flex-row flex-grow md:grid-cols-1 grid-cols-card */}
            <section className="grid-cols-3 gap-4 grid">
              <CardGraph title="Chamados por Mês" />
              <CardPie title="Chamados por Urgência" />
              <CardGraph title="Chamados por Mês" />
              <CardPie title="Chamados por Urgência" />
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
