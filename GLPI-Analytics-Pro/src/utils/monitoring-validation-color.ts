export const getValidationColor = (validation: string) => {
  switch (validation) {
    case 'Aguardando':
      return 'text-sky-500'
    case 'Aprovado':
      return 'text-green-600'
    case 'Recusado':
      return 'text-red-600'
    default:
      return 'text-red-200'
  }
}
