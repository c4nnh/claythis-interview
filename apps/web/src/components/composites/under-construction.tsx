import { IconUnderConstruction } from "../icons/under-construction";

export function UnderConstruction() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <IconUnderConstruction />
      <span className="text-2xl text-blue-gray-500">Still cooking</span>
    </div>
  );
}
