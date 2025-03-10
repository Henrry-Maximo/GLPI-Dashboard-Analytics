import { ChartLine } from "phosphor-react";
import { HeaderButton, HeaderIcon, HeaderRoot, HeaderWrapper } from "./components/Header";

export function Header() {
	return (
		<HeaderRoot>
			<HeaderIcon>
				<ChartLine size={30} className="text-orange-500" />
				Dashboard
			</HeaderIcon>

			<HeaderWrapper>
				<HeaderButton>Filter</HeaderButton>
			</HeaderWrapper>
		</HeaderRoot>
	);
}
