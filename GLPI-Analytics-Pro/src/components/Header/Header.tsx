/* Icons */
import { BellSimple, Gear, List, Question, UserCircle } from "phosphor-react";

import iconAlbras from "../../assets/login/logo_albras_slogan.png";

/* CSS Module */
import style from "./style.module.css";

export default function Header() {
  return (
    <div className={style.wrapper}>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <div>
          <List size={24} />
        </div>
        <img src={iconAlbras} style={{ height: "30px", width: "100px" }}></img>
      </div>
      <div className={style.titleHeader}>Dashboard GLPI Technician</div>
      <div className={style.optionsHeader}>
        <BellSimple size={24} />
        <Gear size={24} />
        <Question size={24} />
        <UserCircle size={24} />
      </div>
    </div>
  );
}
