import MetadataForm from "../components/MetadataForm";
import { useContext, useRef } from "react";
import { DataCaptureContext } from "../services/data_capture_service";
import { PersonStanding } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function MetadataScreen() {
  const { data } = useContext(DataCaptureContext);
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-center text-2xl font-semibold">Metadata</h1>
      <MetadataForm />
      <div>
        <h3 className="mb-4 text-xl font-semibold">Image Preview</h3>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
          <ImagePreviewGridItem
            direction={"forward"}
            src={data["forward"] ?? undefined}
          />
          <ImagePreviewGridItem
            direction={"right"}
            src={data["right"] ?? undefined}
          />
          <ImagePreviewGridItem
            direction={"backward"}
            src={data["backward"] ?? undefined}
          />
          <ImagePreviewGridItem
            direction={"left"}
            src={data["left"] ?? undefined}
          />
        </div>
      </div>
    </section>
  );
}

function ImagePreviewGridItem({
  src,
  direction,
}: {
  src: string | undefined;
  direction: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            xPercent: ["left", "right"].includes(direction) ? 100 : -100,
          },
          {
            opacity: 1,
            xPercent: 0,
            duration: 0.3,
            delay:
              direction === "forward"
                ? 0
                : direction === "left"
                ? 0.1
                : direction === "right"
                ? 0.2
                : 0.3,
          }
        );
      }
    },
    { dependencies: [direction] }
  );

  return (
    <div
      ref={ref}
      className="rounded-lg overflow-hidden border-gray-400 border relative"
    >
      <div className="w-full h-full absolute left-0 top-0 bg-black/20 p-2">
        <p className="text-white">{direction}</p>
      </div>
      {src ? (
        <img
          src={src ?? undefined}
          alt={`${direction} pose`}
          className="w-full  object-cover aspect-square"
        />
      ) : (
        <div className="w-full aspect-square flex justify-center items-center">
          <PersonStanding className="size-12" />
        </div>
      )}
    </div>
  );
}
