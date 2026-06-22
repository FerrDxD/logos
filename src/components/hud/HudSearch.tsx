'use client';

import { Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HudSearch() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/archive?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="absolute left-1/2 bottom-32 -translate-x-1/2 w-full max-w-md z-40">
      <form onSubmit={handleSearch} className={`relative flex items-center bg-surface/80 backdrop-blur-md border clip-chamfer transition-all duration-300 ${
        focused ? 'border-accent hud-glow-active' : 'border-border'
      }`}>
        <button type="submit" className="pl-4 cursor-pointer hover:text-accent transition-colors">
          <Search size={18} className={focused ? 'text-accent' : 'text-muted-foreground'} />
        </button>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER QUERY DESIGNATION..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border-none text-foreground font-mono text-sm tracking-widest placeholder:text-muted-foreground/50 px-4 py-3 focus:outline-none focus:ring-0"
        />
        <div className={`px-4 border-l ${focused ? 'border-accent/50 text-accent' : 'border-border text-muted-foreground'}`}>
          <ChevronRight size={20} />
        </div>
      </form>
      
      {/* Decorative scanning line under search */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 flex items-center opacity-50">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-accent/80"></div>
        <div className="w-2 h-2 bg-accent clip-chamfer mx-1"></div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-accent/80"></div>
      </div>
    </div>
  );
}
