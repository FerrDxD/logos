'use server';

import { db } from '@/lib/db';
import { entries } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createEntry(data: {
  prompt: string;
  outputText: string | null;
  outputImages: string[];
  aiTool: string;
  tags: string[];
}) {
  await db.insert(entries).values({
    prompt: data.prompt,
    outputText: data.outputText,
    outputImages: data.outputImages,
    aiTool: data.aiTool,
    tags: data.tags,
  });
  
  revalidatePath('/');
}

export async function updateEntry(id: string, data: {
  prompt: string;
  outputText: string | null;
  outputImages: string[];
  aiTool: string;
  tags: string[];
}) {
  await db.update(entries).set({
    prompt: data.prompt,
    outputText: data.outputText,
    outputImages: data.outputImages,
    aiTool: data.aiTool,
    tags: data.tags,
    updatedAt: new Date(),
  }).where(eq(entries.id, id));
  
  revalidatePath('/');
  revalidatePath(`/entry/${id}`);
}

export async function deleteEntry(id: string) {
  await db.delete(entries).where(eq(entries.id, id));
  revalidatePath('/');
}

export async function getEntries() {
  const query = db.select().from(entries).orderBy(desc(entries.createdAt));
  
  // Filtering logic can be added here if needed, 
  // but for simplicity it can also be handled on the client or via refined queries.
  // Actually, Drizzle allows conditional where clauses:
  // let conditions = [];
  // if (searchQuery) conditions.push(or(ilike(entries.prompt, `%${searchQuery}%`), ilike(entries.outputText, `%${searchQuery}%`)));
  // if (tagFilters?.length) conditions.push(arrayContains(entries.tags, tagFilters));
  
  return await query;
}

export async function getEntryById(id: string) {
  const result = await db.select().from(entries).where(eq(entries.id, id)).limit(1);
  return result[0] || null;
}

import { put } from '@vercel/blob';

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');
  
  const blob = await put(file.name, file, { access: 'public' });
  return blob.url;
}
