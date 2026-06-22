'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { Entry } from '@/lib/db/schema';
import EntryCard from './EntryCard';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function EntryListContent({ initialEntries }: { initialEntries: Entry[] }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q');
  
  const [search, setSearch] = useState(queryParam || '');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (queryParam) {
      setSearch(queryParam);
    }
  }, [queryParam]);

  // Extract unique tags for the filter
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialEntries.forEach(e => e.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [initialEntries]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredEntries = useMemo(() => {
    return initialEntries.filter(entry => {
      const matchesSearch = search === '' || 
        entry.prompt.toLowerCase().includes(search.toLowerCase()) ||
        (entry.outputText && entry.outputText.toLowerCase().includes(search.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(t => entry.tags?.includes(t));
      
      return matchesSearch && matchesTags;
    });
  }, [initialEntries, search, selectedTags]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center" id="search">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="ENTER SEARCH QUERY..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface/60 backdrop-blur-sm border border-border clip-chamfer text-foreground font-mono text-sm tracking-widest placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent hud-glow-active transition-all"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2" id="tags">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1.5 font-mono text-[10px] tracking-widest clip-chamfer border transition-all duration-300 ${
                selectedTags.includes(tag) 
                  ? 'bg-accent/20 border-accent text-accent hud-glow' 
                  : 'bg-background border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filteredEntries.length === 0 ? (
        <div className="text-center py-20 bg-surface/30 border border-border clip-chamfer relative overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(79,216,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
          <Search size={32} className="text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground font-mono tracking-widest text-sm uppercase">DATABASE QUERY RETURNED NO RESULTS.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EntryList({ initialEntries }: { initialEntries: Entry[] }) {
  return (
    <Suspense fallback={<div className="animate-pulse text-accent font-mono text-xs">LOADING DATABASE CORE...</div>}>
      <EntryListContent initialEntries={initialEntries} />
    </Suspense>
  );
}
