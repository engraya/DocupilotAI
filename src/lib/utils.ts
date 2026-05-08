import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM d, yyyy');
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '…' : str;
}

export interface UsageLimitResult {
  allowed: boolean;
  remaining: number;
}

export function checkUsageLimit(profile: {
  tier: string;
  usage_count: number;
}): UsageLimitResult {
  if (profile.tier === 'premium' || profile.tier === 'admin') {
    return { allowed: true, remaining: Infinity };
  }
  const FREE_LIMIT = 3;
  const remaining = Math.max(0, FREE_LIMIT - profile.usage_count);
  return { allowed: profile.usage_count < FREE_LIMIT, remaining };
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
