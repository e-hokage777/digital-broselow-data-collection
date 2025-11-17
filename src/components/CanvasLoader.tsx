import { Html } from "@react-three/drei";

export default function CanvasLoader(){
    return <Html as="div" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }}>
        Loading
    </Html>
}