import { Database, Cpu, HardDrive } from 'lucide-react';

export default function TopStatusStrip({ totalEntries = 0, totalOutputs = 0, activeModels = 3 }) {
  return (
    <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-auto md:min-w-[700px] flex items-center justify-between px-6 py-3 pointer-events-none z-40 bg-surface/80 backdrop-blur-xl border border-accent/30 rounded-2xl md:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      
      <div className="flex gap-4 md:gap-12 pointer-events-auto scale-[0.85] md:scale-100 origin-center mx-auto">
        <StatusCounter icon={Database} label="SYS.RECORDS" value={totalEntries} />
        
        <div className="hidden md:block w-px h-8 bg-accent/20 self-center"></div>
        
        <StatusCounter icon={HardDrive} label="OUTPUT.DATA" value={totalOutputs} />
        
        <div className="hidden md:block w-px h-8 bg-accent/20 self-center"></div>
        
        <StatusCounter icon={Cpu} label="AI.LINK" value={activeModels} />
      </div>
      
    </div>
  );
}

function StatusCounter({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: number }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-8 h-8 rounded-full border border-accent/50 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 group-hover:hud-glow transition-all duration-300">
        <Icon size={14} className="text-accent" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground font-mono tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-mono text-foreground tracking-wider leading-none">{String(value).padStart(3, '0')}</span>
          <div className="w-1.5 h-1.5 bg-accent rounded-sm clip-chamfer"></div>
        </div>
      </div>
    </div>
  );
}
