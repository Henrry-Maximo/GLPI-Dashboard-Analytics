/* Icons */
import { BellSimple, List, Question, UserCircle } from "phosphor-react";

import logo from "../../assets/login/logo.png";
import { NavItem } from "./NavItem/NavItem";

export interface MainProps {
	menuOpen: boolean;
	closeMenu: () => void;
}

export interface ButtonProps {
	toggleSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({ toggleSidebar }: ButtonProps) {
	return (
		<div className="bg-gray-50 flex p-8 h-16 justify-between  items-center text-slate-900 border border-b-orange-500">
			<button
				type="button"
				className="flex items-center gap-2"
				onClick={toggleSidebar}
			>
				<NavItem icon={List} route="#" />
			</button>

			<img src={logo} className="w-24 h-18" alt="glpi" />

			<nav className="flex gap-2">
				<NavItem icon={BellSimple} route="/main/notification" />
				<NavItem icon={Question} route="/main/help" />
				<NavItem icon={UserCircle} route="/main/system" />
			</nav>
		</div>
	);
}
