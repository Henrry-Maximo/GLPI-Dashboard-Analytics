import { MagnifyingGlass } from "phosphor-react";

export function Search() {
  return (
    <div className="mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm">
      <MagnifyingGlass className="h-5 w-5 text-zinc-500" />
      <input
        className="bg-transparent border-none w-full focus:outline-none flex-1 p-0 text-zinc-900 placeholder-zinc-600"
        placeholder="Search"
      />
    </div>
  );
}
