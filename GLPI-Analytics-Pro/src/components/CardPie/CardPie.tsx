import { DotsThreeOutline } from 'phosphor-react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CardPie {
  title: string
}

export function CardPie({ title }: CardPie) {
  const data = {
    labels: ['Alto', 'Muito Alto', 'Médio', 'Baixo', 'Muito Baixo'],
    datasets: [
      {
        label: 'Chamados por Mês',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        data: [12, 19, 3, 5, 2, 3],
      },
    ],
  }

  // const config = {
  //   type: 'doughnut',
  //   data,
  //   options: {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: 'top',
  //       },
  //       title: {
  //         display: true,
  //         text: 'Chart.js Doughnut Chart',
  //       },
  //     },
  //   },
  // }

  return (
    <div className="bg-zinc-50 p-4 rounded-sm shadow-lg h-full gap-4 border">
      <div className="flex flex-row items-center justify-between mb-8">
        <p className="">{title}</p>
        <DotsThreeOutline
          size={24}
          className="hover:text-orange-500 hover:bg-white p-1 rounded-xl border border-transparent hover:border-orange-400 transition duration-300 ease-in-out"
        />
      </div>
      <div className="h-full w-full py-2">
        <Pie data={data} />
      </div>
    </div>
  )
}
