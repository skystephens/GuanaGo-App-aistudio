
import React from 'react';
import { ArrowLeft, Flashlight, Image as ImageIcon } from 'lucide-react';

interface ScannerProps {
  onBack: () => void;
}

const PartnerScanner: React.FC<ScannerProps> = ({ onBack }) => {
  return (
    <div className="bg-black min-h-screen relative flex flex-col">
       <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-10 text-white">
          <button onClick={onBack} className="p-2 bg-black/40 rounded-full"><ArrowLeft size={24} /></button>
          <span className="font-bold">Escanear QR</span>
          <button className="p-2 bg-black/40 rounded-full"><Flashlight size={24} /></button>
       </div>

       <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl -mt-1 -ml-1"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl -mt-1 -mr-1"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl -mb-1 -ml-1"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl -mb-1 -mr-1"></div>
             <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-red-500 animate-pulse"></div>
          </div>
          <p className="text-white mt-8 text-sm bg-black/50 px-4 py-2 rounded-full">Alinea el código QR</p>
       </div>
    </div>
  );
};

export default PartnerScanner;
