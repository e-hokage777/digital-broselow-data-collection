import { useContext } from "react";
import { DataCaptureProvider, DataCaptureContext } from "./services/data_capture_service";
import ViewCapture from "./screens/ViewCapture";

export default function DataCapturePage(){
    return (
        <div className="flex flex-col gap-4">
            <ViewCapture/>
            <div className="flex justify-between items-center">
                {/* <Button></Button> */}
            </div>
        </div>
    )
}