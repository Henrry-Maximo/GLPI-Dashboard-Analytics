/* Icons */
import { BellSimple, List, Question, UserCircle } from "phosphor-react";

import iconAlbras from "../../assets/login/logo_albras_slogan.png";

/* CSS Module */
// import style from "./style.module.css";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-8 h-16 bg-gray-100 text-slate-900 border-b border-solid border-orange-500">
      <div className="flex items-center gap-2">
        <List size={24} />
      </div>
      <div className="w-64 flex items-center justify-center">
        <img
          src={iconAlbras}
          style={{ height: "50px", width: "100px" }}
          alt="Logo"
        ></img>
      </div>
      <nav className="flex items-center">
        <ul className="flex flex-row gap-2">
          <li>
            <BellSimple size={24} />
          </li>
          <li>
            <Question size={24} />
          </li>
          <li>
            <UserCircle size={24} />
          </li>
        </ul>
      </nav>
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
