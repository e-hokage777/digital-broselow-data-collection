import MetadataForm from "../components/MetadataForm";
import { useContext } from "react";
import { DataCaptureContext } from "../services/data_capture_service";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonStanding } from "lucide-react";

export default function MetadataScreen() {
  const { data } = useContext(DataCaptureContext);
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-center text-2xl font-semibold">Metadata</h1>
      <MetadataForm />
      <div>
        <h3 className="mb-4 text-xl font-semibold">Image Preview</h3>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
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
  return (
    <div className="rounded-lg overflow-hidden border-gray-400 border relative">
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
