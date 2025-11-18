import { useGSAP } from "@gsap/react";
import { Camera, LucideCamera, X, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "./ui/button";

export default function ImageInput({ name }: { name?: string }) {
  const inputRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamingRef = useRef<boolean>(false);
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  // styles for video buttons
  const buttonStyles = "flex items-center justify-center size-10 rounded-full";

  useEffect(() => {
    videoRef.current?.addEventListener("canplay", () => {
      if (!streamingRef.current && videoRef.current && canvasRef.current) {
        canvasRef.current!.width = videoRef.current!.videoWidth;
        canvasRef.current!.height = videoRef.current!.videoHeight;
        streamingRef.current = true;
      }
    });
  }, []);

  // take picture
  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      canvasRef.current
        .getContext("2d")!
        .drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

      const data = canvasRef.current.toDataURL("image/png");
      setValue(data);
    }
  };

  useGSAP(
    () => {
      animationRef.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () => {
            gsap.set(inputRef.current, { clearProps: "all" });
            videoRef.current!.srcObject = null;
          },
          onComplete: () => {
            navigator.mediaDevices
              .getUserMedia({
                video: {
                  facingMode: "user",
                },
              })
              .then((stream) => {
                videoRef.current!.srcObject = stream;
                videoRef.current!.play();
              })
              .catch((error) => {
                console.log(error);
                setError(error.message);
              });
          },
        })
        .set(inputRef.current, {
          position: "fixed",
        })
        .to(inputRef.current, {
          ease: "power2.out",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          duration: 0.3,
        })
        .to(
          "#image-input-placeholder",
          {
            opacity: 0,
          },
          "-=0.2"
        )
        .to(
          "#image-input-video",
          {
            opacity: 1,
          },
          "<"
        );

      return () => {
        animationRef.current?.kill();
      };
    },
    { scope: inputRef, dependencies: [] }
  );

  const handleAnimate = (forward = true) => {
    if (forward) animationRef.current?.play();
    else animationRef.current?.reverse();
  };
  return (
    <div
      className="w-full h-full  cursor-pointer relative"
      onClick={(e) => {
        handleAnimate();
        e.stopPropagation();
      }}
      ref={inputRef}
    >
      {value ? (
        <img src={value} className="w-full h-full rounded-lg" />
      ) : (
        <div
          id="image-input-placeholder"
          className="bg-gray-200 flex flex-col justify-center items-center rounded-lg text-gray-600 w-full h-full absolute left-0 top-0 "
        >
          <LucideCamera className="size-19 stroke-1" />
          <div className="text-2xl ">Camera</div>
        </div>
      )}
      <div
        id="image-input-video"
        className=" absolute left-0 top-0 z-20 w-full h-full opacity-0 bg-black"
      >
        <video ref={videoRef} className="w-full h-full object-cover"></video>
        <div className="flex flex-col justify-between w-full h-full absolute left-0 top-0">
          <div className="w-full pt-4 pe-4 flex justify-end ">
            <Button
              variant="secondary"
              className={buttonStyles}
              onClick={(e) => {
                handleAnimate(false);
                e.stopPropagation();
              }}
            >
              <X className="size-6 stroke-primary stroke-1" />
            </Button>
          </div>
          <div className="w-full pb-4 flex justify-center">
            <Button
              variant="secondary"
              className={buttonStyles}
              onClick={(e) => {
                takePicture();
                handleAnimate(false);
                e.stopPropagation();
              }}
            >
              <Camera className="size-8 stroke-1" />
            </Button>
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
}
