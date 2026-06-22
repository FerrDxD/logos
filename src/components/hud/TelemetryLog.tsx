'use client';

import { Entry } from '@/lib/db/schema';
import { format } from 'date-fns';
import Link from 'next/link';

export default function TelemetryLog({ entries }: { entries: Entry[] }) {
  // Take top 8 and reverse them so the newest is at the bottom
  const recentEntries = entries.slice(0, 8).reverse();

  return (
    <div className="absolute left-6 md:left-24 bottom-6 md:bottom-24 w-64 md:w-80 z-30 pointer-events-none">
      <div className="flex items-center gap-2 mb-4 opacity-70">
        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
        <span className="font-mono text-[8px] text-accent tracking-widest uppercase">Live Telemetry Feed</span>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent"></div>
      </div>
      
      <div className="flex flex-col gap-2.5">
        {recentEntries.map((entry, i) => {
          const isPending = !entry.outputText && (!entry.outputImages || entry.outputImages.length === 0);
          const actionText = isPending ? 'SEQ_INITIALIZED' : 'TELEMETRY_APPEND';
          const colorClass = isPending ? 'text-accent' : 'text-primary';
          const opacity = (i + 1) / recentEntries.length; // 1.0 for newest (bottom), 0.125 for oldest (top)

          return (
            <div 
              key={entry.id} 
              className="font-mono text-[9px] leading-tight flex gap-2 transition-opacity pointer-events-auto hover:opacity-100! group"
              style={{ opacity }}
            >
              <span className="text-muted-foreground shrink-0 opacity-50">[{format(new Date(entry.createdAt), 'HH:mm:ss')}]</span>
              <div className="flex-1 truncate">
                <span className="text-muted-foreground opacity-50">SYS: </span>
                <Link href={`/entry/${entry.id}`} className={`${colorClass} hover:underline transition-colors group-hover:text-white`}>
                  {actionText} <span className="opacity-50">({entry.aiTool.substring(0, 10)})</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
