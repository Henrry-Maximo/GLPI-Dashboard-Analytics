import { ElementType } from "react";

interface NavItemProps {
  icon: ElementType;
}

export function NavItem({ icon: Icon }: NavItemProps) {
  return (
    <a
      href="#"
      className="group flex items-center gap-2 bg-slate-100 p-2 rounded hover:bg-white"
    >
      <Icon
        size={24}
        className="h-5 w-5 text-gray-500 group-hover:text-orange-500"
      />
    </a>
  );
}
