import React from "react";
import { Download, ZoomIn, X } from "lucide-react";

const ImagePreview = ({ src, alt = "Product image", onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl border transition-all hover:scale-110 z-10"
        >
          <X className="w-6 h-6 text-slate-800" />
        </button>

        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Toolbar */}
        <div className="flex items-center space-x-3 pt-4 px-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/90 hover:bg-white rounded-xl shadow-lg border transition-all hover:scale-105">
            <ZoomIn className="w-5 h-5" />
            <span className="font-medium text-sm">Zoom</span>
          </button>
          <a
            href={src}
            download
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-xl shadow-lg transition-all hover:from-red-500 hover:to-pink-600 hover:shadow-xl hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium text-sm">Download</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
