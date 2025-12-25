import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext } from "react";
import MetadataScreen from "./screens/Metadata";
import ViewCapture from "./screens/ViewCapture";
import {
  DataCaptureContext
} from "./services/data_capture_service";

export default function DataCapturePage() {
  const { currentPage, nextPage, prevPage } =
    useContext(DataCaptureContext);
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
        {currentPage !== 1 ? (
          <Button className={buttonStyles} onClick={nextPage} type="button">
            Next <ChevronRight />
          </Button>
        ) : (
          <Button
            className={buttonStyles}
            type="submit"
            form="metadata-form"
           
          >
            Submit <Check />
          </Button>
        )}
      </div>
    </div>
  );
}
