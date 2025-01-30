import { ChartLine } from 'phosphor-react'

export function Header() {
  const nameUserAuth = sessionStorage.getItem('name')

  return (
    <div className="flex flex-row bg-gray-50 justify-between mb-4 items-center py-2 px-2 rounded-md shadow-md">
      <h1 className="text-2xl font-light text-orange-500 flex gap-2 items-center">
        <ChartLine size={30} className="text-orange-500" />
        Dashboard
      </h1>
      <span className="text-2 font-light text-zinc-800">
        Olá, {`${nameUserAuth}`}
      </span>
    </div>
  )
}
