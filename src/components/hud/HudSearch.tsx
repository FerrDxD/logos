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
    <div className="absolute left-1/2 top-28 md:top-auto md:bottom-24 -translate-x-1/2 w-[90%] md:max-w-md z-40">
      <form onSubmit={handleSearch} className={`relative flex items-center bg-surface/90 backdrop-blur-xl border rounded-full transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${
        focused ? 'border-accent hud-glow-active' : 'border-accent/30'
      }`}>
        <button type="submit" className="pl-6 cursor-pointer hover:text-accent transition-colors">
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
        <div className={`px-6 border-l ${focused ? 'border-accent/50 text-accent' : 'border-accent/30 text-muted-foreground'}`}>
          <ChevronRight size={20} />
        </div>
      </form>
    </div>
  );
}
