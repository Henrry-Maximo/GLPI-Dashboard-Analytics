/* Icons */
import { BellSimple, List, Question, UserCircle } from "phosphor-react";

import iconAlbras from "../../assets/login/logo_albras_slogan.png";
import { NavItem } from "./NavItem/NavItem";

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
        <NavItem icon={BellSimple} />
        <NavItem icon={Question} />
        <NavItem icon={UserCircle} />
      </nav>
    </div>
  );
}
