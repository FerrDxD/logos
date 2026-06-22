import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { entries } from './schema';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config({ path: '.env' });
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env or .env.local");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log('Seeding database...');

  await db.insert(entries).values([
    {
      prompt: "Buatkan saya kerangka artikel blog tentang filosofi Stoicism dalam programming. Target pembaca adalah developer yang sering stress karena deadline.",
      outputText: "Berikut kerangka artikelnya:\n\n1. **Pendahuluan**: Mengapa programming membuat stress (deadline, bug, klien yang tidak jelas).\n2. **Apa itu Stoicism?**: Pengantar singkat tentang Dikotomi Kendali (Dichotomy of Control).\n3. **Menerapkan Stoicism dalam Code**: Fokus pada apa yang bisa dikontrol (kualitas kode, testing) dan melepaskan yang tidak (server down, perubahan requirement mendadak).\n4. **Amor Fati (Cintai Takdirmu)**: Menyikapi bug bukan sebagai musuh, tapi sebagai puzzle untuk diselesaikan.\n5. **Kesimpulan**: Menjadi 'Zen Developer'.",
      outputImages: [],
      aiTool: "Claude 3.5 Sonnet",
      tags: ["Blog", "Philosophy", "Outline"],
    },
    {
      prompt: "Generate a futuristic, minimalist landing page design for an AI personal assistant app. Dark mode, neon blue accents.",
      outputText: null,
      outputImages: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"],
      aiTool: "Midjourney v6",
      tags: ["Design", "Landing Page", "Dark Mode"],
    },
    {
      prompt: "Tulis fungsi TypeScript untuk menghitung Fibonacci sequence menggunakan memoization.",
      outputText: "```typescript\nfunction fibonacci(n: number, memo: Record<number, number> = {}): number {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  \n  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);\n  return memo[n];\n}\n\nconsole.log(fibonacci(50));\n```\nFungsi di atas menggunakan teknik memoization dengan menyimpan hasil komputasi ke dalam object `memo` untuk menghindari rekursi yang berulang (O(N) time complexity).",
      outputImages: [],
      aiTool: "Gemini 1.5 Pro",
      tags: ["TypeScript", "Algorithm", "Code Snippet"],
    }
  ]);

  console.log('Seeding completed!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
