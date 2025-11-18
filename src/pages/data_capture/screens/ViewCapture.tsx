import ImageInput from "@/components/ImageInput";
import PoseModelCanvas from "../../../components/PoseModelCanvas";
import PoseSelectionButton from "../../../components/PoseSelectionButton";
import { useState } from "react";
import PoseModel from "../../../components/PoseModel";

export default function ViewCapture() {
  const [direction, setDirection] = useState<
    "forward" | "right" | "left" | "backward"
  >("forward");
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-center text-2xl font-semibold">Patient Images</h1>
      {/** pose display section */}
      <div className="flex flex-row gap-4">
        <div className="grow w-1/2">
          <h2 className=" text-xl">Front</h2>
          <p>
            Please make sure the patient is standing upright, facing the camera
            as shown to the right
          </p>
        </div>
        <div className="grow w-1/2  h-40 rounded-lg overflow-hidden">
          <PoseModelCanvas>
            <PoseModel direction={direction} />
          </PoseModelCanvas>
        </div>
      </div>

      {/** pose capture section */}
      <div className="h-75">
        <ImageInput />
      </div>

      {/** pose selection area */}
      <div className="flex flex-row justify-center items-center gap-8">
        <PoseSelectionButton direction="forward" onClick={setDirection} />
        <PoseSelectionButton direction="right" onClick={setDirection} />
        <PoseSelectionButton direction="backward" onClick={setDirection} />
        <PoseSelectionButton direction="left" onClick={setDirection} />
      </div>
    </section>
  );
}
