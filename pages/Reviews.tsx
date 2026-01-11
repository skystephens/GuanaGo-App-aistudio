import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

interface ReviewsProps {
  onBack: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onBack }) => {
  const ratings = [
    { stars: 5, pct: 75 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 2 },
  ];

  const comments = [
    { id: 1, name: 'Sofia Ramirez', date: 'Hace 2 semanas', text: 'Una experiencia increíble! El guía fue muy amable y conocedor. Definitivamente lo recomendaría.', rating: 5, img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Carlos Mendoza', date: 'Hace 1 mes', text: 'El tour fue bueno, pero podría haber sido mejor organizado. El paisaje era hermoso.', rating: 4, img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Isabella Torres', date: 'Hace 2 meses', text: 'Absolutamente impresionante! Superó mis expectativas. El equipo fue profesional y divertido.', rating: 5, img: 'https://i.pravatar.cc/150?u=3' },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-6 font-sans">
       <div className="sticky top-0 bg-gray-900 z-10 p-6 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-full">
             <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">Comentarios</h1>
       </div>

       <div className="px-6">
          {/* Summary Card */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
             <div className="flex items-center gap-4 mb-2">
                <span className="text-5xl font-bold">4.8</span>
                <div className="flex flex-col">
                   <div className="flex text-green-500 mb-1">
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" className="text-green-500/30" />
                   </div>
                   <span className="text-sm text-gray-400">123 reseñas</span>
                </div>
             </div>

             <div className="space-y-2 mt-4">
                {ratings.map((r) => (
                   <div key={r.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-2">{r.stars}</span>
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 rounded-full" style={{ width: `${r.pct}%` }}></div>
                      </div>
                      <span className="w-6 text-right text-gray-400">{r.pct}%</span>
                   </div>
                ))}
             </div>
          </div>

          <h2 className="text-lg font-bold mb-4">Comentarios recientes</h2>
          <div className="space-y-4">
             {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                         <img src={comment.img} alt={comment.name} className="w-10 h-10 rounded-full" />
                         <div>
                            <h3 className="font-bold text-sm">{comment.name}</h3>
                            <span className="text-xs text-gray-500">{comment.date}</span>
                         </div>
                      </div>
                      <div className="flex gap-0.5 text-green-500">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < comment.rating ? "currentColor" : "none"} className={i >= comment.rating ? "text-gray-600" : ""} />
                         ))}
                      </div>
                   </div>
                   <p className="text-gray-300 text-sm leading-relaxed">
                      {comment.text}
                   </p>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Reviews;