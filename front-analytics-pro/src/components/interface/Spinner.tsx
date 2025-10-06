import { LoaderCircleIcon } from "lucide-react";

export const Spinner = () => {
  return (
    <p
      className="flex flex-1 flex-col items-center justify-center  
          text-red-600"
    >
      <LoaderCircleIcon className="size-10 animate-spin text-zinc-800" />
    </p>
  );
};
