import { ElementType } from "react";

interface NavItemProps {
  icon: ElementType,
  title: string,
}

export function NavItem({ icon: Icon, title }: NavItemProps) {
  return (
        <a href="#" className="group flex items-center gap-2 bg-slate-100 p-2 rounded hover:bg-white">
          <Icon size={16} className="h-5 w-5 text-gray-500 group-hover:text-orange-500" />
          <span className="font-medium text-gray-500 group-hover:text-orange-500">{title}</span>
        </a>
  );
}
