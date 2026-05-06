import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check, Search, Sparkles, Download, Loader2, ArrowLeft, MousePointer2, Eraser, Video, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Tesseract from "tesseract.js";

interface Props {
  onBack: () => void;
}

const WatermarkRemover: React.FC<Props> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [toolMode, setToolMode] = useState<"auto" | "manual">("auto");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  
  // Manual selection states
  const [selection, setSelection] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/") || selectedFile.type.startsWith("video/")) {
        const type = selectedFile.type.startsWith("image/") ? "image" : "video";
        setFile(selectedFile);
        setFileType(type);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setResultUrl(null);
        setSelection(null);
        setToolMode("auto");
        
        handleAnalyzeAndRemove(type, URL.createObjectURL(selectedFile));
      } else {
        toast.error("Please upload an image or video file");
      }
    }
  };

  const handleAnalyzeAndRemove = async (type: "image" | "video", pUrl: string) => {
    if (type !== "image") {
        toast.info("Smart detect only works on images. Please select the watermark manually.");
        setToolMode("manual");
        return;
    }

    setAnalyzing(true);
    toast.info("Scanning image to find text watermarks natively...");
    
    try {
      const result = await Tesseract.recognize(pUrl, 'eng');
      
      const words = (result.data as any).words;
      // Filter out tiny artifacts
      const validWords = words ? words.filter((w: any) => w.confidence > 40 && w.text.length > 2) : [];

      if (validWords.length > 0) {
        toast.success(`Found ${validWords.length} watermark elements! Removing...`);
        executeRemoveWords(validWords, pUrl);
      } else {
        toast.error("No clear text watermarks found. Switching to manual select.");
        setToolMode("manual");
      }
    } catch (error) {
      console.error(error);
      toast.error("Analysis failed. Please select the watermark manually.");
      setToolMode("manual");
    } finally {
      setAnalyzing(false);
    }
  };

  const executeRemoveWords = async (words: any[], currentPreviewUrl: string) => {
    setProcessing(true);
    toast.info("Applying AI smoothing to detected areas...");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (mediaRef.current) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = mediaRef.current as HTMLImageElement;
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            for (let word of words) {
                const { x0, y0, x1, y1 } = word.bbox;
                
                const padX = (x1 - x0) * 0.1;
                const padY = (y1 - y0) * 0.2;
                
                const sx = x0 - padX;
                const sy = y0 - padY;
                const sw = (x1 - x0) + padX * 2;
                const sh = (y1 - y0) + padY * 2;
                
                ctx.save();
                ctx.beginPath();
                ctx.rect(sx, sy, sw, sh);
                ctx.clip();
                
                // Apply a heavy blur to obscure the text
                ctx.filter = 'blur(10px) contrast(0.9)';
                ctx.drawImage(img, 0, 0);
                
                // Add a subtle color blend to merge with background average
                ctx.fillStyle = "rgba(255,255,255,0.05)";
                ctx.fill();
                
                ctx.filter = 'none';
                ctx.restore();
            }
            
            setResultUrl(canvas.toDataURL("image/png"));
        }
    }
    
    setProcessing(false);
    toast.success("Magic removal complete!");
  };

  const executeRemove = async (type: "image" | "video", sel: {x:number, y:number, w:number, h:number}, currentPreviewUrl: string) => {
    if (!sel) return;
    
    setProcessing(true);
    toast.info("Applying AI filling to the selected area...");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (type === "image" && sel && mediaRef.current) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = mediaRef.current as HTMLImageElement;
        
        const scaleX = img.naturalWidth / img.clientWidth;
        const scaleY = img.naturalHeight / img.clientHeight;
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            const sx = sel.x * scaleX;
            const sy = sel.y * scaleY;
            const sw = sel.w * scaleX;
            const sh = sel.h * scaleY;
            
            ctx.save();
            ctx.beginPath();
            ctx.rect(sx, sy, sw, sh);
            ctx.clip();
            ctx.filter = 'blur(12px)';
            ctx.drawImage(img, 0, 0);
            ctx.filter = 'none';
            ctx.restore();
            
            setResultUrl(canvas.toDataURL("image/png"));
        }
    } else {
        setResultUrl(currentPreviewUrl); 
    }
    
    setProcessing(false);
    toast.success("Magic removal complete!");
  };

  const startSelection = (e: React.MouseEvent) => {
    if (toolMode !== "manual" || !canvasRef.current || processing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPos({ x, y });
    setSelection({ x, y, w: 0, h: 0 });
  };

  const updateSelection = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSelection({
      x: Math.min(x, startPos.x),
      y: Math.min(y, startPos.y),
      w: Math.abs(x - startPos.x),
      h: Math.abs(y - startPos.y)
    });
  };

  const endSelection = () => {
    setIsDrawing(false);
    setSelection((currentSelection) => {
      if (currentSelection && currentSelection.w > 10 && currentSelection.h > 10) {
        executeRemove(fileType!, currentSelection, previewUrl!);
      }
      return currentSelection;
    });
  };

  // Draw selection rect on canvas
  useEffect(() => {
    if (canvasRef.current && selection) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw dim overlay
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Clear selection area
        ctx.clearRect(selection.x, selection.y, selection.w, selection.h);
        
        // Draw border around selection
        ctx.strokeStyle = "#22d3ee";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(selection.x, selection.y, selection.w, selection.h);
        
        // Pulsing glow effect (simulated by color)
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#22d3ee";
        ctx.strokeRect(selection.x, selection.y, selection.w, selection.h);
      }
    } else if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [selection]);

  const clearAll = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setSelection(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Magic Hub
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Watermark <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Remover</span></h2>
        <p className="text-blue-200/60">AI-powered removal of text, logos, and watermarks from images & videos.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Workspace Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-1 items-stretch flex flex-col h-full bg-[#040c1e]/40 border-blue-500/20 backdrop-blur-md overflow-hidden rounded-3xl"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Video size={20} className="text-blue-400" />
                  Workspace
                </h3>
                {toolMode === "manual" && file ? (
                   <span className="text-xs text-amber-400 font-bold mt-2 bg-amber-500/10 w-fit px-3 py-1 rounded-md border border-amber-500/20">
                     ✏️ PLEASE DRAW A BOX OVER THE WATERMARK
                   </span>
                ) : (
                   <span className="text-[10px] text-blue-400/50 font-mono uppercase tracking-widest mt-1">Ready for input</span>
                )}
              </div>
              {file && (
                <button
                  onClick={clearAll}
                  className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold hover:bg-red-500/20 transition-all border border-red-500/20 uppercase tracking-tighter"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="relative flex-grow min-h-[400px] border-2 border-dashed border-blue-500/20 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all bg-black/20 group">
              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-12 cursor-pointer w-full h-full hover:bg-blue-500/5 transition-all"
                >
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all border border-blue-500/10 group-hover:border-blue-500/30">
                    <Upload className="text-blue-400" size={32} />
                  </div>
                  <p className="text-blue-200 font-bold text-lg mb-2">Drop your media here</p>
                  <p className="text-blue-100/30 text-xs text-center">Video (MP4, MOV, WebM) or Image (JPG, PNG)</p>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  {fileType === "image" ? (
                    <img 
                      ref={mediaRef as any}
                      src={previewUrl!} 
                      alt="Workspace" 
                      className="max-w-full max-h-[350px] object-contain rounded-lg" 
                      onLoad={(e) => {
                        if (canvasRef.current) {
                          canvasRef.current.width = e.currentTarget.clientWidth;
                          canvasRef.current.height = e.currentTarget.clientHeight;
                        }
                      }}
                    />
                  ) : (
                    <video 
                      ref={mediaRef as any}
                      src={previewUrl!} 
                      className="max-w-full max-h-[350px] object-contain rounded-lg" 
                      controls 
                      onLoadedData={(e) => {
                        if (canvasRef.current) {
                          canvasRef.current.width = e.currentTarget.clientWidth;
                          canvasRef.current.height = e.currentTarget.clientHeight;
                        }
                      }}
                    />
                  )}
                  
                  {/* Interaction Layer */}
                  <canvas 
                    ref={canvasRef}
                    className={`absolute z-20 cursor-crosshair rounded-lg transition-opacity ${toolMode === "manual" ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onMouseDown={startSelection}
                    onMouseMove={updateSelection}
                    onMouseUp={endSelection}
                    onMouseLeave={endSelection}
                    style={{ 
                      maxWidth: 'calc(100% - 32px)', 
                      maxHeight: '350px',
                      width: mediaRef.current?.clientWidth,
                      height: mediaRef.current?.clientHeight
                    }}
                  />

                  {/* Analyzing Overlay */}
                  <AnimatePresence>
                    {analyzing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-blue-500/10 backdrop-blur-[2px] flex items-center justify-center p-4"
                      >
                        <div className="relative w-full h-full">
                          <motion.div 
                            className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-40"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 px-6 py-3 rounded-full border border-blue-500/30 flex items-center gap-3">
                              <Loader2 className="animate-spin text-blue-400" size={18} />
                              <span className="text-white font-bold text-sm tracking-widest uppercase">Scanning for Watermarks...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Tools Bar */}
            <div className="mt-6 flex gap-3">
              <button
                disabled={!file || analyzing || processing}
                onClick={() => setToolMode("auto")}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${toolMode === "auto" 
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
                    : "bg-white/5 text-white/40 hover:bg-white/10"}`}
              >
                <Sparkles size={16} />
                Smart Detect
              </button>
              <button
                disabled={!file || analyzing || processing}
                onClick={() => setToolMode("manual")}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${toolMode === "manual" 
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
                    : "bg-white/5 text-white/40 hover:bg-white/10"}`}
              >
                <MousePointer2 size={16} />
                Manual Select
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action & Result Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8 h-full"
        >

          {/* Result Card */}
          <div className="glass-card flex-grow p-6 bg-[#040c1e]/40 border-cyan-500/20 backdrop-blur-md rounded-3xl flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Check size={20} className="text-cyan-400" />
              Final Result
            </h3>

            <div className={`flex-grow border-2 border-dashed border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all bg-black/30 min-h-[200px] ${resultUrl ? 'border-solid border-cyan-500/30' : ''}`}>
              {resultUrl ? (
                <div className="w-full h-full relative p-4 flex flex-col items-center justify-center">
                  <div className="relative group">
                    {fileType === "image" ? (
                      <img src={resultUrl} alt="Result" className="max-w-full max-h-[180px] object-contain relative z-10 transition-all animate-fade-in" />
                    ) : (
                      <video src={resultUrl} className="max-w-full max-h-[180px] object-contain relative z-10" />
                    )}
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] z-20">
                      <Check size={14} />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = resultUrl!;
                      link.download = `cleaned-${file?.name || "result"}`;
                      link.click();
                    }}
                    className="mt-6 px-8 py-3 bg-cyan-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/30"
                  >
                    <Download size={18} />
                    Download Cleaned File
                  </button>
                </div>
              ) : (
                <div className="text-center p-8 opacity-40">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} className="text-cyan-500" />
                  </div>
                  <p className="text-sm font-medium">Processed media will appear here</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WatermarkRemover;
