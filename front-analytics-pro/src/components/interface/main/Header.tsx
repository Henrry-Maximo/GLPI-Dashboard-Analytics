import type { ComponentProps } from "react";

interface HeaderProps extends ComponentProps<"header"> {}
interface HeaderIconProps extends ComponentProps<"h1"> {}
interface HeaderButtonProps extends ComponentProps<"button"> {}

export const HeaderRoot = ({ ...props }: HeaderProps) => {
  return (
    <header
      className="mb-4 flex w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-2 py-2 shadow-sm"
      {...props}
    />
  );
};

export const HeaderIcon = ({ ...props }: HeaderIconProps) => {
  return (
    <h1
      aria-label="Icon"
      className="flex cursor-default items-center gap-2 text-2xl font-light text-orange-500"
      {...props}
    />
  );
};

export const HeaderButton = ({ ...props }: HeaderButtonProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="flex h-full cursor-pointer items-center gap-2 rounded-sm bg-white border border-orange-500 px-4 py-2 text-orange-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
        {...props}
      />
    </div>
  );
};
