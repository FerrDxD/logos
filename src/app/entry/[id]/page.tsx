import { getEntryById } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Bot, Calendar, Edit, Database } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";
import CopyButton from "@/components/CopyButton";
import HudBackButton from "@/components/hud/HudBackButton";

export default async function EntryDetailPage({ params }: { params: { id: string } }) {
  const entry = await getEntryById(params.id);
  
  if (!entry) {
    notFound();
  }

  return (
    <div className="absolute inset-0 pt-24 pb-24 pl-24 md:pl-32 pr-8 overflow-y-auto z-50">
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        
        <div className="flex items-center justify-between mb-8">
          <HudBackButton />
          
          <div className="flex items-center gap-3">
            <Link href={`/entry/${entry.id}/edit`} className="inline-flex items-center justify-center p-2 bg-surface/50 border border-border text-muted-foreground clip-chamfer hover:border-accent/50 hover:text-accent hud-glow transition-colors" title="Edit Sequence">
              <Edit size={16} />
            </Link>
            <div className="clip-chamfer">
              <DeleteButton id={entry.id} />
            </div>
          </div>
        </div>

        <div className="bg-surface/60 backdrop-blur-md border border-border p-8 clip-chamfer hud-glow relative overflow-hidden">
          
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-border/50 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-[10px] font-mono tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 clip-chamfer">
                <Bot size={14} className="mr-2" />
                {entry.aiTool}
              </div>
              <div className="flex items-center text-[10px] font-mono tracking-widest text-muted-foreground">
                <Calendar size={14} className="mr-2" />
                {format(new Date(entry.createdAt), 'dd.MM.yyyy // HH:mm:ss')}
              </div>
            </div>
            
            <div className="flex items-center text-[10px] font-mono tracking-widest text-primary">
              <Database size={14} className="mr-2" />
              ID: {entry.id.split('-')[0]}
            </div>
          </div>
          
          {/* Prompt Section */}
          <div className="space-y-4 mb-12 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent clip-chamfer"></div>
                <h3 className="text-[10px] font-mono tracking-widest text-accent uppercase">Primary Directive [Prompt]</h3>
              </div>
              <CopyButton text={entry.prompt} />
            </div>
            <div className="bg-background/50 border border-border p-6 clip-chamfer whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed text-foreground/90">
              {entry.prompt}
            </div>
          </div>

          {/* Output Section */}
          {entry.outputText && (
            <div className="space-y-4 mb-12 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary clip-chamfer"></div>
                  <h3 className="text-[10px] font-mono tracking-widest text-primary uppercase">Output Telemetry</h3>
                </div>
                <CopyButton text={entry.outputText} />
              </div>
              <div className="bg-background/50 border border-border p-6 clip-chamfer whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                {entry.outputText}
              </div>
            </div>
          )}

          {/* Images Section */}
          {entry.outputImages && entry.outputImages.length > 0 && (
            <div className="space-y-4 mb-12 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert clip-chamfer"></div>
                <h3 className="text-[10px] font-mono tracking-widest text-alert uppercase">Visual Data</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {entry.outputImages.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden clip-chamfer border border-border hover:border-alert/50 transition-colors">
                    <img src={url} alt={`Visual Data ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags Section */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="pt-6 border-t border-border/50 relative z-10">
              <div className="flex flex-wrap gap-2">
                {entry.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-background border border-border text-muted-foreground clip-chamfer font-mono text-[9px] tracking-widest uppercase hover:border-accent/30 hover:text-accent/80 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <span className="font-display text-9xl">L</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
