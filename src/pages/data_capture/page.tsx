import { useContext } from "react";
import {
  DataCaptureProvider,
  DataCaptureContext,
} from "./services/data_capture_service";
import ViewCapture from "./screens/ViewCapture";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataCapturePage() {
    const buttonStyles = "rounded-full w-30 py-2 flex justify-center items-center gap-1";
  return (
    <div className="flex flex-col gap-8">
      <ViewCapture />
      <div className="flex justify-between items-center">
        <Button className={buttonStyles}>
          <ChevronLeft /> Previous
        </Button>
        <Button className={buttonStyles}>
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
