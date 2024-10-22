import dayjs from 'dayjs'
import { getValidationColor } from '../../../utils/monitoring-validation-color'

interface PropsTickets {
  id: number
  title: string
  date_creation: string
  status: string
  priority: string
  location: string
  firstname: string
  realname: string
  validation_status: string
}

interface TicketsForm {
  data: PropsTickets
}

export function ViewTicketMonitoring({ data }: TicketsForm) {
  const date = dayjs(data.date_creation)
  const messageWithoutData = '...'

  return (
    <div className="flex flex-col flex-1 text-center justify-center bg-white border-b-orange-500">
      <h2 className="font-bold flex flex-row gap-2 text-4xl justify-center text-gray-600">
        <span className="text-orange-400">
          [{data ? data.id : messageWithoutData}]
        </span>
        Novo Chamado
      </h2>
      <div className="mt-4">
        <h1 className="mb-2 font-bold text-6xl text-orange-500">
          {data ? data.firstname : messageWithoutData}{' '}
          {data ? data.realname : messageWithoutData}
        </h1>
        {/* <p className="font-normal text-2xl text-gray-600">
              Status:{' '}
              <span className="font-semibold text-yellow-500">
                {data ? data.status : messageWithoutData}
              </span>
            </p> */}
        <p className="font-normal text-2xl text-gray-600">
          Prioridade:{' '}
          <span className="font-semibold text-blue-500">
            {data ? data.priority : messageWithoutData}
          </span>
        </p>
        <p className="font-normal text-2xl text-gray-600">
          Local de Atendimento:{' '}
          <span className="font-semibold">
            {data ? data.location : messageWithoutData}
          </span>
        </p>
        {data.validation_status ? (
          <p className="font-normal text-2xl m-1 text-gray-600">
            Validação:
            <span
              className={`ml-2 uppercase bg-white rounded-md p-1 border  ${getValidationColor(data.validation_status)}`}
            >
              {data.validation_status}
            </span>
          </p>
        ) : null}
      </div>
      <div className="mt-4">
        <p className="font-semibold text-2xl text-gray-600">
          {data ? data.title : messageWithoutData}
        </p>
        <p className="font-normal text-2xl text-gray-600">
          Data de Criação:
          <span className="text-gray-600 ml-2">
            {data ? date.format('DD/MM/YYYY HH:mm') : messageWithoutData}
            {/* ({data ? date.fromNow() : messageWithoutData}) */}
          </span>
          {/* <span className="text-gray-600 ml-2">
                {data
                  ? date.format('dddd, D [de] MMMM [de] YYYY')
                  : messageWithoutData}
              </span> */}
        </p>
        <p className="font-bold text-2xl text-gray-600"></p>
      </div>
    </div>
  )
}
