/* Icons */
import { BellSimple, List, Question, UserCircle } from 'phosphor-react'

import iconAlbras from '../../assets/login/logo_albras_slogan.png'
import { NavItem } from './NavItem/NavItem'

export interface ButtonProps {
  toggleSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface MainProps {
  menuOpen: boolean
  closeMenu: () => void
}

export default function Header({ toggleSidebar }: ButtonProps) {
  return (
    <div className="flex justify-between items-center p-8 h-16 bg-gray-100 text-slate-900 border-b border-solid border-orange-500">
      <button className="flex items-center gap-2" onClick={toggleSidebar}>
        <NavItem icon={List} route="#" />
      </button>
      <div className="w-64 flex items-center justify-center">
        <img
          src={iconAlbras}
          style={{ height: '50px', width: '100px' }}
          alt="Logo"
        ></img>
      </div>
      <nav className="flex items-center flex-row gap-2">
        <NavItem icon={BellSimple} route="#" />
        <NavItem icon={Question} route="#" />
        <NavItem icon={UserCircle} route="#" />
      </nav>
    </div>
  )
}

/*
display: flex;
  flex-direction: row;
  margin: 0.25rem;
  padding: 0.50rem;
  gap: 10px;
*/
