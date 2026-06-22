'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEntry, updateEntry, uploadImage } from '@/app/actions';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Entry } from '@/lib/db/schema';

type EntryFormData = {
  prompt: string;
  outputText: string;
  outputImages: string[];
  aiTool: string;
  tags: string[];
};

export default function EntryForm({ initialData, mode = 'full' }: { initialData?: Entry, mode?: 'prompt' | 'output' | 'full' }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  const [data, setData] = useState<EntryFormData>({
    prompt: initialData?.prompt || '',
    outputText: initialData?.outputText || '',
    outputImages: initialData?.outputImages || [],
    aiTool: initialData?.aiTool || '',
    tags: initialData?.tags || [],
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!data.tags.includes(tagInput.trim())) {
        setData({ ...data, tags: [...data.tags, tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setData({ ...data, tags: data.tags.filter(t => t !== tagToRemove) });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    try {
      const newUrls = [...data.outputImages];
      for (const file of Array.from(e.target.files)) {
        const formData = new FormData();
        formData.append('file', file);
        const url = await uploadImage(formData);
        newUrls.push(url);
      }
      setData({ ...data, outputImages: newUrls });
    } catch (error) {
      console.error('Failed to upload image', error);
      alert('Gagal mengupload gambar. Pastikan token Vercel Blob sudah diatur.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    setData({ ...data, outputImages: data.outputImages.filter(url => url !== urlToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.prompt.trim() || !data.aiTool.trim()) {
      alert('Prompt dan AI Tool tidak boleh kosong.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateEntry(initialData.id, data);
      } else {
        await createEntry(data);
      }
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface/60 backdrop-blur-md border border-accent/30 p-6 md:p-8 clip-chamfer hud-glow relative">
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent"></div>
      
      {/* AI Tool */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-1">AI Link Protocol</label>
        <input 
          type="text" 
          value={data.aiTool}
          onChange={e => setData({...data, aiTool: e.target.value})}
          placeholder="Contoh: Gemini 1.5 Pro, Claude 3.5 Sonnet..."
          className="w-full px-4 py-3 bg-background/50 border border-border clip-chamfer text-foreground font-mono focus:outline-none focus:border-accent hud-glow-active transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
          required
          disabled={mode === 'output'}
        />
      </div>

      {/* Prompt */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-1">Primary Prompt Directive</label>
        <textarea 
          value={data.prompt}
          onChange={e => setData({...data, prompt: e.target.value})}
          placeholder="Tuliskan prompt yang Anda gunakan di sini..."
          className="w-full h-32 px-4 py-3 bg-background/50 border border-border clip-chamfer text-foreground font-mono text-sm focus:outline-none focus:border-accent hud-glow-active transition-all resize-y placeholder:text-muted-foreground/50 disabled:opacity-50"
          required
          disabled={mode === 'output'}
        />
      </div>

      {mode !== 'prompt' && (
        <>
          {/* Output Text */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-1">Output Telemetry (Optional)</label>
            <textarea 
              value={data.outputText}
              onChange={e => setData({...data, outputText: e.target.value})}
              placeholder="Hasil teks dari AI..."
              className="w-full h-32 px-4 py-3 bg-background/50 border border-border clip-chamfer text-foreground font-mono text-sm focus:outline-none focus:border-accent hud-glow-active transition-all resize-y placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Output Images */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-1">Visual Data (Optional)</label>
            
            <div className="flex flex-wrap gap-4 mt-2">
              {data.outputImages.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="Output" className="h-24 w-24 object-cover rounded-lg border border-border" />
                  <button 
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute -top-2 -right-2 bg-foreground text-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              <label className="h-24 w-24 flex flex-col items-center justify-center border border-dashed border-accent/50 bg-background/50 clip-chamfer cursor-pointer hover:bg-accent/10 hover:border-accent hud-glow transition-all text-accent">
                {uploading ? <Loader2 className="animate-spin" size={24} /> : <ImageIcon size={24} />}
                <span className="text-xs mt-1">{uploading ? '...' : 'Upload'}</span>
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>
        </>
      )}

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-1">Categorization Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent border border-accent/30 clip-chamfer font-mono text-[10px] tracking-wider">
              {tag}
              {mode !== 'output' && (
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 text-accent/50 hover:text-accent">
                  <X size={14} />
                </button>
              )}
            </span>
          ))}
        </div>
        {mode !== 'output' && (
          <input 
            type="text" 
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Ketik tag dan tekan Enter..."
            className="w-full px-4 py-3 bg-background/50 border border-border clip-chamfer text-foreground font-mono focus:outline-none focus:border-accent hud-glow-active transition-all placeholder:text-muted-foreground/50"
          />
        )}
      </div>

      {/* Submit */}
      <div className="pt-4 flex justify-end gap-4">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-transparent font-display text-sm tracking-widest text-muted-foreground border border-border clip-chamfer hover:text-accent hover:border-accent transition-all"
        >
          ABORT
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-8 py-2.5 bg-accent/20 font-display text-sm tracking-widest text-accent border border-accent clip-chamfer hover:bg-accent hover:text-background hud-glow transition-all disabled:opacity-50 flex items-center"
        >
          {isSubmitting && <Loader2 className="animate-spin mr-2" size={16} />}
          {mode === 'prompt' ? 'SAVE PROMPT TO QUEUE' : mode === 'output' ? 'CONFIRM OUTPUT' : 'UPDATE SEQUENCE'}
        </button>
      </div>
    </form>
  );
}
