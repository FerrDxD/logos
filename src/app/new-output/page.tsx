import PendingOutputList from "@/components/hud/PendingOutputList";
import { getEntries } from "@/app/actions";
import HudBackButton from "@/components/hud/HudBackButton";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "NEW OUTPUT // LOGOS",
};

export default async function NewOutputPage() {
  const allEntries = await getEntries();
  // Filter for pending entries (no output text and no output images)
  const pendingEntries = allEntries.filter(
    (e) => !e.outputText && (!e.outputImages || e.outputImages.length === 0)
  );

  return (
    <div className="absolute inset-0 pt-20 md:pt-24 pb-24 px-6 md:pl-32 md:pr-8 overflow-y-auto z-50">
      <div className="max-w-4xl mx-auto w-full animate-in fade-in zoom-in-95 duration-500 pb-12">
        <HudBackButton />
        <PendingOutputList entries={pendingEntries} />
      </div>
    </div>
  );
}
