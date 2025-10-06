import { HeaderMonitoring } from "@/components/interface/monitoring/Header";

export const Monitoring = () => {
  return (
    <div className="flex h-screen flex-col">
      <HeaderMonitoring />
      <main className="flex h-full w-full flex-col">
        <div className="flex flex-1 flex-col justify-center bg-gray-50 text-center">
          <div className="flex flex-row items-center justify-center">
            <h2 className="flex flex-grow justify-center gap-2 text-4xl font-bold text-gray-600">
              <span className="text-orange-400">[200]</span>
              Novo Chamado
            </h2>
          </div>

          <div className="mt-4">
            <h1 className="mb-2 text-6xl font-bold text-orange-500">
              Henrique Maximo
            </h1>
            <p className="text-2xl font-normal text-gray-600">
              Prioridade:{" "}
              <span className="font-semibold text-blue-500">Baixa</span>
            </p>
            <p className="text-2xl font-normal text-gray-600">
              Local de Atendimento: <span className="font-semibold">Kit</span>
            </p>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-semibold text-gray-600">
              Alteração Usuário
            </p>
            <p className="text-2xl font-normal text-gray-600">
              Data de Criação:
              <span className="ml-2 text-gray-600">
                Data de Criação: 03/10/2025 13:49
              </span>
            </p>
          </div>
        </div>

        <section className="flex h-80 flex-col border-t-2 bg-white p-4">
          <h2 className="p-2 text-center text-2xl font-normal">
            Últimos Chamados
          </h2>

          <div className="mt-2 overflow-y-auto">
            <table className="w-full border-separate bg-white">
              <thead className="sticky left-0 right-0 top-0 bg-orange-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Requerente
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Título
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Técnico
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Local
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Urgência
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          <p className="mt-1 text-end text-sm font-light">
            <span className="font-semibold">Última Atualização:</span>
            <span className="ml-1 text-orange-600">06/10/2025 14:01:59</span>
          </p>
        </section>
      </main>
    </div>
  );
};
