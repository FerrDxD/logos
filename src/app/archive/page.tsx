import { getEntries } from "@/app/actions";
import EntryList from "@/components/EntryList";
import HudBackButton from "@/components/hud/HudBackButton";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "ARCHIVE // LOGOS",
};

export default async function ArchivePage() {
  const entries = await getEntries();
  
  return (
    <div className="absolute inset-0 pt-24 pb-24 pl-24 md:pl-32 pr-8 overflow-y-auto z-50">
      <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        
        <HudBackButton label="RETURN TO BRIDGE" />

        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 bg-accent clip-chamfer animate-pulse"></div>
          <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">System Archive</h2>
          <div className="flex-1 h-px bg-accent/20"></div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            {entries.length} RECORDS FOUND
          </div>
        </div>

        <EntryList initialEntries={entries} />

      </div>
    </div>
  );
}
