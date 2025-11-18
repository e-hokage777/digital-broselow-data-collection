import { PersonStanding } from "lucide-react";

type Direction = "forward" | "backward" | "left" | "right";

export default function PoseSelectionButton({
  direction,
  onClick,
}: {
  direction: Direction;
  onClick?: (direction: Direction) => void;
}) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        role="button"
        aria-label={`Pose ${direction}`}
        className="w-12 h-12 rounded-full  border border-gray-400 flex justify-center items-center cursor-pointer"
        onClick={() => onClick?.(direction)}
      >
        <PersonStanding className="size-6 stroke-1 stroke-gray-400" />
      </div>
      <span className="text-xs text-gray-400 capitalize">{direction}</span>
    </div>
  );
}
