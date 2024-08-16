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

  const ticketData = {
    id: 5,
    entities_id: 1,
    name: 'Teste Wilka 4',
    date_creation: '2022-04-20T15:56:53.000Z',
    date_mod: '2023-01-26T19:56:43.000Z',
    solvedate: null,
    closedate: null,
    users_id_recipient: 2,
    status: 2,
    priority: 3,
    itilcategories_id: 0,
    type: 2,
    locations_id: 0,
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
              <CardGraph title="Chamados por Ano" />
              <CardPie title="Chamados por Ano" />
              <CardGraph title="Chamados por Mês" />
              <CardPie title="Chamados por Mês" />
              <CardGraph title="Chamados por Semana" />
              <CardPie title="Chamados por Semana" />
              <CardGraph title="Chamados por Dia" />
              <CardPie title="Chamados por Dia" />
            </section>

            <section className="mt-4">
              <div className="flex justify-center items-center bg-slate-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full ">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Ticket Details
                  </h2>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Name:</span>{' '}
                      {ticketData.name}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Status:</span>{' '}
                      {ticketData.status}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Priority:</span>{' '}
                      {ticketData.priority}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Type:</span>{' '}
                      {ticketData.type}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Date Created:</span>{' '}
                      {new Date(ticketData.date_creation).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Last Modified:</span>{' '}
                      {new Date(ticketData.date_mod).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">User ID Recipient:</span>{' '}
                      {ticketData.users_id_recipient}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
