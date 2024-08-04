import {
  CheckCircle,
  Clock,
  DotsThreeOutline,
  EnvelopeSimpleOpen,
  ShieldCheck,
} from "phosphor-react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col h-screen grid-cols-app ">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex flex-1 flex-col px-4 pb-12 pt-14 bg-gray-200">
            <section className="mb-8">
              {/* grid-cols-profile grid items-center gap-3 */}
              <div className="grid md:grid-cols-4 grid-cols-card gap-4">
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <EnvelopeSimpleOpen className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold pl-1">128</p>
                    <span>Chamados Abertos</span>
                  </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <Clock className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold pl-1">128</p>
                    <span>Chamados Pendentes</span>
                  </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <CheckCircle className="h-10 w-10 bg-red-100 text-red-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold pl-1">128</p>
                    <span>Chamados Finalizados</span>
                  </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <ShieldCheck className="h-10 w-10 bg-pink-100 text-pink-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold pl-1">128</p>
                    <span>Chamados Solucionados</span>
                  </div>
                </div>
              </div>
            </section>

            {/* className="grid md:grid-cols-4 grid-cols-card gap-4" */}

            <section className="mb-8">
              <div className="flex flex-row gap-7">
                <div className="bg-zinc-50 p-4 rounded shadow flex flex-col items-start gap-4 flex-grow">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="">Chamados por Mês</p>
                    <DotsThreeOutline size={24} />
                  </div>
                  <div className="h-64 w-full">
                    {/* <Line data={data} /> */}
                  </div>
                </div>
                <div className="group bg-zinc-50 p-4 rounded shadow flex flex-col items-start gap-4 flex-grow">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="">Chamados por Urgência</p>
                    <DotsThreeOutline size={24} />
                  </div>
                  <div className="h-64 w-full">
                    {/* <Pie data={pieData} /> */}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
