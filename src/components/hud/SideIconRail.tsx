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
    <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
      <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent/50 mx-auto mb-2"></div>
      
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link href={item.href} key={item.id} className="group relative flex flex-col items-center">
            {/* Hexagon Frame */}
            <div className={`relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center clip-hexagon transition-all duration-300 ${
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
            <span className={`mt-2 font-mono text-[9px] md:text-[10px] tracking-widest ${
              item.active ? 'text-accent' : 'text-muted-foreground'
            }`}>
              {item.label}
            </span>
            
            {/* Active Side Line */}
            {item.active && (
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-md hud-glow-active"></div>
            )}
          </Link>
        );
      })}

      <div className="w-px h-16 bg-gradient-to-t from-transparent to-accent/50 mx-auto mt-2"></div>
    </div>
  );
}
