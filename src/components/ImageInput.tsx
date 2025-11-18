import { LucideCamera } from "lucide-react";

export default function ImageInput({ name }: { name?: string }) {
  return (
    <label
      htmlFor="image-capture-input-123"
      className="w-full h-full bg-gray-200 flex flex-col justify-center items-center rounded-lg text-gray-600 cursor-pointer"
    >
      <LucideCamera className="size-19 stroke-1" />
      <div className="text-2xl ">Camera</div>
      <input
        id="image-capture-input-123"
        type="file"
        className="hidden"
        name={name || "picture"}
        accept="image/*"
        capture="environment"
      />
    </label>
  );
}
