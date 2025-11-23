import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="hidden sm:block absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed"></div>
      <div className="hidden sm:block absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>

      <div className="content-container relative z-10">
          <div className="max-w-2xl">
             <div className="flex items-center gap-4 mb-8 text-orange-500">
                <ShieldCheck size={48} strokeWidth={1.5} />
                <span className="text-sm font-bold uppercase tracking-[0.3em]">The Science</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                NOTHING TO HIDE.<br/>EVERYTHING TO GAIN.
             </h2>
             <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light">
                In an industry full of proprietary blends and hidden ingredients, we stand naked. Every batch is tested, every ingredient is listed, and every scoop is guaranteed to be pure.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
                <div>
                   <h3 className="text-4xl font-black text-white mb-2">25g</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-widest">Protein Isolate</p>
                </div>
                <div>
                   <h3 className="text-4xl font-black text-white mb-2">0g</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-widest">Sugar & Fillers</p>
                </div>
                <div>
                   <h3 className="text-4xl font-black text-white mb-2">100%</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-widest">Satisfaction</p>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default AboutSection;