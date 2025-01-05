import { User } from 'phosphor-react'

export function Profile() {
  return (
    <div className="grid grid-cols-profile items-center gap-3 mt-4">
      {/* <img
        src="https://github.com/henrry-maximo.png"
        className="h-10 w-10 rounded-full border border-orange-400"
        alt="foto de perfil"
      /> */}
      <div className="h-10 w-10 rounded-full border border-orange-400 flex justify-center items-center">
        <User size={24} /> {/* Exibindo o ícone diretamente */}
      </div>

      <div className="flex flex-col truncate">
        <span className="font semibold text-sm text-zinc-700">
          {`${sessionStorage.getItem('name')}`}
        </span>
        <span className="truncate text-sm text-zinc-500">...@gmail.com</span>
      </div>
    </div>
  )
}
