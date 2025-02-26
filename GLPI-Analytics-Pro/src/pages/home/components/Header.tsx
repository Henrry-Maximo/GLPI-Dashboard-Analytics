import type { ComponentProps } from "react";

interface HeaderProps extends ComponentProps<"header"> {}

export function HeaderRoot({ ...props }: HeaderProps) {
	return (
		<header
			className="flex flex-row bg-gray-50 justify-between mb-4 items-center py-2 px-2 rounded-md shadow-md"
			{...props}
		/>
	);
}

interface HeaderIconProps extends ComponentProps<"h1"> {}

export function HeaderIcon({ ...props }: HeaderIconProps) {
	return (
		<h1
			className="text-2xl font-light text-orange-500 flex gap-2 items-center"
			{...props}
		/>
	);
}

// interface HeaderInformationsProps extends ComponentProps<"span"> {}

export function HeaderInformations() {
	const nameUserAuth = sessionStorage.getItem("name");

	return (
		<span className="text-2 font-light text-zinc-800">Olá, {nameUserAuth}</span>
	);
}
