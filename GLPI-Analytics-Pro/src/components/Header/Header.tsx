import style from "./style.module.css"

export default function Header() {
  return (
    <div className={style.wrapper}>
      <div>☰</div>
      <div>Dashboard GLPI Technician</div>
      <div>Options</div>
    </div>
  )
}