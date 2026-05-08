'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { documentSchemaRegistry } from '@/lib/document-schemas/index';
import type { DocumentType } from '@/types/document.types';
import { UpgradeDialog } from '@/components/billing/UpgradeDialog';
import { useSubscription } from '@/hooks/useSubscription';

export function DocumentForm({ documentType }: { documentType: DocumentType }) {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { usageAllowed } = useSubscription();

  const registry = documentSchemaRegistry[documentType];

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registry.schema as any),
    defaultValues: registry.hasLineItems
      ? { lineItems: [{ description: '', quantity: '1', rate: '' }] }
      : {},
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lineItems' as never,
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!usageAllowed) {
      setShowUpgrade(true);
      return;
    }

    setGenerating(true);
    setError(null);

    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentType, formData: data }),
    });

    setGenerating(false);

    if (!res.ok) {
      const body = await res.json();
      if (body.error === 'limit_reached') {
        setShowUpgrade(true);
      } else {
        setError(body.error ?? 'Generation failed. Please try again.');
      }
      return;
    }

    const { document } = await res.json();
    router.push(`/documents/${document.id}`);
  };

  if (generating) {
    return (
      <div className="space-y-4 py-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-5 w-5 animate-pulse text-primary" />
          <span>AI is generating your document…</span>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
      <form onSubmit={form.handleSubmit(onSubmit as never)} className="space-y-5">
        {registry.fields.map((field) => {
          const err = (form.formState.errors as Record<string, { message?: string } | undefined>)[field.name];

          if (field.type === 'select' && field.options) {
            return (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.optional && <span className="text-muted-foreground ml-1">(optional)</span>}
                </Label>
                <Select
                  onValueChange={(val) => form.setValue(field.name as never, val as never)}
                  defaultValue={field.options[0]?.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.optional && <span className="text-muted-foreground ml-1">(optional)</span>}
                </Label>
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  rows={4}
                  {...form.register(field.name as never)}
                />
                {err && <p className="text-sm text-destructive">{String(err.message)}</p>}
              </div>
            );
          }

          return (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>
                {field.label}
                {field.optional && <span className="text-muted-foreground ml-1">(optional)</span>}
              </Label>
              <Input
                id={field.name}
                placeholder={field.placeholder}
                {...form.register(field.name as never)}
              />
              {err && <p className="text-sm text-destructive">{String(err.message)}</p>}
            </div>
          );
        })}

        {registry.hasLineItems && (
          <div className="space-y-3">
            <Label>Line Items</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-end">
                <Input
                  placeholder="Description"
                  {...form.register(`lineItems.${index}.description` as never)}
                />
                <Input
                  placeholder="Qty"
                  className="w-20"
                  {...form.register(`lineItems.${index}.quantity` as never)}
                />
                <Input
                  placeholder="Rate"
                  className="w-28"
                  {...form.register(`lineItems.${index}.rate` as never)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ description: '', quantity: '1', rate: '' } as never)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add item
            </Button>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" size="lg">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </form>
    </>
  );
}
