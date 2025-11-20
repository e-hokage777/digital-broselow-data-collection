import ImageInput from "@/components/ImageInput";
import PoseModelCanvas from "../../../components/PoseModelCanvas";
import PoseSelectionButton from "../../../components/PoseSelectionButton";
import { useState, useContext } from "react";
import PoseModel from "../../../components/PoseModel";
import { DataCaptureContext } from "../services/data_capture_service";

export default function ViewCapture() {
  const [direction, setDirection] = useState<
    "forward" | "right" | "left" | "backward"
  >("forward");
  const { setData, data } = useContext(DataCaptureContext);

  const getInstructions = () => {
    switch (direction) {
      case "forward":
        return "Please make sure the patient is standing upright, facing the camera as shown to the right";
      case "right":
        return "Please make sure the patient is turned towards the right as shown";
      case "left":
        return "Please make sure the patient is turned toward the left as shown";
      case "backward":
        return "Please make sure the patient is standing upright, with their back facing the screen as shown";
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-center text-2xl font-semibold">Patient Images</h1>
      {/** pose display section */}
      <div className="flex flex-row gap-4">
        <div className="grow w-1/2">
          <h2 className=" text-xl capitalize text-primary">{direction}</h2>
          <p>{getInstructions()}</p>
        </div>
        <div className="grow w-1/2  h-40 rounded-lg overflow-hidden">
          <PoseModelCanvas>
            <PoseModel direction={direction} />
          </PoseModelCanvas>
        </div>
      </div>

      {/** pose capture section */}
      <div className="h-75">
        <ImageInput
          value={data[direction] ?? undefined}
          onCapture={(imageDataUrl) => {
            setData({
              ...data,
              [direction]: imageDataUrl,
            });
          }}
        />
      </div>

      {/** pose selection area */}
      <div className="flex flex-row justify-center items-center gap-8">
        <PoseSelectionButton
          selected={direction === "forward"}
          direction="forward"
          onClick={setDirection}
          assigned={!!data["forward"]}
        />
        <PoseSelectionButton
          selected={direction === "right"}
          direction="right"
          onClick={setDirection}
          assigned={!!data["right"]}
        />
        <PoseSelectionButton
          selected={direction === "backward"}
          direction="backward"
          onClick={setDirection}
          assigned={!!data["backward"]}
        />
        <PoseSelectionButton
          selected={direction === "left"}
          direction="left"
          onClick={setDirection}
          assigned={!!data["left"]}
        />
      </div>
    </section>
  );
}
