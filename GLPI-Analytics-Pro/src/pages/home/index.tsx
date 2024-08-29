import {
  Clock,
  CheckCircle,
  ShieldCheck,
  Hourglass,
  UserCirclePlus,
} from 'phosphor-react'

import { Card } from '../../components/Card/Card'
import { CardGraph } from '../../components/CardGraph/CardGraph'
import { CardPie } from '../../components/CardPie/CardPie'

// import { SettingsTabs } from '../../components/SettingsTabs'

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col px-4 pb-12 pt-14 bg-gray-200 justify-center">
        <div className="flex flex-row justify-between rounded-md bg-white mb-4 items-center py-2 px-2 shadow-sm">
          <h1 className="text-2xl font-light text-zinc-800">
            Dashboard Principal
          </h1>
          <span className="text-2 font-light text-zinc-800">
            Olá, Henrique!
          </span>
        </div>

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

        <section className="grid-cols-3 gap-4 grid">
          <CardGraph title="Chamados por Ano" />
          <CardPie title="Chamados por Ano" />
        </section>
      </main>
    </>
  )
}
