import style from "./style.module.css";

export default function Sidebar() {
  return (
    <div className={style.wrapper}>
      {/* <div className={style.titleSidebar}>Menu</div> */}
      <div className={style.optionsSidebar}>
        <div>
          <div>Dashboard</div>
          <div>Chamados</div>
          <div>Estatísticas</div>
          <div>Análises</div>
          <div>Notificações</div>
          <div>Adicionados</div>
        </div>
        <div>
          <div>Logout</div>
          <div>Light Mode</div>
        </div>
      </div>
    </div>
  );
}
