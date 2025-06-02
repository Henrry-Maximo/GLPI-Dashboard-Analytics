import { ChartLine, Download } from "phosphor-react";
import {
  HeaderButton,
  HeaderIcon,
  HeaderRoot,
  HeaderWrapper,
} from "./components/Header";

interface HeaderProps {
  name: string;
}

export function Header({ ...props }: HeaderProps) {
  return (
    <HeaderRoot>
      <HeaderIcon>
        <ChartLine size={30} className="text-orange-500" />
        {props.name}
      </HeaderIcon>

      <HeaderWrapper>
        <HeaderButton icon={<Download />} title="DOWNLOAD REPORTS" />
      </HeaderWrapper>
    </HeaderRoot>
  );
}
