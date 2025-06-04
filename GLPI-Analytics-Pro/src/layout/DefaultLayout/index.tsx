import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

export const DefaultLayout = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  function toggleSidebar() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
      <div className="col-span-full">
        <Header toggleSidebar={() => toggleSidebar()} />
      </div>
      
      <Sidebar menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />

      {/* renderizar conteúdo das páginas de acordo com a rota */}
      <div className="flex flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
