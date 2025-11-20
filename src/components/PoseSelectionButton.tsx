import { PersonStanding } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type Direction = "forward" | "backward" | "left" | "right";

export default function PoseSelectionButton({
  direction,
  onClick,
  assigned = false,
}: {
  direction: Direction;
  onClick?: (direction: Direction) => void;
  assigned?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (assigned) {
        gsap.to(`[data-role="button"]`, {
          duration: 0.3,
          rotateY: 360,
          backgroundColor: "green",
        });

        gsap.to('[data-role="icon"]', {
          stroke: "white",
          duration: 0.3,
        });
      }
    },
    { dependencies: [assigned], scope: ref }
  );

  return (
    <div className="flex flex-col gap-2 items-center" ref={ref}>
      <div
        data-role="button"
        role="button"
        aria-label={`Pose ${direction}`}
        className="w-12 h-12 rounded-full  border border-gray-400 flex justify-center items-center cursor-pointer"
        onClick={() => onClick?.(direction)}
      >
        <PersonStanding
          data-role="icon"
          className={cn("size-6 stroke-1 stroke-gray-400")}
        />
      </div>
      <span className="text-xs text-gray-400 capitalize">{direction}</span>
    </div>
  );
}
