import { Canvas } from "@react-three/fiber";
import {
  SpotLight,
  OrthographicCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "./CanvasLoader";

export default function PoseModelCanvas({
  children,
}: {
  children?: Readonly<React.ReactNode>;
}) {
  return (
    <Canvas>
      {/* <color attach="background" args={["#000"]} /> */}
      <OrthographicCamera makeDefault position={[0, 0, 30]} zoom={0.85} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 0, 0]} intensity={2} />
      <SpotLight intensity={8} position={[0, 0, 0]} />

      <Suspense fallback={<CanvasLoader />}>{children}</Suspense>
    </Canvas>
  );
}
