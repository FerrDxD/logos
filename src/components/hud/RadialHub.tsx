'use client';

import { useEffect, useState } from 'react';
import { useHud } from './HudProvider';

export default function RadialHub() {
  const { orbitNodes } = useHud();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] w-64 h-64 md:w-96 md:h-96 pointer-events-none z-0">
      
      {/* Outer Orbit */}
      <div className="absolute inset-0 rounded-full border border-accent/20 animate-[spin_40s_linear_infinite] border-dashed"></div>
      
      {/* Inner Orbit */}
      <div className="absolute inset-8 rounded-full border border-accent/40 animate-[spin_20s_linear_infinite_reverse]">
        {/* Orbiting Nodes */}
        {Array.from({ length: orbitNodes }).map((_, i) => {
          const rotation = (360 / orbitNodes) * i;
          return (
            <div 
              key={i}
              className={`absolute w-3 h-3 ${i === 0 ? 'bg-accent' : 'bg-primary'} rounded-full hud-glow`}
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-144px) rotate(-${rotation}deg)`
              }}
            ></div>
          );
        })}
      </div>

      {/* Target Crosshair */}
      <div className="absolute inset-0">
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent/10"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-accent/10"></div>
      </div>

      {/* Center LOGOS Mark */}
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer group">
        
        {/* Segmented Reactor Mark */}
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-90 md:scale-100 group-hover:scale-110 transition-transform duration-500">
          <polygon
            points="60,8 104,32 104,80 60,104 16,80 16,32"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <polygon
            points="60,26 88,42 88,70 60,86 32,70 32,42"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line x1="60" y1="26" x2="60" y2="8"  stroke="var(--accent)" strokeWidth="0.6" opacity="0.4"/>
          <line x1="88" y1="42" x2="104" y2="32" stroke="var(--accent)" strokeWidth="0.6" opacity="0.4"/>
          <line x1="88" y1="70" x2="104" y2="80" stroke="var(--accent)" strokeWidth="0.6" opacity="0.4"/>
          <line x1="60" y1="86" x2="60" y2="104" stroke="var(--accent)" strokeWidth="0.6" opacity="0.4"/>
          <line x1="32" y1="70" x2="16" y2="80" stroke="var(--accent)" strokeWidth="0.6" opacity="0.4"/>
          <line x1="32" y1="42" x2="16" y2="32" stroke="var(--accent)" strokeWidth="0.6" opacity="0.4"/>

          <line x1="60" y1="8"   x2="60" y2="20"  stroke="var(--accent-hover)" strokeWidth="2.5"/>
          <line x1="104" y1="32" x2="93" y2="38"  stroke="var(--accent-hover)" strokeWidth="2.5"/>
          <line x1="104" y1="80" x2="93" y2="74"  stroke="var(--accent-hover)" strokeWidth="2.5"/>
          <line x1="60" y1="104" x2="60" y2="92"  stroke="var(--accent-hover)" strokeWidth="2.5"/>
          <line x1="16" y1="80"  x2="27" y2="74"  stroke="var(--accent-hover)" strokeWidth="2.5"/>
          <line x1="16" y1="32"  x2="27" y2="38"  stroke="var(--accent-hover)" strokeWidth="2.5"/>

          <circle cx="60" cy="56" r="9" fill="var(--accent)" opacity="0.45" className="logos-core-pulse"/>
          <circle cx="60" cy="56" r="4" fill="var(--accent-hover)"/>
        </svg>
        
        {/* Radar sweep effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-50">
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-bottom-left animate-[spin_3s_linear_infinite]"></div>
        </div>
      </div>
      
      {/* Data reads */}
      <div className="absolute -right-12 top-1/4 text-[8px] font-mono text-accent/50 tracking-widest uppercase">
        <p>SEC_01: ONLINE</p>
        <p>SYS_ST: NOMINAL</p>
      </div>

    </div>
  );
}
