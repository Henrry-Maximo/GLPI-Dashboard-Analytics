export const Help = () => {
  return (
    <section className="text-gray-700">
      <div className=" rounded-md py-2 text-center">
        <h1 className="mb-4 bg-orange-600 p-4 text-4xl font-bold shadow-md">
          Bem-vindo à Central de Ajuda
        </h1>
        <p className="text-lg">
          Tudo o que você precisa saber para aproveitar ao máximo nossa
          aplicação.
        </p>
      </div>

      <div className="py-8">
        <div className="mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Estatísticas de Técnicos
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Monitore o desempenho dos técnicos de forma detalhada e eficiente.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Chamados Solucionados</h3>
              <p>
                Visualize a quantidade de chamados resolvidos por cada técnico
                em tempo real.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">
                Tempo Médio de Resolução
              </h3>
              <p>Acompanhe o tempo médio para conclusão de chamados.</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Desempenho Geral</h3>
              <p>Compare a produtividade entre os técnicos.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Estatísticas de Requerentes
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Conheça os padrões de solicitação e priorize as necessidades mais
            críticas.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">
                Chamados Mais Frequentes
              </h3>
              <p>
                Identifique os problemas mais recorrentes entre os requerentes.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Taxa de Resolução</h3>
              <p>Descubra o percentual de chamados resolvidos por usuário.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Ajuda com Chamados
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Encontre soluções rápidas para seus problemas mais urgentes.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Abrir um Chamado</h3>
              <p>
                Saiba como registrar um novo chamado de maneira simples e
                rápida.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Acompanhamento</h3>
              <p>Veja como acompanhar o status dos chamados em tempo real.</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Soluções Frequentes</h3>
              <p>
                Consulte nossa base de conhecimento para resolver problemas
                comuns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
