import { DotsThreeOutline } from 'phosphor-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface CardGraph {
  title: string
}

export function CardGraph({ title }: CardGraph) {
  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']
  const data = {
    labels,
    datasets: [
      {
        label: 'Aberto',
        backgroundColor: 'rgb(22, 99, 50)',
        borderColor: 'rgb(22, 99, 50)',
        data: [23, 14, 7, 4, 22, 49, 50],
      },
      {
        label: 'Em atendimento',
        backgroundColor: 'rgb(115, 99, 50)',
        borderColor: 'rgb(115, 99, 50)',
        data: [0, 11, 55, 23, 26, 32, 41],
      },
      {
        label: 'Pendente',
        backgroundColor: 'rgb(255, 99, 50)',
        borderColor: 'rgb(255, 99, 50)',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
      {
        label: 'Solucionado',
        backgroundColor: 'rgb(211, 20, 100)',
        borderColor: 'rgb(211, 20, 100)',
        data: [0, 12, 3, 62, 44, 17, 45],
      },
      {
        label: 'Fechado',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [3, 2, 3, 30, 25, 18, 11],
      },
    ],
  }

  return (
    <div className="bg-gray-50 flex flex-col p-4 gap-4 col-span-2 rounded-md shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <p className="">{title}</p>
        <DotsThreeOutline
          size={24}
          className="hover:text-orange-500 hover:bg-white p-1 cursor-pointer rounded-xl border border-transparent hover:border-orange-400 transition duration-300 ease-in-out"
        />
      </div>
      <div className="h-full w-full py-2">
        <Line className="" data={data} />
      </div>
    </div>
  )
}
