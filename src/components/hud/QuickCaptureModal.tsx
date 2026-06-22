'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createEntry } from '@/app/actions';
import { Terminal, X } from 'lucide-react';

export default function QuickCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Abort on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createEntry({
        prompt: input,
        outputText: null,
        outputImages: [],
        aiTool: 'SYSTEM_RAW',
        tags: ['RAW_DATA']
      });
      setInput('');
      setIsOpen(false);
      
      // Delay refresh slightly to allow DB to update
      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-auto pb-24 md:pb-0">
      <div className="w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-8 md:zoom-in-95 duration-200">
        
        <form onSubmit={handleSubmit} className="relative bg-surface border border-accent clip-chamfer hud-glow-active flex flex-col overflow-hidden">
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-accent/30 bg-accent/10">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-accent" />
              <span className="font-mono text-[10px] tracking-widest text-accent uppercase">Data Intercept Override</span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="text-accent/50 hover:text-accent transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="p-6 flex items-start gap-4">
            <span className="font-mono text-accent mt-1">{'>'}</span>
            <textarea
              ref={inputRef as any}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isSubmitting}
              className="flex-1 h-32 md:h-24 bg-transparent border-none text-foreground font-mono text-sm tracking-wide focus:outline-none focus:ring-0 placeholder:text-muted-foreground/30 resize-none"
              placeholder="PASTE RAW DATA HERE... (Press Enter to execute)"
            />
          </div>

          {isSubmitting && (
            <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex items-center justify-center">
              <span className="font-mono text-[10px] text-accent tracking-widest uppercase animate-pulse">Transmitting Data...</span>
            </div>
          )}
        </form>

        <div className="mt-6 flex justify-between px-2">
          <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">PRESS ESC TO ABORT</span>
          <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">PRESS ENTER TO EXECUTE</span>
        </div>

      </div>
    </div>
  );
}
