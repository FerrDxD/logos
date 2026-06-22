import { getEntryById } from "@/app/actions";
import EntryForm from "@/components/EntryForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Edit Entry - LOGOS",
};

export default async function EditEntryPage({ params }: { params: { id: string } }) {
  const entry = await getEntryById(params.id);
  
  if (!entry) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center mb-6">
        <Link href={`/entry/${entry.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-4">
          <ArrowLeft size={16} className="mr-2" />
          Batal
        </Link>
        <h2 className="text-2xl font-serif text-foreground">Edit Entry</h2>
      </div>
      <EntryForm initialData={entry} />
    </div>
  );
}
