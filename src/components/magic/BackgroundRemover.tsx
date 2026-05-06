import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check, Image as ImageIcon, Sparkles, Download, Loader2, ArrowLeft, Eraser } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { toast } from "sonner";

interface Props {
  onBack: () => void;
}

const BackgroundRemover: React.FC<Props> = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  
  // Minute Eraser States
  const [isErasing, setIsErasing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const lastPosRef = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    if (resultUrl && resultCanvasRef.current) {
        const img = new Image();
        img.onload = () => {
            const canvas = resultCanvasRef.current;
            if (canvas) {
                // High quality canvas scaling matching natural image resolution
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0,0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                }
            }
        };
        img.src = resultUrl;
    }
  }, [resultUrl]);

  const startErase = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isErasing || !resultCanvasRef.current) return;
      setIsDrawing(true);
      lastPosRef.current = null;
      eraseAt(e);
  };

  const eraseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isErasing || !isDrawing || !resultCanvasRef.current) return;
      eraseAt(e);
  };

  const endErase = () => {
      setIsDrawing(false);
      lastPosRef.current = null;
  };

  const eraseAt = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = resultCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      
      const currentBrushSize = brushSize * Math.max(scaleX, scaleY) * 0.5;
      
      if (lastPosRef.current) {
          ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
          ctx.lineTo(x, y);
          ctx.lineWidth = currentBrushSize * 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
      } else {
          ctx.arc(x, y, currentBrushSize, 0, Math.PI * 2);
          ctx.fill();
      }
      
      ctx.restore();
      lastPosRef.current = { x, y };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setResultUrl(null);
        handleRemoveBackground(file);
      } else {
        toast.error("Please upload an image file (PNG, JPG, etc.)");
      }
    }
  };

  const handleRemoveBackground = async (fileToProcess: File) => {
    setProcessing(true);
    setProgressText("Initializing AI Model...");
    try {
      toast.info("Magically removing background... this may take a moment.");

      const blob = await removeBackground(fileToProcess, {
        model: "isnet", // Use the highest accuracy model for "perfect" analyzing
        output: {
          format: "image/png",
          quality: 1.0
        },
        progress: (key, current, total) => {
          const percent = Math.round((current / total) * 100);
          console.log(`Processing ${key}: ${percent}%`);
          if (key === 'compute:inference') {
            setProgressText(`Analyzing Image Layers... ${percent}%`);
          } else if (key === 'compute:mask' || key === 'compute:alpha') {
            setProgressText(`Generating Alpha Mask... ${percent}%`);
          } else if (key.startsWith('fetch:')) {
            setProgressText(`Loading AI Model... ${percent}%`);
          } else {
            setProgressText(`Processing... ${percent}%`);
          }
        }
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      toast.success("Magic complete! Background removed.");
    } catch (error) {
      console.error("Magic error:", error);
      toast.error("Failed to process image. Make sure it's a valid image file.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadResult = () => {
    if (resultUrl) {
      const canvas = resultCanvasRef.current;
      const urlToDownload = canvas ? canvas.toDataURL("image/png") : resultUrl;
      const link = document.createElement("a");
      link.href = urlToDownload;
      link.download = `removed-bg-${selectedFile?.name || "result"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearAll = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setIsErasing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Magic Hub
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Background <span className="text-cyan-400">Remover</span></h2>
        <p className="text-blue-200/60">Remove backgrounds from any image instantly using AI.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Workspace Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-1 items-stretch flex flex-col h-full bg-[#040c1e]/40 border-cyan-500/20 backdrop-blur-md overflow-hidden rounded-3xl"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon size={20} className="text-cyan-400" />
                  Workspace
                </h3>
                <span className="text-[10px] text-cyan-400/50 font-mono uppercase tracking-widest mt-1">Ready for input</span>
              </div>
              {selectedFile && (
                <button
                  onClick={clearAll}
                  className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold hover:bg-red-500/20 transition-all border border-red-500/20 uppercase tracking-tighter"
                >
                  Reset
                </button>
              )}
            </div>

            <div className={`relative flex-grow min-h-[400px] border-2 border-dashed border-cyan-500/20 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all group ${!selectedFile ? 'hover:bg-cyan-500/5 hover:border-cyan-500/40 cursor-pointer bg-black/20' : 'bg-black/40'}`} onClick={() => !selectedFile && fileInputRef.current?.click()}>
              {!selectedFile ? (
                <div className="flex flex-col items-center justify-center p-12 w-full h-full">
                  <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all border border-cyan-500/10 group-hover:border-cyan-500/30">
                    <Upload className="text-cyan-400" size={32} />
                  </div>
                  <p className="text-cyan-200 font-bold text-lg mb-2">Drop your image here</p>
                  <p className="text-cyan-100/30 text-xs text-center">Supports PNG, JPG, WEBP</p>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img src={previewUrl!} alt="Preview" className={`max-w-full max-h-[350px] object-contain rounded-lg ${processing ? 'opacity-50 blur-[2px]' : ''} transition-all duration-500`} />
                  
                  {/* Analyzing Overlay */}
                  <AnimatePresence>
                    {processing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-cyan-500/10 backdrop-blur-[2px] flex items-center justify-center p-4"
                      >
                        <div className="relative w-full h-full">
                          <motion.div 
                            className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-40"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/70 px-6 py-4 rounded-2xl border border-cyan-500/30 flex items-center gap-4 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-md">
                              <Loader2 className="animate-spin text-cyan-400" size={20} />
                              <div className="flex flex-col text-left">
                                <span className="text-white font-bold text-xs tracking-widest uppercase mb-1">Processing Image</span>
                                <span className="text-cyan-400 text-[10px] font-mono tracking-wider">{progressText || "Initializing..."}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
              />
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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Check size={20} className="text-cyan-400" />
                Final Result
              </h3>
              {resultUrl && (
                <button
                  onClick={() => setIsErasing(!isErasing)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 uppercase tracking-tighter ${isErasing ? 'bg-pink-500/20 text-pink-400 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/30'}`}
                >
                  <Eraser size={14} />
                  {isErasing ? 'Erasing ON' : 'Minute Remover'}
                </button>
              )}
            </div>

            <div className={`flex-grow border-2 border-dashed border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all bg-[url('/bg-patterns/transparent-grid.webp')] min-h-[200px] ${resultUrl ? 'border-solid border-cyan-500/30' : 'bg-black/30'}`}>
              {resultUrl ? (
                <div className="w-full h-full relative p-4 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                  <canvas 
                    ref={resultCanvasRef}
                    onMouseDown={startErase}
                    onMouseMove={eraseMove}
                    onMouseUp={endErase}
                    onMouseLeave={endErase}
                    className={`max-w-full max-h-[180px] object-contain relative z-10 transition-all ${isErasing ? 'cursor-crosshair drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] ring-2 ring-pink-500/50 rounded-lg' : 'drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]'}`} 
                  />
                  {isErasing && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-pink-500/30 shadow-lg"
                    >
                       <p className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-2">Brush Size</p>
                       <input 
                         type="range" 
                         min="10" 
                         max="150" 
                         value={brushSize} 
                         onChange={(e) => setBrushSize(parseInt(e.target.value))}
                         className="w-24 accent-pink-500"
                       />
                    </motion.div>
                  )}
                  
                  <button
                    onClick={downloadResult}
                    className="mt-6 px-8 py-3 bg-cyan-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/30 z-20 relative"
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

export default BackgroundRemover;
