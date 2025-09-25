import { User } from "lucide-react";

export const Profile = () => {
  // const userProfile = sessionStorage.getItem("name");
  // const existNameUser = userProfile ? userProfile : "null";

  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400">
        <User className="h-12" color="#fb923c" />
        {/* Exibindo o ícone diretamente */}
      </div>

      <div className="flex flex-col truncate">
        <span
          className="font semibold truncate text-sm text-zinc-700"
          title="Henrique Maximo Lima da Silva"
        >
          Henrique Maximo
        </span>
        <span className="truncate text-sm text-zinc-500">...@gmail.com</span>
      </div>
    </div>
  );
};
