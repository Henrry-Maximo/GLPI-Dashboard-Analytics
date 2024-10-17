export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Crítico':
      return 'text-red-600'
    case 'Muito alto':
      return 'text-yellow-600'
    case 'Alto':
      return 'text-orange-600'
    case 'Médio':
      return 'text-blue-600'
    case 'Baixo':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}
