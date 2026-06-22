import HudBackButton from "@/components/hud/HudBackButton";

export const metadata = {
  title: "TAGS // LOGOS",
};

const tagCategories = [
  {
    name: "Teknologi",
    color: "border-blue-500/50 text-blue-400 bg-blue-500/10",
    tags: ["AI", "Blockchain", "Web3", "Cloud", "Cybersecurity", "IoT", "Quantum", "AR/VR", "Robotics", "5G", "SaaS", "DevOps", "Machine Learning", "Data Science", "API"]
  },
  {
    name: "Kreativitas",
    color: "border-purple-500/50 text-purple-400 bg-purple-500/10",
    tags: ["Design", "Art", "Writing", "Music", "Video", "Animation", "Photography", "Branding", "UI/UX", "Copywriting", "Storytelling", "Illustration", "Typography", "Concept Art"]
  },
  {
    name: "Fashion",
    color: "border-pink-500/50 text-pink-400 bg-pink-500/10",
    tags: ["Streetwear", "Haute Couture", "Sustainable", "Vintage", "Accessories", "Footwear", "Textiles", "Runway", "Minimalist", "Techwear", "Avant-garde", "Jewelry", "Styling"]
  },
  {
    name: "Gaya Hidup",
    color: "border-green-500/50 text-green-400 bg-green-500/10",
    tags: ["Health", "Fitness", "Travel", "Mindfulness", "Productivity", "Home Decor", "Minimalism", "Finance", "Hobbies", "Wellness", "Sustainability", "Meditation", "Outdoors", "Books", "Gaming"]
  },
  {
    name: "Makanan",
    color: "border-orange-500/50 text-orange-400 bg-orange-500/10",
    tags: ["Recipes", "Vegan", "Baking", "Restaurants", "Coffee", "Meal Prep", "Street Food", "Fine Dining", "Nutrition", "Desserts", "Cocktails", "Culinary Arts", "Seafood", "BBQ"]
  },
  {
    name: "Koneksi",
    color: "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
    tags: ["Networking", "Social Media", "Community", "Relationships", "Events", "Communication", "Collaboration", "Mentorship", "Public Speaking", "Culture", "Leadership", "Teamwork", "Empathy", "Psychology"]
  },
  {
    name: "Coding",
    color: "border-cyan-500/50 text-cyan-400 bg-cyan-500/10",
    tags: ["React", "Next.js", "TypeScript", "Python", "Rust", "Go", "Node.js", "Tailwind", "PostgreSQL", "Docker", "Kubernetes", "GraphQL", "WebAssembly", "C++", "Java"]
  }
];

export default function TagsPage() {
  const totalTags = tagCategories.reduce((acc, cat) => acc + cat.tags.length, 0);

  return (
    <div className="absolute inset-0 pt-20 md:pt-24 pb-24 px-6 md:pl-32 md:pr-8 overflow-y-auto z-50">
      <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <HudBackButton label="RETURN TO BRIDGE" />
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-3 h-3 bg-accent clip-chamfer animate-pulse"></div>
          <h2 className="text-3xl font-display text-foreground tracking-widest uppercase">Tag Index</h2>
          <div className="flex-1 h-px bg-accent/20"></div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            {totalTags} TAGS ACTIVE
          </div>
        </div>

        <div className="space-y-12">
          {tagCategories.map((category) => (
            <div key={category.name} className="bg-surface/30 border border-border p-6 clip-chamfer relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-2">
                <div className="w-2 h-2 bg-accent clip-chamfer"></div>
                <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.tags.map(tag => (
                  <div key={tag} className={`px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase clip-chamfer border cursor-pointer transition-all duration-300 hover:scale-105 ${category.color}`}>
                    {tag}
                  </div>
                ))}
              </div>
              
              {/* Background Scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent translate-y-[-100%] hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
