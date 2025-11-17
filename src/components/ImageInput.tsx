import { LucideCamera } from "lucide-react";

export default function ImageInput() {
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col justify-center items-center rounded-lg">
      <LucideCamera className="size-19 stroke-1" />
      <div className="text-2xl ">Camera</div>
    </div>
  );
}
