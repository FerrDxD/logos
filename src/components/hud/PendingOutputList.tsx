'use client';

import { useState } from 'react';
import EntryForm from '@/components/EntryForm';
import { Entry } from '@/lib/db/schema';
import { format } from 'date-fns';
import { Database, AlertCircle } from 'lucide-react';

export default function PendingOutputList({ entries }: { entries: Entry[] }) {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  if (selectedEntry) {
    return (
      <div className="animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-primary clip-chamfer animate-pulse"></div>
            <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">Append Record</h2>
          </div>
          <button 
            onClick={() => setSelectedEntry(null)}
            className="px-4 py-1.5 font-mono text-[10px] border border-border text-muted-foreground hover:text-accent hover:border-accent clip-chamfer transition-colors"
          >
            RETURN TO QUEUE
          </button>
        </div>
        <div className="h-px w-full bg-primary/20 mb-8"></div>
        <EntryForm initialData={selectedEntry} mode="output" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-3 h-3 bg-alert clip-chamfer animate-pulse"></div>
        <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">Pending Queue</h2>
        <div className="flex-1 h-px bg-alert/20"></div>
      </div>

      {entries.length === 0 ? (
        <div className="bg-surface/50 border border-border clip-chamfer p-12 text-center flex flex-col items-center justify-center">
          <AlertCircle size={32} className="text-muted-foreground mb-4" />
          <p className="font-mono text-muted-foreground tracking-widest text-sm">NO PENDING RECORDS IN QUEUE.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(entry => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="group text-left bg-surface/60 border border-border p-5 clip-chamfer hover:bg-primary/10 hover:border-primary hud-glow transition-all flex flex-col"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="font-mono text-[10px] text-primary tracking-widest px-2 py-0.5 bg-primary/10 border border-primary/20 clip-chamfer">
                  {entry.aiTool}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {format(new Date(entry.createdAt), 'MMM dd, HH:mm')}
                </span>
              </div>
              
              <p className="font-sans text-sm text-foreground line-clamp-3 mb-4 flex-1">
                {entry.prompt}
              </p>
              
              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/50 group-hover:border-primary/30 transition-colors w-full">
                <Database size={12} className="text-muted-foreground group-hover:text-primary" />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  AWAITING OUTPUT TELEMETRY
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
