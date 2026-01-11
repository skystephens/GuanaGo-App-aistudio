
import React, { useState } from 'react';
import { ArrowLeft, Mail, Facebook, Loader2 } from 'lucide-react';
import { AppRoute } from '../types';
import { api } from '../services/api';

interface LoginProps {
  onBack: () => void;
  onNavigate: (route: AppRoute) => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setError('');

     try {
        const result = await api.auth.login(email);
        if (result.success) {
           onLoginSuccess();
        } else {
           setError(result.error || 'Error de autenticación');
        }
     } catch (err) {
        setError('Error conectando al servidor');
     } finally {
        setLoading(false);
     }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col font-sans">
       <button onClick={onBack} className="self-start p-2 -ml-2 mb-8 hover:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft size={24} />
       </button>

       <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Solicitud de Afiliación</h1>
          <p className="text-gray-400 mb-8">Únete a nuestra red de operadores turísticos en San Andrés.</p>

          <div className="space-y-4">
             <button className="w-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">G</span>
                Continuar con Gmail
             </button>
             <button className="w-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
                <Facebook size={20} className="text-blue-500" />
                Continuar con Facebook
             </button>
          </div>

          <div className="flex items-center gap-4 my-8">
             <div className="h-px bg-gray-800 flex-1"></div>
             <span className="text-xs text-gray-500 uppercase">O Ingresa con email</span>
             <div className="h-px bg-gray-800 flex-1"></div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
             <div className="space-y-1">
                <label className="text-xs text-green-500 font-bold ml-1">Correo Electrónico</label>
                <div className={`bg-gray-800 rounded-xl px-4 py-3 border transition-colors flex items-center gap-3 ${error ? 'border-red-500' : 'border-gray-700 focus-within:border-green-500'}`}>
                   <Mail size={18} className="text-gray-500" />
                   <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500" 
                     placeholder="ejemplo@correo.com" 
                     required
                   />
                </div>
                {error && <p className="text-red-500 text-xs ml-1 mt-1">{error}</p>}
             </div>
             
             {/* Simple Password Field Simulation */}
             <div className="space-y-1">
                <label className="text-xs text-gray-500 font-bold ml-1">Contraseña (Demo: cualquier texto)</label>
                <div className="bg-gray-800 rounded-xl px-4 py-3 border border-gray-700 focus-within:border-green-500 transition-colors flex items-center gap-3">
                   <span className="text-gray-400 text-sm font-bold">***</span>
                   <input type="password" className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500" placeholder="••••••••" />
                </div>
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold py-4 rounded-xl mt-6 transition-colors flex items-center justify-center gap-2"
             >
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? 'Conectando...' : 'Iniciar Sesión'}
             </button>
             
             <button 
               type="button"
               onClick={() => onNavigate(AppRoute.PARTNER_REGISTER)}
               className="w-full text-gray-400 text-sm font-medium hover:text-white transition-colors py-2"
             >
                ¿No tienes cuenta? <span className="text-green-500 underline">Regístrate aquí</span>
             </button>
          </form>
       </div>
    </div>
  );
};

export default Login;
