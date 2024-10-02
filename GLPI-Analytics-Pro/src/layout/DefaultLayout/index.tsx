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
    // <div className="h-screen overflow-hidden">
    //   <div className="grid grid-rows-[auto_1fr] grid-cols-[16rem_1fr] h-full">
    //     <header className="bg-green-500 text-white p-4 col-span-2">
    //       <h1>Meu Header</h1>
    //     </header>

    //     <aside className="bg-gray-800 text-white p-4 overflow-y-auto">
    //       <ul>
    //         <li className="mb-4">Item 1</li>
    //         <li className="mb-4">Item 2</li>
    //         <li className="mb-4">Item 3</li>
    //       </ul>
    //     </aside>

    //     <main className="p-6 overflow-y-auto">
    //       <h2>Conteúdo Principal</h2>
    //       <p>
    //         Este é o conteúdo que rola enquanto o header e a sidebar permanecem
    //         fixos.
    //       </p>
    //       <div className="space-y-4">
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    //           vitae justo eget nulla scelerisque suscipit in at augue.
    //         </p>
    //       </div>
    //     </main>
    //   </div>
    // </div>
  )
}
