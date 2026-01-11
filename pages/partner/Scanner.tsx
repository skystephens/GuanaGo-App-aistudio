import React from 'react';
import { ArrowLeft, Flashlight, Image as ImageIcon } from 'lucide-react';

interface ScannerProps {
  onBack: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ onBack }) => {
  return (
    <div className="bg-black min-h-screen relative flex flex-col">
       {/* Top Controls */}
       <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-10 text-white">
          <button onClick={onBack} className="p-2 bg-black/40 rounded-full backdrop-blur-sm">
             <ArrowLeft size={24} />
          </button>
          <span className="font-bold">Escanear QR</span>
          <button className="p-2 bg-black/40 rounded-full backdrop-blur-sm">
             <Flashlight size={24} />
          </button>
       </div>

       {/* Camera Area */}
       <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544979590-37e9b47cd256?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
          
          <div className="relative z-10 w-64 h-64 border-2 border-white/50 rounded-3xl flex flex-col justify-between p-4">
             {/* Scanner Corners */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl -mt-1 -ml-1"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl -mt-1 -mr-1"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl -mb-1 -ml-1"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl -mb-1 -mr-1"></div>
             
             <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-red-500 animate-pulse shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]"></div>
          </div>
          
          <p className="relative z-10 text-white mt-8 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
             Alinea el código QR dentro del marco
          </p>
       </div>

       {/* Bottom Controls */}
       <div className="h-32 bg-black flex items-center justify-center gap-12 relative z-10">
          <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700">
             <ImageIcon size={24} />
          </button>
          <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
             <div className="w-14 h-14 bg-white rounded-full active:scale-90 transition-transform"></div>
          </button>
          <div className="w-12"></div> {/* Spacer for balance */}
       </div>
    </div>
  );
};

export default Scanner;
