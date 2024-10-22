import dayjs from 'dayjs'

interface PropsTimeCheck {
  timeCheckUpdate: number
}

export function FooterTicketsMonitoring({ timeCheckUpdate }: PropsTimeCheck) {
  const lastUpdatedTicketsDetails =
    dayjs(timeCheckUpdate).format(`DD/MM/YYYY HH:mm`)

  return (
    <p className="text-sm font-mono text-end mt-1">
      <span className="font-bold underline">última atualização:</span>
      <span className="text-orange-600 ml-1">{lastUpdatedTicketsDetails}</span>
    </p>
  )
}
