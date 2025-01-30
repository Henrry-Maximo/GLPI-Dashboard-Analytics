export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Nova Atualização',
      message: 'O sistema foi atualizado para a versão 2.3.0.',
      time: '2025-01-03 14:35',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Manutenção Programada',
      message: 'O sistema ficará indisponível amanhã das 22h às 02h.',
      time: '2025-01-02 09:15',
    },
    {
      id: 3,
      type: 'success',
      title: 'Meta Atingida',
      message:
        'Parabéns! Sua equipe atingiu a meta de 100 chamados resolvidos.',
      time: '2025-01-01 17:00',
    },
    {
      id: 4,
      type: 'error',
      title: 'Erro de Sistema',
      message: 'Falha ao sincronizar dados. Tente novamente mais tarde.',
      time: '2025-01-01 08:45',
    },
  ]

  return (
    <section className="m-4 w-full px-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Notificações</h1>
        <p className="text-gray-500">
          Acompanhe as últimas atualizações e avisos importantes.
        </p>
      </div>

      <div className="grid grid-cols-1 pb-16 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 border-l-4
              ${notification.type === 'info' && 'bg-blue-100 border-blue-500'}
              ${
                notification.type === 'warning' &&
                'bg-yellow-100 border-yellow-500'
              }
              ${
                notification.type === 'success' &&
                'bg-green-100 border-green-500'
              }
              ${notification.type === 'error' && 'bg-red-100 border-red-500'}
            `}
          >
            <h2 className="font-semibold text-lg mb-2">{notification.title}</h2>
            <p className="text-gray-700 mb-3">{notification.message}</p>
            <span className="text-sm text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
