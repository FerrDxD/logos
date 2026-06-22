import Link from 'next/link';
import { Plus, Database, Library } from 'lucide-react';

const actions = [
  { id: 'new-prompt', label: 'NEW PROMPT', sub: 'INITIALIZE SEQUENCE', icon: Plus, href: '/new', highlight: true },
  { id: 'new-output', label: 'NEW OUTPUT', sub: 'APPEND RECORD', icon: Database, href: '/new-output' },
  { id: 'browse', label: 'ARCHIVE', sub: 'ACCESS DATABASE', icon: Library, href: '/archive' },
];

export default function ActionPanel() {
  return (
    <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 w-64 md:w-72 z-40">
      
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-accent clip-chamfer"></div>
        <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Command Matrix</span>
        <div className="flex-1 h-px bg-accent/30"></div>
      </div>

      {actions.map((action) => (
        <Link href={action.href} key={action.id} className="group block">
          <div className={`relative bg-surface p-4 border border-border clip-chamfer transition-all duration-300 ${
            action.highlight 
              ? 'hover:bg-primary/20 hover:border-accent hud-glow-active border-accent/50' 
              : 'hover:bg-accent/10 hover:border-accent'
          }`}>
            
            <div className="flex items-start gap-4">
              <div className={`p-2 bg-background border border-border clip-chamfer-reverse ${
                action.highlight ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'
              } transition-colors`}>
                <action.icon size={24} strokeWidth={1.5} />
              </div>
              
              <div className="flex flex-col">
                <span className={`font-display text-lg tracking-wide ${
                  action.highlight ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                } transition-colors`}>
                  {action.label}
                </span>
                <span className="font-mono text-[9px] text-accent/70 tracking-widest mt-0.5">
                  {action.sub}
                </span>
              </div>
            </div>

            {/* Scanline hover effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 pointer-events-none"></div>
            
            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/100 transition-colors duration-300"></div>
          </div>
        </Link>
      ))}
      
    </div>
  );
}
