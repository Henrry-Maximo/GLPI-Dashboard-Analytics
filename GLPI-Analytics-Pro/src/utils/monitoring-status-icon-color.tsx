import { CalendarDots } from '@phosphor-icons/react'
import { XCircle, Circle } from 'phosphor-react' // Importando ícones

export const getStatusDetails = (status: string) => {
  switch (status) {
    case 'Novo':
      return {
        titleStatus: 'Novo',
        icon: (
          <Circle
            size={18}
            className="bg-green-500 text-green-500 rounded-full"
          />
        ),
      }
    case 'Em Atendimento (atribuído)':
      return {
        titleStatus: 'Em Atendimento (atribuído)',
        icon: <Circle size={18} className="text-green-500" />,
      }
    case 'Em Atendimento (planejado)':
      return {
        titleStatus: 'Em Atendimento (planejado)',
        icon: <CalendarDots size={18} />,
      }
    case 'Pendente':
      return {
        titleStatus: 'Pendente',
        icon: (
          <Circle
            size={18}
            className="bg-yellow-400 text-yellow-400 rounded-full"
          />
        ),
      }
    default:
      return {
        titleStatus: 'Status não reconhecido',
        icon: <XCircle size={18} />,
      }
  }
}
