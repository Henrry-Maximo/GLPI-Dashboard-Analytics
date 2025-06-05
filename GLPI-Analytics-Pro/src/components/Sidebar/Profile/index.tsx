import { User } from 'phosphor-react';

export const Profile = () => {
  const userProfile = sessionStorage.getItem('name');

  return (
    <div className="grid grid-cols-profile items-center gap-3 mt-4">
      <div className="h-10 w-10 rounded-full border border-orange-400 flex justify-center items-center">
        <User size={24} color="#fb923c" /> {/* Exibindo o ícone diretamente */}
      </div>

      <div className="flex flex-col truncate">
        <span
          className="font semibold text-sm text-zinc-700 truncate"
          title={userProfile ? userProfile : ''}
        >
          {userProfile ? userProfile : ''}
        </span>
        <span className="truncate text-sm text-zinc-500">...@gmail.com</span>
      </div>
    </div>
  );
}
