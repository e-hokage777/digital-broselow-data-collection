import { useContext } from "react";
import {
  DataCaptureProvider,
  DataCaptureContext,
} from "./services/data_capture_service";
import ViewCapture from "./screens/ViewCapture";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MetadataScreen from "./screens/Metadata";

export default function DataCapturePage() {
  const { currentPage, nextPage, prevPage } = useContext(DataCaptureContext);
  const buttonStyles =
    "rounded-full w-30 py-2 flex justify-center items-center gap-1";
  return (
    <div className="flex flex-col gap-8">
      {currentPage === 0 && <ViewCapture />}
      {currentPage === 1 && <MetadataScreen />}
      <div className="flex justify-between items-center">
        <Button className={buttonStyles} onClick={prevPage}>
          <ChevronLeft /> Previous
        </Button>
        <Button className={buttonStyles} onClick={nextPage}>
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
