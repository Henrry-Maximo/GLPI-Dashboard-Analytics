import { DotsThreeOutline } from 'phosphor-react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CardPie {
  title: string
}

export function CardPie({ title }: CardPie) {
  const data = {
    labels: ['Alta', 'Muito Alta', 'Média', 'Baixa', 'Muito Baixa'],
    datasets: [
      {
        label: title,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        data: [0, 0, 1, 0, 0, 1],
      },
    ],
  }

  return (
    <div className="bg-gray-50 p-4 gap-4 rounded-md shadow-sm">
      <div className="flex flex-row items-center justify-between mb-8">
        <p className="">{title}</p>
        <DotsThreeOutline
          size={24}
          className="hover:text-orange-500 hover:bg-white p-1 rounded-xl border border-transparent hover:border-orange-400 transition duration-300 ease-in-out"
        />
      </div>
      <div className="h-max w-full py-2">
        <Pie data={data} />
      </div>
    </div>
  )
}
