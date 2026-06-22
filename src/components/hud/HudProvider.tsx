'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type HudContextType = {
  accentColor: string;
  setAccentColor: (color: string) => void;
  orbitNodes: number;
  setOrbitNodes: (nodes: number) => void;
};

const HudContext = createContext<HudContextType | undefined>(undefined);

export function HudProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColor] = useState('#4fd8ff');
  const [orbitNodes, setOrbitNodes] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('hud-accent') || '#4fd8ff';
    const savedNodes = parseInt(localStorage.getItem('hud-nodes') || '3', 10);
    setAccentColor(savedColor);
    setOrbitNodes(savedNodes);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty('--accent', accentColor);
      
      const hex = accentColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
      
      localStorage.setItem('hud-accent', accentColor);
      localStorage.setItem('hud-nodes', orbitNodes.toString());
    }
  }, [accentColor, orbitNodes, mounted]);

  return (
    <HudContext.Provider value={{ accentColor, setAccentColor, orbitNodes, setOrbitNodes }}>
      {children}
    </HudContext.Provider>
  );
}

export function useHud() {
  const context = useContext(HudContext);
  if (!context) throw new Error('useHud must be used within a HudProvider');
  return context;
}
