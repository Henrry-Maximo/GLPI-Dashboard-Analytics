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
  Legend,
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
        label: 'Solucionado',
        backgroundColor: 'rgb(255, 99, 50)',
        borderColor: 'rgb(255, 99, 50)',
        data: [0, 10, 5, 2, 20, 30, 45],
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
    <div className="bg-zinc-50 p-4 rounded-sm shadow-lg flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <p className="">{title}</p>
        <DotsThreeOutline
          size={24}
          className="hover:text-orange-500 hover:bg-white p-1 rounded-xl"
        />
      </div>
      <div className="h-full w-full py-2">
        <Line className="" data={data} />
      </div>
    </div>
  )
}
