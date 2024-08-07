import { ArrowCircleLeft } from 'phosphor-react'
import { NavItem } from '../../components/Header/NavItem/NavItem'

export default function MonitoringTicket() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row text-center items-center gap-4 justify-between bg-orange-500 p-4 text-slate-100">
        <div className="">
          <NavItem icon={ArrowCircleLeft} />
        </div>
        <h2 className="text-2xl font-medium">Painel de Alerta</h2>
        <p className="flex flex-col">
          <span className="text-xs">01/07/2024</span>
          <span className="text-2xl font-semibold">14:37:51</span>
        </p>
      </header>
      <main className="bg-slate-100 flex flex-col flex-grow h-full text-center justify-center">
        <div className="mb-8">
          <h2 className="font-bold flex flex-row gap-2 text-3xl justify-center text-gray-600">
            <span className="text-orange-500">22439</span>Novo Chamado
          </h2>
          <p className="font-medium flex flex-row gap-2 text-2xl justify-center text-gray-600">
            Prioridade: <span className="text-blue-500">Baixa</span>
          </p>
        </div>
        <div className="mb-8">
          <h1 className="mb-2 font-bold flex flex-row gap-2 text-5xl justify-center text-gray-600">
            Washington Dantas
          </h1>
          <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
            Local de Atendimento:{' '}
            <span className="text-orange-500">Setor T.I</span>
          </p>
          <p className="font-medium flex flex-row gap-2 text-lg justify-center text-gray-600">
            Equipamento: <span className="text-orange-500">DSKSP139</span>
          </p>
        </div>
        <div>
          <p className="font-bold flex flex-row gap-2 text-xl justify-center text-gray-600">
            Descrição do Chamado:
            <span className="text-orange-500">
              Lentidão no Uso da Impressora de Etiquetas (Zebra)
            </span>
          </p>
        </div>
      </main>
    </div>
  )
}
