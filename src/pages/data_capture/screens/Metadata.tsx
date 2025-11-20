import MetadataForm from "../components/MetadataForm";
import { useContext } from "react";
import { DataCaptureContext } from "../services/data_capture_service";

export default function MetadataScreen() {
  const { data } = useContext(DataCaptureContext);
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-center text-2xl font-semibold">Metadata</h1>
      <MetadataForm />
      <div>
        <h3 className="mb-4 text-xl font-semibold">Image Preview</h3>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <ImagePreviewGridItem src={data["forward"] ?? undefined} />
          <ImagePreviewGridItem src={data["right"] ?? undefined} />
          <ImagePreviewGridItem src={data["backward"] ?? undefined} />
          <ImagePreviewGridItem src={data["left"] ?? undefined} />
        </div>
      </div>
    </section>
  );
}

function ImagePreviewGridItem({ src }: { src: string | undefined }) {
  return (
    <div className="rounded-lg overflow-hidden border-gray-400 border">
      <img
        src={src ?? undefined}
        alt="front image"
        className="w-full  object-cover aspect-square"
      />
    </div>
  );
}
