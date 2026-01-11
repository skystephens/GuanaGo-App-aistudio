import React from 'react';
import { ArrowLeft, X, Calendar, Camera } from 'lucide-react';

interface FormProps {
   onBack: () => void;
}

const PartnerServiceForm: React.FC<FormProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col">
       <div className="p-6 flex items-center justify-between border-b border-gray-800">
          <button onClick={onBack} className="hover:text-gray-300">
             <X size={24} />
          </button>
          <h1 className="font-bold text-lg">Crear tour</h1>
          <div className="w-6"></div> {/* Spacer */}
       </div>

       <div className="flex-1 overflow-y-auto p-6 pb-24">
          <form className="space-y-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Título</label>
                <input type="text" placeholder="Ej. Tour por la Bahía" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-green-500 transition-colors" />
             </div>

             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Descripción</label>
                <textarea placeholder="Describe los detalles del tour..." className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 h-32 resize-none focus:outline-none focus:border-green-500 transition-colors"></textarea>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-300">Precio</label>
                   <input type="number" placeholder="USD" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-green-500 transition-colors" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-300">Duración</label>
                   <input type="text" placeholder="Ej. 2 horas" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-green-500 transition-colors" />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Puntos de encuentro</label>
                <input type="text" placeholder="Ej. Muelle Principal" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-green-500 transition-colors" />
             </div>

             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Fotos del Tour</label>
                <div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-green-500 hover:bg-gray-800/50 transition-all cursor-pointer">
                   <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-2">
                      <Camera size={24} />
                   </div>
                   <p className="font-bold">Añadir fotos</p>
                   <p className="text-xs text-gray-500 mt-1">Sube imágenes para mostrar tu tour</p>
                   <button type="button" className="mt-4 bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Subir</button>
                </div>
             </div>

             <div className="space-y-2">
                <div className="flex items-center justify-between">
                   <label className="text-sm font-bold text-white">Disponibilidad</label>
                </div>
                <p className="text-xs text-gray-400 mb-2">Selecciona una fecha para añadir los cupos.</p>
                
                {/* Simulated Calendar UI */}
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                   <div className="flex justify-between items-center mb-4 text-sm font-bold">
                      <button type="button" className="p-1"><ArrowLeft size={16} /></button>
                      <span>Julio 2024</span>
                      <button type="button" className="p-1 rotate-180"><ArrowLeft size={16} /></button>
                   </div>
                   <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                      <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
                   </div>
                   <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                      {/* Empty cells */}
                      <span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                      <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span className="text-yellow-500">13</span>
                      <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                      <span className="bg-green-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mx-auto">19</span>
                      <span>20</span>
                      <span className="text-red-500">21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span>
                      <span className="text-red-500">28</span><span>29</span><span>30</span><span>31</span>
                   </div>
                </div>

                <div className="mt-4">
                   <label className="text-sm font-bold text-gray-300">Cupos para el 19 de Julio</label>
                   <input type="number" placeholder="Ej. 10" className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl p-4 focus:outline-none focus:border-green-500 transition-colors" />
                </div>
             </div>
          </form>
       </div>

       <div className="p-6 border-t border-gray-800 bg-gray-900">
          <button onClick={onBack} className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-4 rounded-xl transition-colors">
             Guardar Tour
          </button>
       </div>
    </div>
  );
};

export default PartnerServiceForm;