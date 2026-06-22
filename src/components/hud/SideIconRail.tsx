import Link from 'next/link';
import { Search, Tag, Settings, Cpu } from 'lucide-react';

const navItems = [
  { id: 'search', label: 'SEARCH', icon: Search, href: '/', active: true },
  { id: 'tags', label: 'TAGS', icon: Tag, href: '/tags' },
  { id: 'models', label: 'MODELS', icon: Cpu, href: '/models' },
  { id: 'settings', label: 'CONFIG', icon: Settings, href: '/settings', alert: true },
];

export default function SideIconRail() {
  return (
    <div className="fixed md:absolute bottom-6 md:bottom-auto left-1/2 md:left-6 md:top-1/2 -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 w-[90%] md:w-auto flex flex-row md:flex-col justify-around md:justify-center md:gap-6 z-50 bg-surface/80 backdrop-blur-xl border border-accent/30 rounded-2xl md:rounded-[2rem] px-4 py-3 md:px-3 md:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link href={item.href} key={item.id} className="group relative flex flex-col items-center">
            {/* Hexagon Frame */}
            <div className={`relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center clip-hexagon transition-all duration-300 ${
              item.active 
                ? 'bg-accent/10 hud-border hud-glow-active' 
                : 'bg-surface border border-border hover:bg-accent/5 hover:border-accent/50'
            }`}>
              <Icon 
                size={20} 
                className={`transition-colors duration-300 ${item.active ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'}`} 
              />
              
              {/* Alert Badge */}
              {item.alert && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-alert rounded-full animate-pulse shadow-[0_0_8px_rgba(255,179,71,0.8)]"></div>
              )}
            </div>
            
            {/* Label */}
            <span className={`hidden md:block mt-2 font-mono text-[9px] md:text-[10px] tracking-widest ${
              item.active ? 'text-accent' : 'text-muted-foreground'
            }`}>
              {item.label}
            </span>
            
            {/* Active Side Line */}
            {item.active && (
              <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-md hud-glow-active"></div>
            )}
            {/* Active Bottom Line (Mobile) */}
            {item.active && (
              <div className="block md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-1 bg-accent rounded-t-md hud-glow-active"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
