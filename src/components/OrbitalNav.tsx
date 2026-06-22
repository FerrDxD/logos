'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, Tag, Cpu, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'new', label: 'Entry Baru', icon: Plus, href: '/new' },
  { id: 'search', label: 'Cari', icon: Search, href: '/#search' },
  { id: 'tags', label: 'Semua Tag', icon: Tag, href: '/#tags' },
  { id: 'tools', label: 'AI Tools', icon: Cpu, href: '/#tools' },
];

export default function OrbitalNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Avoid hydration mismatch

  // Configuration
  const radius = isHome ? 120 : 60; 
  const centerSize = isHome ? 100 : 50;
  const nodeSize = isHome ? 60 : 40;
  
  return (
    <div className={`relative flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHome ? 'h-80 my-12' : 'h-32 my-4 fixed top-4 right-4 z-50 transform scale-75 origin-top-right'}`}>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <radialGradient id="lineGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r={radius} fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_60s_linear_infinite] origin-center" />
      </svg>

      {/* Nodes */}
      {navItems.map((item, index) => {
        // Calculate angle
        const angle = (index * (360 / navItems.length)) * (Math.PI / 180);
        // Calculate position
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`absolute flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent shadow-sm hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-accent/40 transition-all duration-500 group
            `}
            style={{
              width: `${nodeSize}px`,
              height: `${nodeSize}px`,
              transform: `translate(${x}px, ${y}px)`,
            }}
            title={item.label}
          >
            <Icon size={isHome ? 20 : 16} className="transition-transform group-hover:scale-110" />
            
            {/* Tooltip for desktop home view */}
            {isHome && (
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium tracking-wide whitespace-nowrap text-foreground bg-surface px-2 py-1 rounded shadow-sm border border-border pointer-events-none">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}

      {/* Center LOGOS Hub */}
      <Link 
        href="/"
        className={`absolute flex flex-col items-center justify-center rounded-full bg-background border border-border shadow-lg hover:border-accent hover:shadow-accent/30 transition-all duration-500 z-10
        `}
        style={{
          width: `${centerSize}px`,
          height: `${centerSize}px`,
        }}
      >
        {isHome ? (
          <>
            <span className="font-serif text-2xl tracking-widest bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
              L
            </span>
          </>
        ) : (
          <Home size={20} className="text-muted-foreground hover:text-accent transition-colors" />
        )}
      </Link>
      
      {isHome && (
        <div className="absolute -bottom-6 text-center">
          <h1 className="font-serif text-3xl tracking-widest text-foreground mt-4 mb-2">LOGOS</h1>
          <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">Prinsip & Gagasan</p>
        </div>
      )}
      
    </div>
  );
}
