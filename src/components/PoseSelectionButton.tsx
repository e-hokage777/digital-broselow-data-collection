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
    <div
      role="button"
      aria-label={`Pose ${direction}`}
      className="w-15 h-15 rounded-full  border border-gray-400 flex justify-center items-center cursor-pointer"
      onClick={() => onClick?.(direction)}
    >
      <PersonStanding className="size-8 stroke-1 stroke-gray-400" />
    </div>
  );
}
