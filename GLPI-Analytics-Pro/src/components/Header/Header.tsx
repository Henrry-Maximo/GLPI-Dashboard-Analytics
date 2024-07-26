/* Icons */
import { BellSimple, Gear, List, Question, UserCircle } from "phosphor-react";

import iconAlbras from "../../assets/login/logo_albras_slogan.png";

/* CSS Module */
// import style from "./style.module.css";

export default function Header() {
  return (
    <div className="flex flex-row p-8 h-16 justify-between items-center bg-gray-100 text-slate-900 border-b">
      <div className="flex flex-row gap-2">
        <div>
          <List size={24} />
        </div>
      </div>
      <img src={iconAlbras} style={{ height: "50px", width: "170px" }}></img>
      {/* <div className="text-2xl">Dashboard GLPI Technician</div> */}
      <div className="flex flex-row m-1 p-2 gap-2">
        <BellSimple size={24} />
        <Gear size={24} />
        <Question size={24} />
        <UserCircle size={24} />
      </div>
    </div>
  );
}

/*
display: flex;
  flex-direction: row;
  margin: 0.25rem;
  padding: 0.50rem;
  gap: 10px;
*/