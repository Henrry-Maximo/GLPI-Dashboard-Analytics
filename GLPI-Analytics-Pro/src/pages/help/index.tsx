export default function Help() {
  return (
    <section className="text-gray-700">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-16 rounded-md">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Central de Ajuda</h1>
          <p className="text-lg">Tudo o que você precisa saber para aproveitar ao máximo nossa aplicação.</p>
        </div>
      </div>

      {/* Section: Sobre Técnicos */}
      <div className="py-12 bg-slate-100">
        <div className="mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Estatísticas de Técnicos</h2>
          <p className="text-center mb-8 text-gray-600">
            Monitore o desempenho dos técnicos de forma detalhada e eficiente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Chamados Solucionados</h3>
              <p>Visualize a quantidade de chamados resolvidos por cada técnico em tempo real.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Tempo Médio de Resolução</h3>
              <p>Acompanhe o tempo médio para conclusão de chamados.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Desempenho Geral</h3>
              <p>Compare a produtividade entre os técnicos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Estatísticas de Requerentes */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Estatísticas de Requerentes</h2>
          <p className="text-center mb-8 text-gray-600">
            Conheça os padrões de solicitação e priorize as necessidades mais críticas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Chamados Mais Frequentes</h3>
              <p>Identifique os problemas mais recorrentes entre os requerentes.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Taxa de Resolução</h3>
              <p>Descubra o percentual de chamados resolvidos por usuário.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Ajuda sobre Chamados */}
      <div className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Ajuda com Chamados</h2>
          <p className="text-center mb-8 text-gray-600">
            Encontre soluções rápidas para seus problemas mais urgentes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Abrir um Chamado</h3>
              <p>Saiba como registrar um novo chamado de maneira simples e rápida.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Acompanhamento</h3>
              <p>Veja como acompanhar o status dos chamados em tempo real.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Soluções Frequentes</h3>
              <p>Consulte nossa base de conhecimento para resolver problemas comuns.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
