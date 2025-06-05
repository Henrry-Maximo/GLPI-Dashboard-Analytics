import type { ElementType } from "react";
import { Link } from "react-router-dom";

interface PropsNavigationLink {
  title: string
  path: string;
  icon: ElementType; // tipo genérico
  clickNavigationLink?: () => void; // função que não retorna nada
}

export const NavigationMenuLink = ({ title, path, icon: Icon, clickNavigationLink }: PropsNavigationLink) => {
  return (
    <Link
      to={{
        pathname: `${path}`,
      }}
      onClick={() => clickNavigationLink}
      className="group flex items-center gap-2 p-2 rounded hover:bg-white border border-transparent hover:border-orange-400 transition duration-300 ease-in-out"
    >
      <Icon
        size={16}
        className="h-5 w-5 text-gray-500 group-hover:text-orange-500 group-hover:animate-bounce transition duration-300 ease-in-out"
      />
      <span className="font-medium text-gray-500 group-hover:text-orange-500 group-hover:animate-bounce transition duration-300 ease-in-out">
        {title}
      </span>
    </Link>
  );
};
