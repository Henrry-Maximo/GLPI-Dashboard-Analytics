import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const DefaultLayout = () => {
  const [show, setShow] = useState(true);
  const sidebarStorageKey = "sidebar";

  useEffect(() => {
    const savedStatusSidebar = localStorage.getItem(sidebarStorageKey);

    if (savedStatusSidebar !== null) {
      // JSON.parse() => converte o valor para o original (booleano)
      setShow(JSON.parse(savedStatusSidebar)); // só parseia se existir
    }
  }, []);

  function toggleSidebar() {
    const newValueShow = !show;

    setShow(newValueShow);
    localStorage.setItem(sidebarStorageKey, JSON.stringify(newValueShow));

    // JSON.stringify() => converte o valor para string
    // localStorage só aceita valores em string, nada de tipos como booleanos, objetos ou arrays
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
      <div className="col-span-full">
        <Header toggleSidebar={() => toggleSidebar()} />
      </div>

      <Sidebar disabled={show} />

      {/* renderizar conteúdo das páginas de acordo com a rota */}
      <div className="flex flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
