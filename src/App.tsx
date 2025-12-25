import Navbar from "./components/Navbar";
import DataCapturePage from "./pages/data_capture/page";
import { DataCaptureProvider } from "./pages/data_capture/services/data_capture_service";

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
