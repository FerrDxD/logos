import HudBackButton from "@/components/hud/HudBackButton";
import { PenTool, Search, Image as ImageIcon, Code, Sparkles, Video, Bot, Box } from "lucide-react";

export const metadata = {
  title: "MODELS // LOGOS",
};

const modelCategories = [
  {
    name: "Coding & Development",
    icon: Code,
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    models: [
      { name: "Claude 3.5 Sonnet", desc: "Anthropic's best model for coding and logic" },
      { name: "GPT-4o", desc: "OpenAI's versatile multimodal model" },
      { name: "DeepSeek Coder V2", desc: "Highly capable open-weight coding model" },
      { name: "Qwen2.5-Coder", desc: "Alibaba's specialized coding LLM" },
      { name: "Cursor", desc: "AI-first code editor powered by multiple models" },
      { name: "Aider", desc: "AI pair programming in your terminal" },
      { name: "GitHub Copilot", desc: "Inline coding assistant" },
      { name: "Phind", desc: "Intelligent search engine for developers" }
    ]
  },
  {
    name: "Autonomous AI Agents",
    icon: Bot,
    color: "text-green-400 border-green-500/30 bg-green-500/10",
    models: [
      { name: "Devin", desc: "The first fully autonomous AI software engineer" },
      { name: "AutoGPT", desc: "Experimental open-source attempt to make GPT-4 fully autonomous" },
      { name: "CrewAI", desc: "Framework for orchestrating role-playing, collaborative AI agents" },
      { name: "AutoGen", desc: "Microsoft's framework for multi-agent conversation frameworks" },
      { name: "OpenHands (OpenDevin)", desc: "Open-source autonomous AI software engineer" },
      { name: "MetaGPT", desc: "Multi-agent framework that takes a single line requirement and outputs PRD, design, and code" },
      { name: "SWE-agent", desc: "Princeton's agent that turns LMs into software engineers" }
    ]
  },
  {
    name: "General LLMs & Text",
    icon: PenTool,
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    models: [
      { name: "Claude 3 Opus", desc: "Exceptional for long-form writing and nuanced tone" },
      { name: "Llama 3.1 405B", desc: "Meta's flagship open-source frontier model" },
      { name: "Gemini 1.5 Pro", desc: "Massive 2M token context window" },
      { name: "Command R+", desc: "Cohere's enterprise-grade RAG and tool-use model" },
      { name: "Mistral Large 2", desc: "Top-tier proprietary model from Mistral AI" },
      { name: "Grok-2", desc: "xAI's frontier model with real-time X data access" },
      { name: "Jasper", desc: "Marketing-focused AI copywriter" }
    ]
  },
  {
    name: "Local & Open Weights",
    icon: Box,
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    models: [
      { name: "Llama 3.1 8B/70B", desc: "Highly efficient models for local deployment" },
      { name: "Mistral NeMo", desc: "12B model built in collaboration with NVIDIA" },
      { name: "Phi-3 Mini", desc: "Microsoft's highly capable 3.8B small language model" },
      { name: "Gemma 2", desc: "Google's open weights model based on Gemini tech" },
      { name: "Ollama", desc: "Tool to get up and running with large language models locally" },
      { name: "LM Studio", desc: "Desktop app to discover, download, and run local LLMs" }
    ]
  },
  {
    name: "Research & Analysis",
    icon: Search,
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    models: [
      { name: "Perplexity AI", desc: "Real-time web search and synthesis engine" },
      { name: "NotebookLM", desc: "Google's personalized AI research assistant" },
      { name: "Consensus", desc: "AI search engine for scientific research" },
      { name: "Elicit", desc: "Research assistant for analyzing academic papers" },
      { name: "SciSpace", desc: "AI copilot for reading and understanding research papers" },
      { name: "ChatPDF", desc: "Analyze and summarize PDF documents instantly" }
    ]
  },
  {
    name: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    models: [
      { name: "Flux.1", desc: "Black Forest Labs' state-of-the-art open image model" },
      { name: "Midjourney v6", desc: "Photorealistic and highly artistic generations" },
      { name: "Ideogram", desc: "Exceptional at generating accurate text within images" },
      { name: "DALL-E 3", desc: "Excellent prompt adherence via ChatGPT" },
      { name: "Stable Diffusion 3", desc: "Open-source, highly customizable generation" },
      { name: "Krea AI", desc: "Real-time generation and upscaling tool" }
    ]
  },
  {
    name: "Video, Audio & 3D",
    icon: Video,
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    models: [
      { name: "Runway Gen-3 Alpha", desc: "Professional AI video editing and generation" },
      { name: "Sora", desc: "OpenAI's hyper-realistic video generation (Preview)" },
      { name: "Kling AI", desc: "Kuaishou's highly realistic video generation model" },
      { name: "Luma Dream Machine", desc: "Fast, high-quality video generation" },
      { name: "Suno", desc: "Full song generation from text prompts" },
      { name: "Udio", desc: "High-fidelity music creation and generation" },
      { name: "ElevenLabs", desc: "Ultra-realistic voice synthesis and cloning" },
      { name: "Meshy", desc: "Generate 3D models from text or images" }
    ]
  }
];

export default function ModelsPage() {
  return (
    <div className="absolute inset-0 pt-24 pb-24 pl-24 md:pl-32 pr-8 overflow-y-auto z-50">
      <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <HudBackButton label="RETURN TO BRIDGE" />
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-3 h-3 bg-accent clip-chamfer animate-pulse"></div>
          <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">AI Model Registry</h2>
          <div className="flex-1 h-px bg-accent/20"></div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            {modelCategories.reduce((acc, cat) => acc + cat.models.length, 0)} MODELS INDEXED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modelCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className={`bg-surface/30 border p-6 clip-chamfer relative overflow-hidden transition-all hover:bg-surface/60 ${category.color.split(' ')[1]}`}>
                <div className="flex items-center gap-3 mb-6 border-b border-current/20 pb-3">
                  <Icon size={18} className={category.color.split(' ')[0]} />
                  <h3 className={`font-mono text-sm tracking-widest uppercase ${category.color.split(' ')[0]}`}>{category.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.models.map(model => (
                    <div key={model.name} className="group">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-mono text-xs tracking-wider text-foreground group-hover:text-accent transition-colors">{model.name}</span>
                        <div className="flex-1 border-b border-dashed border-border/50 mx-3 opacity-30"></div>
                        <Sparkles size={10} className="text-muted-foreground group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <p className="font-sans text-[11px] text-muted-foreground line-clamp-1">{model.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
