import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopStatusStrip from "@/components/hud/TopStatusStrip";
import SideIconRail from "@/components/hud/SideIconRail";
import BottomBar from "@/components/hud/BottomBar";
import { HudProvider } from "@/components/hud/HudProvider";
import QuickCaptureModal from "@/components/hud/QuickCaptureModal";
import { getEntries } from "@/app/actions";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-display" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "LOGOS // ARCHIVE",
  description: "Personal Prompt Archive",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const entries = await getEntries();
  const totalEntries = entries.length;
  const totalOutputs = entries.filter(e => e.outputText || (e.outputImages && e.outputImages.length > 0)).length;
  const uniqueModels = new Set(entries.map(e => e.aiTool)).size;

  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable} bg-background text-foreground h-screen w-screen overflow-hidden antialiased`}>
        <div className="relative w-full h-full p-4 md:p-6 flex flex-col">
          <HudProvider>
            {/* Subtle vignette / edge shadow */}
            <div className="pointer-events-none fixed inset-0 shadow-[inset_0_0_100px_rgba(7,11,20,0.5)] z-50"></div>
            
            <TopStatusStrip totalEntries={totalEntries} totalOutputs={totalOutputs} activeModels={uniqueModels} />
            <SideIconRail />

            <main className="flex-1 relative z-10 w-full h-full flex flex-col pt-12 md:pt-0">
              {children}
            </main>
            
            <QuickCaptureModal />
          </HudProvider>
        </div>
      </body>
    </html>
  );
}
