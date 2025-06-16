import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const DefaultLayout = () => {
  // estado para controle de abertura e fechamento da sidebar
  const [show, setShow] = useState(true);

  // const saved = localStorage.getItem("sidebar");
  // return saved === null ? true : JSON.parse(saved);

  // useEffect(() => {
  //   localStorage.setItem('sidebar', JSON.stringify(show));
    
    // const statusSidebar = localStorage.getItem('statusSidebar');
    // console.log(statusSidebar);
    // console.log("mostrar/ocultar");
  // }, [show]);

  function toggleSidebar() {
    setShow(!show);
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
