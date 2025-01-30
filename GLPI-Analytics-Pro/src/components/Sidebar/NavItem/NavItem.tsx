import type { ElementType } from 'react'
import { Link } from 'react-router-dom'

interface NavItemProps {
  icon: ElementType
  title: string
  link: string
  onClick?: () => void
}

export function NavItem({ icon: Icon, title, link, onClick }: NavItemProps) {
  return (
    <Link
      to={link}
      onClick={onClick}
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
  )
}
