import { ElementType } from 'react'
import { Link } from 'react-router-dom'

interface NavItemProps {
  icon: ElementType
  route: string
}

export function NavItem({ icon: Icon, route }: NavItemProps) {
  return (
    <Link
      to={route}
      className="group flex items-center gap-2 bg-slate-100 p-2 rounded hover:bg-white border border-white hover:border-orange-400 transition duration-300 ease-in-out"
    >
      <Icon
        size={24}
        className="h-5 w-5 text-gray-700 group-hover:text-orange-500 transition duration-300 ease-in-out"
      />
    </Link>
  )
}
