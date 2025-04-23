import { ChartLine } from "phosphor-react";
import { HeaderIcon, HeaderRoot } from "./components/Header";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <HeaderRoot>
      <HeaderIcon>
        <ChartLine size={30} className="text-orange-500" />
        {name}
      </HeaderIcon>

      {/* <HeaderWrapper>
				<HeaderButton>Filter</HeaderButton>
			</HeaderWrapper> */}
    </HeaderRoot>
  );
}
