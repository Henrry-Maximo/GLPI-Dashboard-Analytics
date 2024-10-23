export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Muito alta':
      return 'text-yellow-600'
    case 'Alta':
      return 'text-orange-600'
    case 'Média':
      return 'text-blue-600'
    case 'Baixa':
      return 'text-green-600'
    case 'Muito Baixa':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}
