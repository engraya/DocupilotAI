'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookTemplate, Check } from 'lucide-react';
import type { DocumentMeta } from '@/types/document.types';

const schema = z.object({
  name: z.string().min(2, 'Required'),
  description: z.string().optional(),
  category: z.string().default('General'),
  isPublic: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

const CATEGORIES = ['General', 'Legal', 'Finance', 'HR', 'Marketing', 'Sales'];

export function SaveAsTemplateDialog({ document }: { document: DocumentMeta }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
  });

  const onSubmit = async (data: FormData) => {
    await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        description: data.description ?? null,
        type: document.type,
        category: data.category,
        is_public: data.isPublic,
        content: document.content_json,
      }),
    });
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
    }, 1500);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <BookTemplate className="h-4 w-4 mr-2" />
        Save as Template
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
          </DialogHeader>

          {saved ? (
            <div className="flex items-center justify-center gap-2 py-8 text-green-600">
              <Check className="h-5 w-5" />
              <span>Template saved!</span>
            </div>
          ) : (
            <form
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSubmit={handleSubmit(onSubmit as any)}
              className="space-y-4 py-2"
            >
              <div className="space-y-1.5">
                <Label>Template Name</Label>
                <Input placeholder="My Invoice Template" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label>Description (optional)</Label>
                <Textarea
                  placeholder="Brief description of this template…"
                  rows={2}
                  {...register('description')}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  onValueChange={(val) => setValue('category', val as string)}
                  defaultValue="General"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  className="rounded"
                  {...register('isPublic')}
                />
                <Label htmlFor="isPublic" className="cursor-pointer">
                  Share with community (public)
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save Template'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
