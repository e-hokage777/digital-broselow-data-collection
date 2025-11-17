
import Navbar from "./components/Navbar";
import ViewCapture from "@/components/ViewCapture";

export default function App() {
  return (
    <main className="max-w-md mx-auto bg-gray-50">
      <Navbar />
      <div className="p-4">
        <ViewCapture/>
      </div>
    </main>
  );
}
