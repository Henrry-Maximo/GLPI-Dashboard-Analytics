/* Icons */
import {
  BellSimple,
  Gear,
  List,
  Question,
  UserCircle,
} from "phosphor-react";

/* CSS Module */
import style from "./style.module.css";

export default function Header() {
  return (
    <div className={style.wrapper}>
      <div>
        <div>
          <List size={24} />
        </div>
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
