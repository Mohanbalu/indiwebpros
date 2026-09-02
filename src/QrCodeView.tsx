import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrIcon } from "lucide-react";

interface QrCodeViewProps {
  value: string;
  size?: number;
  includeMargin?: boolean;
  className?: string;
  showDownload?: boolean;
  label?: string;
}

export function QrCodeView({
  value,
  size = 160,
  includeMargin = true,
  className = "",
  showDownload = false,
  label,
}: QrCodeViewProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (!value) return;

    QRCode.toDataURL(value, {
      width: size * 2, // high res for sharp display
      margin: includeMargin ? 2 : 0,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        setDataUrl(url);
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
      });
  }, [value, size, includeMargin]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `certificate-qr-${encodeURIComponent(value.slice(0, 20))}.png`;
    a.click();
  };

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-slate-100 animate-pulse rounded-lg flex items-center justify-center ${className}`}
      >
        <QrIcon className="w-6 h-6 text-slate-400" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div className="p-1.5 bg-white rounded-xl shadow-xs border border-slate-200">
        <img
          src={dataUrl}
          alt={`QR Code for ${value}`}
          style={{ width: size, height: size }}
          className="rounded-lg object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      {label && <p className="text-[11px] font-mono font-medium text-slate-500">{label}</p>}
      {showDownload && (
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Download className="w-3 h-3" />
          Save QR
        </button>
      )}
    </div>
  );
}
