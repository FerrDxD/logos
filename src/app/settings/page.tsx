'use client';

import HudBackButton from "@/components/hud/HudBackButton";
import { useHud } from "@/components/hud/HudProvider";
import { Settings2, Palette, Activity } from "lucide-react";

const colors = [
  { name: "CYAN (DEFAULT)", hex: "#4fd8ff" },
  { name: "NEON GREEN", hex: "#39ff14" },
  { name: "AMBER", hex: "#ffb347" },
  { name: "MAGENTA", hex: "#ff00ff" },
  { name: "CRIMSON", hex: "#ff3333" },
];

export default function SettingsPage() {
  const { accentColor, setAccentColor, orbitNodes, setOrbitNodes } = useHud();

  return (
    <div className="absolute inset-0 pt-24 pb-24 pl-24 md:pl-32 pr-8 overflow-y-auto z-50">
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <HudBackButton label="RETURN TO BRIDGE" />
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-3 h-3 bg-accent clip-chamfer animate-pulse"></div>
          <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">System Config</h2>
          <div className="flex-1 h-px bg-accent/20"></div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest flex items-center">
            <Settings2 size={14} className="mr-2" /> CORE SETTINGS
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Outline Color Setting */}
          <div className="bg-surface/60 backdrop-blur-md border border-border p-8 clip-chamfer hud-glow relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
              <Palette size={18} className="text-accent" />
              <h3 className="font-mono text-sm tracking-widest uppercase text-accent">HUD Interface Color</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6 font-sans">
              Select the primary accent color for the Hyperion Bridge UI. This will affect borders, glows, and active states globally.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color.hex)}
                  className={`flex flex-col items-center justify-center p-4 clip-chamfer border transition-all duration-300 ${
                    accentColor.toLowerCase() === color.hex.toLowerCase()
                      ? 'bg-accent/20 border-accent hud-glow-active'
                      : 'bg-background border-border hover:border-accent/50'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full mb-3 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color.hex, color: color.hex }}></div>
                  <span className={`font-mono text-[9px] tracking-widest ${accentColor.toLowerCase() === color.hex.toLowerCase() ? 'text-accent' : 'text-muted-foreground'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="font-display text-8xl">C</span>
            </div>
          </div>

          {/* Radial Hub Objects Setting */}
          <div className="bg-surface/60 backdrop-blur-md border border-border p-8 clip-chamfer hud-glow relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
              <Activity size={18} className="text-accent" />
              <h3 className="font-mono text-sm tracking-widest uppercase text-accent">Radial Hub Nodes</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6 font-sans">
              Adjust the number of orbiting objects in the central Radial Hub on the main dashboard.
            </p>

            <div className="flex items-center gap-6 bg-background/50 p-6 clip-chamfer border border-border">
              <button 
                onClick={() => setOrbitNodes(Math.max(0, orbitNodes - 1))}
                className="w-12 h-12 flex items-center justify-center bg-surface border border-border text-foreground hover:border-accent hover:text-accent clip-chamfer transition-colors text-xl"
              >
                -
              </button>
              
              <div className="flex-1 flex flex-col items-center">
                <span className="font-display text-4xl text-accent mb-2">{orbitNodes}</span>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">ACTIVE ORBITAL NODES</span>
              </div>

              <button 
                onClick={() => setOrbitNodes(Math.min(12, orbitNodes + 1))}
                className="w-12 h-12 flex items-center justify-center bg-surface border border-border text-foreground hover:border-accent hover:text-accent clip-chamfer transition-colors text-xl"
              >
                +
              </button>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="font-display text-8xl">N</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
