import EntryForm from "@/components/EntryForm";
import HudBackButton from "@/components/hud/HudBackButton";

export const metadata = {
  title: "NEW PROMPT // LOGOS",
};

export default function NewPromptPage() {
  return (
    <div className="absolute inset-0 pt-20 md:pt-24 pb-24 px-6 md:pl-32 md:pr-8 overflow-y-auto z-50">
      <div className="max-w-4xl mx-auto w-full animate-in fade-in zoom-in-95 duration-500 pb-12">
        <HudBackButton />
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 bg-accent clip-chamfer animate-pulse"></div>
          <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">Initialize Sequence</h2>
          <div className="flex-1 h-px bg-accent/20"></div>
        </div>
        <EntryForm mode="prompt" />
      </div>
    </div>
  );
}
