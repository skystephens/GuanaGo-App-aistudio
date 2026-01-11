
import React, { useState } from 'react';
import { ArrowLeft, Save, Calendar as CalendarIcon, Loader2, Image as ImageIcon, Plus, Trash2, Upload, X, ChevronDown } from 'lucide-react';
import { AppRoute, Tour } from '../../types';
import { api } from '../../services/api';

interface DetailProps {
   onBack: () => void;
   onNavigate?: (route: AppRoute) => void;
   data?: any; // The service object passed from list
}

const PartnerServiceDetail: React.FC<DetailProps> = ({ onBack, data }) => {
   // Initialize with passed data or empty default
   const [formData, setFormData] = useState<Partial<Tour>>(data || {
      id: '',
      title: '',
      description: '',
      price: 0,
      image: '',
      gallery: [],
      category: 'tour',
      active: true
   });
   const [saving, setSaving] = useState(false);

   // --- SIMULATED CALENDAR ---
   const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);
   const [blockedDays, setBlockedDays] = useState([5, 12, 13, 25]);

   const toggleDayBlock = (day: number) => {
     if (blockedDays.includes(day)) {
         setBlockedDays(blockedDays.filter(d => d !== day));
     } else {
         setBlockedDays([...blockedDays, day]);
     }
   };

   // --- IMAGE HANDLERS ---
   const handleMainImageChange = () => {
      // Simulate file upload by setting a random image
      const randomId = Math.floor(Math.random() * 1000);
      setFormData({ ...formData, image: `https://picsum.photos/id/${randomId}/800/600` });
   };

   const handleAddGalleryImage = () => {
      // Simulate file upload
      const randomId = Math.floor(Math.random() * 1000);
      const newImage = `https://picsum.photos/id/${randomId}/800/600`;
      const currentGallery = formData.gallery || [];
      setFormData({ ...formData, gallery: [...currentGallery, newImage] });
   };

   const handleRemoveGalleryImage = (index: number) => {
      const currentGallery = formData.gallery || [];
      const newGallery = currentGallery.filter((_, i) => i !== index);
      setFormData({ ...formData, gallery: newGallery });
   };

   const handleSave = async () => {
       if(!formData.id) return;
       setSaving(true);
       await api.services.update(formData.id, {
           title: formData.title,
           description: formData.description,
           price: formData.price,
           image: formData.image,
           gallery: formData.gallery,
           category: formData.category
       });
       setSaving(false);
       onBack(); // Go back after save
   };

   return (
      <div className="bg-gray-900 min-h-screen text-white font-sans pb-24">
         {/* Header */}
         <header className="px-6 pt-12 pb-4 flex items-center justify-between bg-gray-900 sticky top-0 z-10">
            <div className="flex items-center gap-3">
               <button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <ArrowLeft size={20} />
               </button>
               <h1 className="text-lg font-bold truncate max-w-[200px]">Editar Servicio</h1>
            </div>
            <button 
               onClick={handleSave}
               disabled={saving}
               className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
            >
               {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
               Guardar
            </button>
         </header>

         <div className="px-6 space-y-6">
            
            {/* Section 1: Basic Details */}
            <section className="bg-gray-800 p-4 rounded-xl border border-gray-700">
               <h2 className="font-bold mb-4 text-gray-200">Información General</h2>
               <div className="space-y-4">
                  <div>
                     <label className="text-xs text-gray-400 mb-1 block uppercase font-bold">Título del Servicio</label>
                     <input 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        className="w-full bg-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 border border-transparent" 
                     />
                  </div>
                  
                  {/* Category Selector */}
                  <div>
                     <label className="text-xs text-gray-400 mb-1 block uppercase font-bold">Categoría</label>
                     <div className="relative">
                        <select
                           value={formData.category}
                           onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                           className="w-full bg-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 border border-transparent appearance-none text-white"
                        >
                           <option value="tour">Tour / Actividad</option>
                           <option value="hotel">Alojamiento</option>
                           <option value="package">Paquete Turístico</option>
                           <option value="taxi">Transporte / Taxi</option>
                           <option value="handicraft">Artesanía / Tienda</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                     </div>
                  </div>

                  <div>
                     <label className="text-xs text-gray-400 mb-1 block uppercase font-bold">Precio Base (USD)</label>
                     <input 
                        type="number" 
                        value={formData.price} 
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} 
                        className="w-full bg-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-green-400 border border-transparent" 
                     />
                  </div>
                  <div>
                     <label className="text-xs text-gray-400 mb-1 block uppercase font-bold">Descripción</label>
                     <textarea 
                        value={formData.description} 
                        rows={4} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        className="w-full bg-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 border border-transparent resize-none"
                     ></textarea>
                  </div>
               </div>
            </section>

            {/* Section 2: Multimedia Images */}
            <section className="bg-gray-800 p-4 rounded-xl border border-gray-700">
               <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="text-purple-400" size={20}/>
                  <h2 className="font-bold text-gray-200">Multimedia</h2>
               </div>

               {/* Main Image */}
               <div className="mb-6">
                  <label className="text-xs text-gray-400 mb-2 block uppercase font-bold">Imagen Principal</label>
                  <div className="relative h-48 rounded-xl overflow-hidden bg-gray-900 border border-gray-700 group">
                     {formData.image ? (
                        <>
                           <img src={formData.image} alt="Main" className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button 
                                 onClick={handleMainImageChange}
                                 className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2"
                              >
                                 <Upload size={14} /> Cambiar Foto
                              </button>
                           </div>
                        </>
                     ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 cursor-pointer" onClick={handleMainImageChange}>
                           <Upload size={24} className="mb-2" />
                           <span className="text-xs font-bold">Subir Imagen Principal</span>
                        </div>
                     )}
                  </div>
               </div>

               {/* Gallery */}
               <div>
                  <label className="text-xs text-gray-400 mb-2 block uppercase font-bold">Galería de Fotos</label>
                  <div className="grid grid-cols-3 gap-3">
                     {formData.gallery?.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-700 group">
                           <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                           <button 
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                              <X size={12} />
                           </button>
                        </div>
                     ))}
                     
                     {/* Add Button */}
                     <button 
                        onClick={handleAddGalleryImage}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors bg-gray-900/50"
                     >
                        <Plus size={24} />
                        <span className="text-[10px] font-bold mt-1">Añadir</span>
                     </button>
                  </div>
               </div>
            </section>

            {/* Section 3: Availability Calendar */}
            <section className="bg-gray-800 p-4 rounded-xl border border-gray-700">
               <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="text-blue-400" size={20}/>
                  <h2 className="font-bold text-gray-200">Disponibilidad (Agosto)</h2>
               </div>
               <p className="text-xs text-gray-400 mb-4 bg-gray-900/50 p-2 rounded">
                  Toca un día para bloquear la fecha. Los días rojos no estarán disponibles para los turistas.
               </p>

               {/* Calendar Header */}
               <div className="flex justify-between items-center mb-3 px-1">
                  <span className="font-bold text-lg text-white">Agosto 2024</span>
                  <div className="flex gap-2 text-[10px]">
                     <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-600 rounded-full"></span> Libre</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Bloq.</span>
                  </div>
               </div>

               {/* Calendar Grid */}
               <div className="grid grid-cols-7 gap-2 text-center mb-2 text-gray-500 text-xs font-bold">
                  <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
               </div>
               <div className="grid grid-cols-7 gap-2">
                  {/* Empty slots for start of month (mock) */}
                  <span></span><span></span>
                  
                  {currentMonthDays.map(day => {
                     const isBlocked = blockedDays.includes(day);
                     return (
                        <button
                           key={day}
                           onClick={() => toggleDayBlock(day)}
                           className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm transition-all border ${
                              isBlocked 
                                 ? 'bg-red-900/40 text-red-400 border-red-500/30' 
                                 : 'bg-gray-700 text-white border-transparent hover:bg-gray-600'
                           }`}
                        >
                           {day}
                        </button>
                     );
                  })}
               </div>
            </section>
         </div>
      </div>
   );
};

export default PartnerServiceDetail;
