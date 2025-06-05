import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export const DefaultLayout = () => {
  // estado para controle de abertura e fechamento da sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
      <div className="col-span-full">
        <Header toggleSidebar={() => toggleSidebar()} />
      </div>
      
      <Sidebar disabled={isSidebarOpen}  />

      {/* renderizar conteúdo das páginas de acordo com a rota */}
      <div className="flex flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
