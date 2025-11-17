import { useFBX, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const directionMap = {
  forward: 0,
  right: -Math.PI / 2,
  left: -3 * (Math.PI / 2),
  backward: -Math.PI,
};

const crossFade = (
  from: THREE.AnimationAction | null,
  to: THREE.AnimationAction | null,
  duration = 0.3
) => {
  if (!from || !to) return;
  to.setEffectiveWeight(1);
  from.setEffectiveWeight(1);
  to.reset();
  from.crossFadeTo(to, duration).play();
  to.play();
  from.play();
};

export default function PoseModel({
  direction,
}: {
  direction: "forward" | "right" | "left" | "backward";
}) {
  const modelRef = useRef<THREE.Object3D>(null);

  // Load model + animations
  const model = useFBX("/models/ybot-standing-idle.fbx");

  const idle = useFBX("/models/ybot-standing-idle.fbx").animations[0];
  idle.name = "idle";

  const rightTurn = useFBX("/models/right-turn-90.fbx").animations[0];
  rightTurn.name = "rightTurn";

  const leftTurn = useFBX("/models/left-turn-90.fbx").animations[0];
  leftTurn.name = "leftTurn";

  const { actions, mixer } = useAnimations(
    [idle, rightTurn, leftTurn],
    modelRef
  );

  const rotationRef = useRef(0); // keep rotation persistent
  const playCountRef = useRef(0);
  const clockWiseRef = useRef(1); // 1 for anti and -1 for clock

  // Setup mixer "finished" once
  useEffect(() => {
    const onLoop = (e: THREE.Event) => {
      const action = (e as any).action as THREE.AnimationAction;
      const clipName = action.getClip().name;

      if (clipName == "idle") {;
        return;
      }

      if (playCountRef.current > 0) {
        if (modelRef.current) {
          modelRef.current.rotation.y = modelRef.current.rotation.y+(Math.PI / 2) * clockWiseRef.current;
        }
        playCountRef.current -= 1;
      } else {
        actions[clipName]
          ?.setLoop(THREE.LoopOnce, 1)
          ?.crossFadeTo(actions.idle!, 0.3)
          .play();
        if (modelRef.current) {
          modelRef.current.rotation.y =
            modelRef.current.rotation.y + (Math.PI / 2) * clockWiseRef.current;
        }
      }
    };
    
    mixer.timeScale = 2
    mixer.addEventListener("loop", onLoop);

    return () => {
      mixer.removeEventListener("loop", onLoop);
    };
  }, [mixer, actions]);

  // Handle direction changes
  useEffect(() => {
    const targetRotation = directionMap[direction];
    const diff = targetRotation - modelRef.current!.rotation.y;

    if (diff === 0) {
      actions.idle?.play();
      return;
    }

    const steps = Math.abs(diff) / (Math.PI / 2);
    playCountRef.current = steps - 1;
    rotationRef.current = targetRotation;
    if (diff > 0) {
      actions.leftTurn!.setLoop(THREE.LoopRepeat, steps + 1);
      actions.leftTurn!.play();
      clockWiseRef.current = 1;
    } else {
      actions.rightTurn!.setLoop(THREE.LoopRepeat, steps + 1);
      actions.rightTurn!.play();
      clockWiseRef.current = -1;
    }
  }, [direction, actions]);

  return (
    <primitive
      ref={modelRef}
      object={model}
      dispose={null}
      rotation={[0, 0, 0]}
      position={[0, -90, 0]}
    />
  );
}
