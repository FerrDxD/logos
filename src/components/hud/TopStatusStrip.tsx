import { Database, Cpu, HardDrive } from 'lucide-react';

export default function TopStatusStrip({ totalEntries = 0, totalOutputs = 0, activeModels = 3 }) {
  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 pointer-events-none z-40">
      {/* Decorative left line */}
      <div className="hidden md:flex flex-1 items-center mr-8">
        <div className="w-full h-px bg-accent/30 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex gap-6 md:gap-12 pointer-events-auto">
        <StatusCounter icon={Database} label="SYS.RECORDS" value={totalEntries} />
        <StatusCounter icon={HardDrive} label="OUTPUT.DATA" value={totalOutputs} />
        <StatusCounter icon={Cpu} label="AI.LINK" value={activeModels} />
      </div>
      
      {/* Decorative right line */}
      <div className="hidden md:flex flex-1 items-center ml-8">
        <div className="w-full h-px bg-accent/30 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function StatusCounter({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: number }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-8 h-8 rounded-full border border-accent/50 flex items-center justify-center bg-surface group-hover:hud-glow transition-all duration-300">
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
