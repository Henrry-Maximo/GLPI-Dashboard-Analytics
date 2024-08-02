import { CheckCircle, Clock, EnvelopeSimpleOpen, ShieldCheck } from "phosphor-react";
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
                    <p className="text-2xl font-bold">128</p>
                    <span >Chamados Abertos</span>
                  </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <Clock className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold">128</p>
                    <span >Chamados Pendentes</span>
                  </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <CheckCircle className="h-10 w-10 bg-red-100 text-red-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold">128</p>
                    <span >Chamados Finalizados</span>
                  </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
                  <ShieldCheck className="h-10 w-10 bg-pink-100 text-pink-500 rounded-md p-2" />
                  <div>
                    <p className="text-2xl font-bold">128</p>
                    <span >Chamados Solucionados</span>
                  </div>
                </div>
                {/* <div className="bg-zinc-50 p-4 rounded shadow">
                  <Clock />
                  <p className="mt-2 text-2xl font-bold">456</p>
                  <span>Chamados Pendentes</span>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow">
                  <CheckCircle />
                  <p className="mt-2 text-2xl font-bold">789</p>
                  <span>Chamados Finalizados</span>
                </div>
                <div className="bg-zinc-50 p-4 rounded shadow">
                  <ShieldCheck />
                  <p className="mt-2 text-2xl font-bold">789</p>
                  <span>Chamados Solucionados</span>
                </div> */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
