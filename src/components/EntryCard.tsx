import Link from 'next/link';
import { Entry } from '@/lib/db/schema';
import { format } from 'date-fns';
import { Bot, Image as ImageIcon } from 'lucide-react';

export default function EntryCard({ entry }: { entry: Entry }) {
  const hasImages = entry.outputImages && entry.outputImages.length > 0;
  
  return (
    <Link href={`/entry/${entry.id}`} className="block group">
      <div className="bg-surface/60 backdrop-blur-md border border-border p-6 clip-chamfer hover:border-accent/80 hover:bg-accent/10 hover:hud-glow transition-all duration-500 h-full flex flex-col relative overflow-hidden">
        
        <div className="flex items-start justify-between mb-5 border-b border-border/50 pb-2">
          <div className="flex items-center text-[10px] font-mono tracking-widest text-accent uppercase">
            <Bot size={12} className="mr-2" />
            {entry.aiTool}
          </div>
          <div className="text-[9px] font-mono tracking-widest text-muted-foreground">
            {format(new Date(entry.createdAt), 'dd.MM.yyyy / HH:mm')}
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-foreground line-clamp-4 leading-relaxed font-sans text-sm mb-4 group-hover:text-white transition-colors">
            {entry.prompt}
          </p>
        </div>

        {hasImages && (
          <div className="mb-4 flex items-center text-[9px] font-mono tracking-widest text-accent bg-accent/10 border border-accent/20 w-max px-2 py-1 clip-chamfer">
            <ImageIcon size={12} className="mr-2" />
            VISUAL DATA: {entry.outputImages?.length}
          </div>
        )}

        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
            {entry.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-background border border-border text-muted-foreground clip-chamfer group-hover:border-accent/30 group-hover:text-accent/80 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </Link>
  );
}
