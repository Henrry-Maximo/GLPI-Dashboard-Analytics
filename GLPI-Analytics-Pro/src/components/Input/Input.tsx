import type { ComponentProps } from 'react';

type InputPrefixProps = ComponentProps<'div'>;

export function Prefix(props: InputPrefixProps) {
  return (
    <div
      className="group flex h-5 w-5 text-zinc-500 group-hover:text-orange-400 items-center transition duration-300 ease-in-out"
      {...props}
    />
  );
}

type InputControlProps = ComponentProps<'input'>;

export function Control(props: InputControlProps) {
  return (
    <input
      className="group bg-transparent border-none w-full focus:outline-none flex-1 p-0 text-zinc-900 placeholder-zinc-600 transition duration-300 ease-in-out"
      {...props}
    />
  );
}

type InputRootProps = ComponentProps<'div'>;

export function Root(props: InputRootProps) {
  return (
    <div
      className="group mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm hover:border-orange-400 transition duration-300 ease-in-out"
      {...props}
    />
  );
}
