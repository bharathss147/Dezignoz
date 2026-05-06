import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Image as ImageIcon, X, ArrowLeft, Loader2, Heart } from "lucide-react";

interface ImageResult {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  author: string;
  downloadUrl: string;
}

interface ImageSearchProps {
  onBack: () => void;
}

// Fallback high-quality mock images in case API key is missing
const MOCK_IMAGES: ImageResult[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=600&auto=format&fit=crop",
    title: "Abstract Liquid",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    title: "Beautiful Landscape",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=600&auto=format&fit=crop",
    title: "Alpine Mountains",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    title: "Cyberpunk City",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1531297172864-742c86e41cb5?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1531297172864-742c86e41cb5?q=80&w=600&auto=format&fit=crop",
    title: "Tech Setup",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1531297172864-742c86e41cb5?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1605809712752-6d267f8fb029?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1605809712752-6d267f8fb029?q=80&w=600&auto=format&fit=crop",
    title: "Minimal Desk",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1605809712752-6d267f8fb029?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop",
    title: "Dark Aesthetics",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    title: "Hardware",
    author: "Unsplash",
    downloadUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
  }
];


const ImageSearch: React.FC<ImageSearchProps> = ({ onBack }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<ImageResult[]>(MOCK_IMAGES);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  // Load random aesthetic images on first mount like a Pinterest feed
  useEffect(() => {
    searchImages(undefined, "aesthetic pinterest high quality");
  }, []);

  const searchImages = async (e?: React.FormEvent, defaultQuery?: string) => {
    if (e) e.preventDefault();
    
    const searchQuery = defaultQuery || query;
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      // Connecting to Lexica Art database for massive, reliable Pinterest-style results
      const response = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch from database");
      }

      const data = await response.json();
      
      if (data && data.images && data.images.length > 0) {
        const mapped = data.images.slice(0, 40).map((item: any) => ({
          id: item.id,
          url: item.src,
          thumbnail: item.srcSmall || item.src,
          title: item.prompt,
          author: "Neural Network",
          downloadUrl: item.src
        }));
        setImages(mapped);
      } else {
         throw new Error("No images found in database");
      }
    } catch (error) {
      console.error("Error fetching images from database:", error);
      // Fallback to MOCK_IMAGES if offline
      setTimeout(() => {
        const filtered = MOCK_IMAGES.filter(img => 
           img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           "design ui minimal aesthetic cyberpunk abstract landscape".includes(searchQuery.toLowerCase())
        );
        setImages(filtered.length > 0 ? filtered : [...MOCK_IMAGES].sort(() => Math.random() - 0.5));
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string, title: string, id: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors group w-fit"
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </div>
          Back to Studio
        </button>

        <form onSubmit={searchImages} className="relative w-full md:max-w-xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-blue-200/40 group-focus-within:text-pink-400 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search high-quality images (e.g. 'cyberpunk aesthetic', 'minimal UI')..."
            className="w-full pl-12 pr-32 py-4 bg-[#0a1128]/80 border border-white/10 rounded-2xl text-white placeholder:text-blue-200/30 focus:outline-none focus:border-pink-500/50 shadow-[0_0_20px_rgba(0,0,0,0.2)] focus:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all backdrop-blur-xl"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>
      </div>



      {/* Masonry Grid representing Pinterest style */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        <AnimatePresence>
          {images.map((img, idx) => (
            <motion.div
              key={img.id + idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
              whileHover={{ y: -5 }}
              className="relative group break-inside-avoid mb-6 rounded-3xl overflow-hidden bg-[#1e293b] cursor-zoom-in"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.thumbnail}
                alt={img.title.substring(0, 50)}
                className="w-full object-cover transition-transform duration-700 bg-black/20"
                loading="lazy"
              />
              
              {/* Overlay exactly like Pinterest */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
                     <ImageIcon size={12} /> HD Result
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(img.downloadUrl, img.title.substring(0, 20), img.id);
                    }}
                    className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all transform hover:scale-105"
                    title="Download Image"
                  >
                    Save
                  </button>
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-white font-bold text-sm line-clamp-2 leading-snug drop-shadow-md mb-2">{img.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold border border-white/20">
                      N
                    </div>
                    <p className="text-white/90 text-xs font-medium drop-shadow-md">{img.author}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {images.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <ImageIcon size={32} className="text-blue-200/30" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Images Found</h2>
          <p className="text-blue-200/50">Try searching with different keywords.</p>
        </div>
      )}

      {/* Lightbox / Modal View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#0a1128] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden group">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[60vh] md:max-h-[90vh]"
                />
              </div>

              {/* Info Side */}
              <div className="w-full md:w-1/3 p-8 flex flex-col bg-gradient-to-b from-[#0a1128] to-[#020617]">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                      {selectedImage.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{selectedImage.author}</h4>
                      <p className="text-blue-200/50 text-xs">Unsplash Creator</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{selectedImage.title}</h2>
                  <p className="text-blue-200/60 mb-8">
                    High quality, royalty-free image. Perfect for your design projects, presentations, and creative work.
                  </p>
                </div>

                <div className="flex gap-4 mt-auto border-t border-white/10 pt-6">
                  <button 
                    onClick={() => handleDownload(selectedImage.downloadUrl, selectedImage.title, selectedImage.id)}
                    className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                  >
                    <Download size={20} />
                    Download Full HD
                  </button>
                  <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all">
                    <Heart size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageSearch;
