import Navbar from "./components/Navbar";
import ViewCapture from "@/pages/data_capture/screens/ViewCapture";
import { DataCaptureProvider } from "./pages/data_capture/services/data_capture_service";
import DataCapturePage from "./pages/data_capture/page";

export default function App() {
  return (
    <main className="max-w-md mx-auto bg-gray-50 min-h-screen relative">
      <Navbar />
      <div className="p-4">
        {/* <ViewCapture/> */}
        <DataCaptureProvider>
          <DataCapturePage />
        </DataCaptureProvider>
      </div>
    </main>
  );
}
