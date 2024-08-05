import { ElementType } from 'react'

interface NavItemProps {
  icon: ElementType
  title: string
}

export function NavItem({ icon: Icon, title }: NavItemProps) {
  return (
    <a
      href="#"
      className="group flex items-center gap-2 p-2 rounded hover:bg-white border border-transparent hover:border-orange-400 transition duration-300 ease-in-out"
    >
      <Icon
        size={16}
        className="h-5 w-5 text-gray-500 group-hover:text-orange-500 transition duration-300 ease-in-out"
      />
      <span className="font-medium text-gray-500 group-hover:text-orange-500 transition duration-300 ease-in-out">
        {title}
      </span>
    </a>
  )
}
