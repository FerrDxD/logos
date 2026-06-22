'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-surfaceHover border border-transparent hover:border-border"
    >
      {copied ? <Check size={14} className="mr-1.5 text-green-500" /> : <Copy size={14} className="mr-1.5" />}
      {copied ? 'Tersalin' : 'Salin'}
    </button>
  );
}
