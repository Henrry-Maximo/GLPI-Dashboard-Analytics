import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function DefaultLayout() {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleSidebar = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <div className="flex flex-col h-screen grid-cols-app">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
          <Outlet />
        </div>
      </div>
    </>
  )
}
