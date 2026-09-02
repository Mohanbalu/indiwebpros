import React, { useEffect, useRef, useState } from "react";
import { X, Camera, Upload, AlertCircle, RefreshCw, CheckCircle2, Sparkles } from "lucide-react";
import jsQR from "jsqr";
import { parseQRContent, CERTIFICATES } from "../../lib/certificates";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (certId: string) => void;
}

export function QrScannerModal({ isOpen, onClose, onScanSuccess }: { isOpen: boolean; onClose: () => void; onScanSuccess: (id: string) => void }) {
  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [manualError, setManualError] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCameraError(null);
      setManualError("");
      return;
    }

    if (mode === "camera") {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, mode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    setScanning(true);

    try {
      // Try facingMode: environment first for mobile rear camera
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setCameraActive(true);
        requestAnimationFrame(tick);
      }
    } catch (err: any) {
      console.warn("Camera access failed:", err);
      setCameraError(
        err?.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access in your browser or upload an image."
          : "Could not access camera. Please test with QR Image Upload or Sample IDs below."
      );
      setCameraActive(false);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const tick = () => {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(tick);
      return;
    }

    const video = videoRef.current;
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvasRef.current = canvas;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data) {
        const foundCertId = parseQRContent(code.data);
        if (foundCertId) {
          stopCamera();
          onScanSuccess(foundCertId);
          return;
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          const parsedId = parseQRContent(code.data);
          onScanSuccess(parsedId);
        } else {
          setCameraError("No valid QR code found in this image. Please ensure the QR is clear and well-lit.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) {
      setManualError("Please enter a Certificate or Intern ID");
      return;
    }
    const clean = parseQRContent(manualInput.trim());
    onScanSuccess(clean);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Scan Certificate QR</h3>
              <p className="text-xs text-cyan-100">Live Camera & Image QR Scanner</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            onClick={() => setMode("camera")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              mode === "camera"
                ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Live Camera
          </button>
          <button
            onClick={() => {
              stopCamera();
              setMode("upload");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              mode === "upload"
                ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload QR Image
          </button>
        </div>

        {/* Body Area */}
        <div className="p-6">
          {mode === "camera" ? (
            <div>
              <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner border-2 border-slate-800">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                
                {/* Visual Target Frame */}
                {cameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-52 h-52 border-2 border-cyan-400/90 rounded-2xl relative animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      {/* Corner Accents */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" />
                      
                      {/* Laser scanning line */}
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce" />
                    </div>
                  </div>
                )}

                {cameraError && (
                  <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center text-slate-200">
                    <AlertCircle className="w-10 h-10 text-amber-400 mb-2" />
                    <p className="text-xs text-slate-300 mb-4">{cameraError}</p>
                    <button
                      onClick={startCamera}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retry Camera
                    </button>
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">
                Point your camera directly at the QR code on the certificate.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square max-w-[300px] mx-auto border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/40 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                  <Upload className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-800">Click or Drag & Drop QR Image</p>
                <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, WEBP, Screenshots</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Quick Demo Certificate IDs */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Instant One-Click Demo Verification:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  stopCamera();
                  onScanSuccess("IWP-STU-2026-0081");
                }}
                className="group flex-1 min-w-[200px] flex items-center justify-between p-2.5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 hover:border-cyan-400 rounded-xl text-left transition-all active:scale-[0.98]"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-800">
                    Jaswanth Murari (2nd Image)
                  </div>
                  <div className="text-[10px] font-mono text-cyan-700">ID: IWP-STU-2026-0081</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              </button>

              <button
                onClick={() => {
                  stopCamera();
                  onScanSuccess("SMI85586");
                }}
                className="flex-1 min-w-[140px] flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-left transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-800">Gundala Meghan</div>
                  <div className="text-[10px] font-mono text-slate-500">ID: SMI85586</div>
                </div>
              </button>
            </div>
          </div>

          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => {
                  setManualInput(e.target.value);
                  setManualError("");
                }}
                placeholder="Or enter Certificate ID (e.g. IWP-STU-2026-0081)"
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
              >
                Verify
              </button>
            </div>
            {manualError && <p className="text-[11px] text-red-500 mt-1">{manualError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
