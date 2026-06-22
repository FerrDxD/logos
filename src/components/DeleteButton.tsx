'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteEntry } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.')) {
      setIsDeleting(true);
      try {
        await deleteEntry(id);
        router.push('/');
      } catch (error) {
        console.error(error);
        alert('Gagal menghapus data.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center p-2 rounded bg-surface border border-border text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-colors tooltip"
      title="Hapus"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
