"use client";

import Link from "next/link";
import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { useLang } from "@/feature/i18n/LangContext";
import { useTheme } from "@/feature/theme/ThemeContext";

// Helper function to format bytes
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

interface CompressUiProps {
  fileType?: "png" | "jpg";
}

export function CompressUi({ fileType = "png" }: CompressUiProps) {
  const { t } = useLang();
  const { resolvedTheme } = useTheme();
  const [compressionPercent, setCompressionPercent] = useState<number>(75);
  const [compressionMethod, setCompressionMethod] = useState<"quality" | "dimension" | "both">(
    fileType === "png" ? "dimension" : "quality"
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [compressedUrl]);

  const handleFile = (selectedFile: File) => {
    const expectedMime = fileType === "png" ? "image/png" : "image/jpeg";
    if (selectedFile && (selectedFile.type === expectedMime || (fileType === "jpg" && selectedFile.type === "image/jpg"))) {
      setFile(selectedFile);
      setCompressedBlob(null);
      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl);
        setCompressedUrl(null);
      }
      const url = URL.createObjectURL(selectedFile);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(url);
    } else {
      alert(t("compress.error.select", { fileType: fileType.toUpperCase() }));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setCompressedBlob(null);
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
      setCompressedUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const compressImage = async () => {
    if (!file || !previewUrl || !compressionPercent) return;
    
    setIsCompressing(true);
    setCompressedBlob(null);
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
      setCompressedUrl(null);
    }

    try {
      const img = new window.Image();
      img.src = previewUrl;
      
      await new Promise((resolve, reject) => { 
        img.onload = resolve; 
        img.onerror = reject;
      });

      const useDimension = compressionMethod === "dimension" || compressionMethod === "both";
      const useQuality = compressionMethod === "quality" || compressionMethod === "both";
      
      const scale = useDimension ? Math.sqrt(compressionPercent / 100) : 1;
      const width = Math.max(1, Math.floor(img.width * scale));
      const height = Math.max(1, Math.floor(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
      }

      const mimeType = fileType === "png" ? "image/png" : "image/jpeg";
      const qualityParam = (fileType === "jpg" && useQuality) ? Math.max(0.01, compressionPercent / 100) : undefined;

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCompressedBlob(blob);
          setCompressedUrl(url);
        }
        setIsCompressing(false);
      }, mimeType, qualityParam);

    } catch (error) {
      console.error("Compression failed:", error);
      alert(t("compress.error.failed"));
      setIsCompressing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col py-16 px-6 min-h-screen font-sans">
      
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors mb-6 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t("compress.back")}
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t("compress.title")}</span> {fileType.toUpperCase()}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
          {t("compress.desc", { fileType: fileType.toUpperCase() })}
        </p>
      </div>

      <div className="flex flex-col gap-10">
        
        {/* 1. Upload Zone */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">{t("compress.file.label")}</label>
            {file && (
              <button onClick={removeFile} className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                {t("compress.file.remove")}
              </button>
            )}
          </div>

          {!file ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full min-h-[180px] flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer group ${
                isDragging 
                  ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]" 
                  : "border-zinc-300 dark:border-zinc-800 hover:border-emerald-500/50 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                <span className="text-emerald-400">{t("compress.file.upload.click")}</span>{t("compress.file.upload.drag")}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-600">{t("compress.file.limit", { fileType: fileType.toUpperCase() })}</p>
            </div>
          ) : (
            <div className="w-full flex items-center gap-5 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white/30 dark:bg-zinc-900/30">
              {previewUrl && (
                <div className="w-14 h-14 rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-950">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate" title={file.name}>
                  {file.name}
                </span>
                <span className="text-xs font-medium text-zinc-400 mt-0.5">{formatBytes(file.size)}</span>
              </div>
            </div>
          )}
          <input 
            type="file" 
            style={{ display: "none" }}
            accept={fileType === "png" ? "image/png" : "image/jpeg,image/jpg"} 
            ref={fileInputRef}
            onChange={handleFileInput}
          />
        </section>

        {/* 2. Compression Method (JPG Only) */}
        {fileType === "jpg" && (
          <section className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide px-1">{t("compress.method.label")}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setCompressionMethod("quality")}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                  compressionMethod === "quality" 
                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                <span className={`text-sm font-bold mb-1 ${compressionMethod === "quality" ? "text-emerald-500 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-200"}`}>{t("compress.method.q.title")}</span>
                <span className="text-xs text-zinc-500 leading-relaxed">{t("compress.method.q.desc")}</span>
              </button>
              
              <button
                onClick={() => setCompressionMethod("dimension")}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                  compressionMethod === "dimension" 
                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                <span className={`text-sm font-bold mb-1 ${compressionMethod === "dimension" ? "text-emerald-500 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-200"}`}>{t("compress.method.d.title")}</span>
                <span className="text-xs text-zinc-500 leading-relaxed">{t("compress.method.d.desc")}</span>
              </button>

              <button
                onClick={() => setCompressionMethod("both")}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                  compressionMethod === "both" 
                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                <span className={`text-sm font-bold mb-1 ${compressionMethod === "both" ? "text-emerald-500 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-200"}`}>{t("compress.method.b.title")}</span>
                <span className="text-xs text-zinc-500 leading-relaxed">{t("compress.method.b.desc")}</span>
              </button>
            </div>
          </section>
        )}

        {/* 3. Quality Selector */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between px-1">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">{t("compress.level.label")}</label>
            <div className="flex items-center gap-3">
              {file && (
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                  {t("compress.level.est")} <strong className="text-emerald-400 ml-1">~{formatBytes(file.size * (compressionPercent / 100))}</strong>
                </span>
              )}
              <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 font-bold text-sm rounded-full border border-emerald-500/30 shadow-inner">
                {compressionPercent}%
              </span>
            </div>
          </div>

          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 w-full shadow-sm">
            <button 
              onClick={() => setCompressionPercent(75)}
              className={`flex-1 px-4 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                compressionPercent === 75
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t("compress.level.high")}
            </button>
            <button 
              onClick={() => setCompressionPercent(50)}
              className={`flex-1 px-4 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                compressionPercent === 50
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t("compress.level.med")}
            </button>
            <button 
              onClick={() => setCompressionPercent(25)}
              className={`flex-1 px-4 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                compressionPercent === 25
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t("compress.level.low")}
            </button>
          </div>

          <div className="flex flex-col bg-zinc-100/40 dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-inner">
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={compressionPercent} 
              onChange={(e) => setCompressionPercent(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              style={{
                background: `linear-gradient(to right, #10b981 ${compressionPercent}%, ${resolvedTheme === "dark" ? "#27272a" : "#e4e4e7"} ${compressionPercent}%)`
              }}
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-4 font-medium px-1">
              <span>{t("compress.level.small")}</span>
              <span>{t("compress.level.quality")}</span>
            </div>
          </div>
        </section>

        {/* 3. Action Area */}
        <section className="pt-8 mt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
          {!compressedUrl ? (
            <button 
              onClick={compressImage}
              className={`group relative w-full sm:w-auto inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-8 font-medium text-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 ${
                file && compressionPercent && !isCompressing
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]" 
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
              }`}
              disabled={!file || !compressionPercent || isCompressing}
            >
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                {isCompressing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("compress.btn.compressing")}
                  </>
                ) : (
                  <>
                    {t("compress.btn.compress")}
                    {file && compressionPercent && (
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </>
                )}
              </span>
              {file && compressionPercent && !isCompressing && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              )}
            </button>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-emerald-400 mb-0.5">{t("compress.btn.complete")}</span>
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {t("compress.btn.reduced")}<span className="line-through opacity-70">{formatBytes(file?.size || 0)}</span>{t("compress.btn.to")}<strong className="text-zinc-800 dark:text-zinc-200 ml-1">{formatBytes(compressedBlob?.size || 0)}</strong>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href={compressedUrl}
                  download={`compressed_${file?.name || `image.${fileType}`}`}
                  className="group relative w-full sm:w-auto inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-8 font-medium text-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t("compress.btn.download", { fileType: fileType.toUpperCase() })}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </a>
                
                <button 
                  onClick={compressImage}
                  className="w-full sm:w-auto h-14 px-8 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t("compress.btn.recompress")}
                </button>

                <button 
                  onClick={removeFile}
                  className="w-full sm:w-auto h-14 px-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-white font-semibold rounded-full transition-colors flex items-center justify-center"
                >
                  {t("compress.btn.startover")}
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
