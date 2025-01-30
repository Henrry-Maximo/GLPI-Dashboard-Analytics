import dayjs from 'dayjs'

interface PropsTimeCheck {
  timeCheckUpdate: number
}

export function FooterTicketsMonitoring({ timeCheckUpdate }: PropsTimeCheck) {
  const lastUpdatedTicketsDetails = dayjs(timeCheckUpdate).format(
    'DD/MM/YYYY HH:mm:ss'
  )

  return (
    <p className="text-sm font-light text-end mt-1">
      <span className="font-semibold">Última Atualização:</span>
      <span className="text-orange-600 ml-1">{lastUpdatedTicketsDetails}</span>
    </p>
  )
}
