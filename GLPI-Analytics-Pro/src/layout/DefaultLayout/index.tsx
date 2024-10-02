import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function DefaultLayout() {
  const [menuOpen, setMenuOpen] = useState(true)

  function toggleSidebar() {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-screen">
      <div className="col-span-2">
        <Header toggleSidebar={() => toggleSidebar()} />
      </div>
      <Sidebar menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
