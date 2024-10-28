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
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
      <div className="col-span-2">
        <Header toggleSidebar={() => toggleSidebar()} />
      </div>
      <Sidebar menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
      <div className="flex overflow-y-auto bg-gray-200">
        <Outlet />
      </div>
    </div>
  )
}
