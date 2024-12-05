import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const CameraComponent = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useImperativeHandle(ref, () => ({
    capture: () => {
      if (!canvasRef.current || !videoRef.current) return null;

      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Return the captured image as a data URL
      return canvas.toDataURL("image/png");
    },
  }));

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    openCamera();

    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "auto", border: "1px solid black" }}
      />
      {/* Hidden canvas for capturing images */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
});

export default CameraComponent;
