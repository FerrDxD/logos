'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function HudBackButton({ label = "RETURN TO PREVIOUS" }: { label?: string }) {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()} 
      className="group inline-flex items-center pr-6 bg-surface/50 border border-border clip-chamfer hover:bg-accent/10 hover:border-accent hud-glow transition-all mb-8"
    >
      <div className="w-8 h-8 mr-3 flex items-center justify-center bg-background border-r border-border clip-chamfer group-hover:border-accent/50 group-hover:text-accent transition-colors">
        <ArrowLeft size={14} />
      </div>
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
        {label}
      </span>
    </button>
  );
}
