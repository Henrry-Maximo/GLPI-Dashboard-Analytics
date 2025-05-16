import type { ComponentProps } from "react";

interface HeaderProps extends ComponentProps<"header"> {}

export function HeaderRoot({ ...props }: HeaderProps) {
  return (
    <header
      className="flex bg-white justify-between mb-4 items-center py-2 px-2 rounded-md shadow-md"
      {...props}
    />
  );
}

interface HeaderIconProps extends ComponentProps<"h1"> {}

export function HeaderIcon({ ...props }: HeaderIconProps) {
  return (
    <h1
      aria-label="Icon"
      className="text-2xl font-light text-orange-500 flex gap-2 items-center cursor-default"
      {...props}
    />
  );
}

interface HeaderSearchProps extends ComponentProps<"div"> {}

export function HeaderWrapper({ ...props }: HeaderSearchProps) {
  return <div className="flex justify-center items-center gap-2" {...props} />;
}

// interface HeaderInformationsProps extends ComponentProps<"span"> {}

// export function HeaderInformations() {
// 	let nameUserAuth = sessionStorage.getItem("name");

//   if (!nameUserAuth) {
//     nameUserAuth = "usuário";
//   }

// 	return (
// 		<span
//       aria-label="User"
//       className="text-2 font-light text-zinc-800 cursor-default">
//         Olá, {nameUserAuth}
//     </span>
// 	);
// }

interface HeaderButtonProps extends ComponentProps<"button"> {
	icon: React.ReactNode;
}

export function HeaderButton({ icon, title }: HeaderButtonProps) {
  return (
    <button className="flex gap-2 items-center h-full bg-red-500 text-white py-2 px-4 hover:bg-red-800 rounded-sm cursor-pointer">
			{icon}
      {title}
    </button>
  );
}
