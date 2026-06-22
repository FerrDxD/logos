import { getEntries } from "./actions";
import RadialHub from "@/components/hud/RadialHub";
import ActionPanel from "@/components/hud/ActionPanel";
import HudSearch from "@/components/hud/HudSearch";
import TelemetryLog from "@/components/hud/TelemetryLog";
import EntryList from "@/components/EntryList";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const entries = await getEntries();
  
  return (
    <>
      <RadialHub />
      <ActionPanel />
      <HudSearch />
      <TelemetryLog entries={entries} />

      {/* Main Content Area */}
      <div className="absolute inset-0 pt-24 pb-24 pl-32 pr-80 overflow-y-auto hidden">
        <EntryList initialEntries={entries} />
      </div>
    </>
  );
}
