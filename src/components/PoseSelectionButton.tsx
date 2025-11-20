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
  selected = false,
}: {
  direction: Direction;
  onClick?: (direction: Direction) => void;
  assigned?: boolean;
  selected?: boolean;
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
      } else {
        gsap.to(`[data-role="button"]`, {
          duration: 0.3,
          rotateY: 0,
          backgroundColor: "white",
        });
        gsap.to('[data-role="icon"]', {
          stroke: "gray",
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
        className={cn(
          "w-12 h-12 rounded-full  border 0 flex justify-center items-center cursor-pointer",
          selected ? "border-primary stroke-2" : "border-gray-400"
        )}
        onClick={() => onClick?.(direction)}
      >
        <PersonStanding
          data-role="icon"
          className={cn("size-6 stroke-1 stroke-gray-400")}
        />
      </div>
      <span
        className={cn(
          "text-xs  capitalize",
          selected ? "text-primary font-semibold" : "text-gray-400"
        )}
      >
        {direction}
      </span>
    </div>
  );
}
