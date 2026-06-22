import { Zap, Activity, Terminal } from 'lucide-react';

export default function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 w-full px-8 py-6 flex items-end justify-between pointer-events-none z-40">
      
      {/* Left side capsules */}
      <div className="flex gap-4 pointer-events-auto">
        <button className="flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-border px-6 py-2.5 clip-chamfer hover:bg-accent/10 hover:border-accent transition-all group">
          <Zap size={14} className="text-accent" />
          <span className="font-display text-xs tracking-wider text-muted-foreground group-hover:text-foreground">QUICK CAPTURE</span>
        </button>
        <button className="flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-border px-6 py-2.5 clip-chamfer hover:bg-accent/10 hover:border-accent transition-all group">
          <Activity size={14} className="text-accent" />
          <span className="font-display text-xs tracking-wider text-muted-foreground group-hover:text-foreground">RECENT ACT</span>
        </button>
      </div>

      {/* Right side companion/assistant widget */}
      <div className="pointer-events-auto flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-accent/40 p-3 clip-chamfer-reverse hud-glow cursor-pointer group hover:bg-accent/10">
        <div className="w-10 h-10 bg-background border border-accent/50 clip-hexagon flex items-center justify-center">
          <Terminal size={18} className="text-accent group-hover:animate-pulse" />
        </div>
        <div className="flex flex-col pr-4">
          <span className="font-display text-sm tracking-widest text-foreground">AI.CORE</span>
          <span className="font-mono text-[9px] text-accent">READY_</span>
        </div>
      </div>
      
    </div>
  );
}
