
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { AppRoute } from '../types';

interface RegisterProps {
  onBack: () => void;
  onComplete: () => void;
}

const PartnerRegister: React.FC<RegisterProps> = ({ onBack, onComplete }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call
      setTimeout(() => {
          setSubmitted(true);
      }, 1000);
  };

  if (submitted) {
      return (
        <div className="bg-gray-900 min-h-screen text-white p-6 font-sans flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6 animate-in zoom-in">
                <Clock size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Solicitud Enviada</h2>
            <p className="text-gray-400 mb-8 max-w-xs">
                Tu solicitud de afiliación ha sido recibida y está en estado <strong>Pendiente de Aprobación</strong>. 
                <br/><br/>
                Un administrador revisará tus datos y recibirás una notificación cuando tu cuenta sea activada.
            </p>
            <button 
                onClick={onComplete}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-colors border border-gray-700"
            >
                Entendido, volver al inicio
            </button>
        </div>
      );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 font-sans">
       <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-800 rounded-full">
             <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Solicitud de Afiliación</h1>
       </div>

       <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div className="space-y-1">
             <label className="text-sm text-gray-400 ml-1">Nombre del Negocio</label>
             <input required type="text" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors" />
          </div>

          <div className="space-y-1">
             <label className="text-sm text-gray-400 ml-1">Tipo de Servicio</label>
             <div className="relative">
                <select className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-green-500 transition-colors text-white">
                   <option>Tours y Actividades</option>
                   <option>Alojamiento</option>
                   <option>Transporte</option>
                   <option>Restaurante</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
             </div>
          </div>

          <div className="space-y-1">
             <label className="text-sm text-gray-400 ml-1">Nombre de Contacto</label>
             <input required type="text" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors" />
          </div>

          <div className="space-y-1">
             <label className="text-sm text-gray-400 ml-1">Email Corporativo</label>
             <input required type="email" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors" />
          </div>

          <div className="space-y-1">
             <label className="text-sm text-gray-400 ml-1">Teléfono</label>
             <input required type="tel" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors" />
          </div>

          <div className="space-y-1">
             <label className="text-sm text-gray-400 ml-1">Mensaje o Detalles Adicionales</label>
             <textarea className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 h-32 resize-none focus:outline-none focus:border-green-500 transition-colors"></textarea>
          </div>

          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-4 rounded-xl mt-8 transition-colors">
             Enviar Solicitud
          </button>
       </form>
    </div>
  );
};

export default PartnerRegister;
