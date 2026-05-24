<div align="center">

# DocuPilot AI

### Generate professional documents in seconds — powered by Google Gemini.

DocuPilot AI is a full-stack SaaS application that turns a simple form into a polished, export-ready professional document using AI. From invoices and contracts to resumes and NDAs, generate, edit, and share structured documents in seconds — no templates to fill, no formatting to wrestle with.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-22c55e?style=flat-square)]()

</div>

---

## Overview

Professionals waste hours every week drafting, formatting, and exporting documents that follow the same structure every time. DocuPilot AI eliminates that repetition entirely.

You fill out a structured form — client name, project scope, payment terms, whatever the document needs — and the AI generates a fully written, professionally worded document in under 10 seconds. Every section is editable in-browser, re-writable with AI, and exportable as PDF or DOCX with a single click.

**Who it's for:**
- **Freelancers** who need fast, professional contracts, invoices, and proposals
- **Agencies and consultants** managing multiple clients with recurring document needs
- **Startups** handling their own legal and operational paperwork
- **Job seekers** generating polished resumes and cover letters on demand

**What makes it different from AI chat tools:** DocuPilot AI is purpose-built around document structure. Each document type has a tailored form, a custom prompt, and a structured section-based output — not a wall of unformatted AI text.

---

## Features

### Core Document Generation
- **9 document types** — Invoice, Freelancer Contract, NDA, Business Proposal, Quotation, Project Scope, Resume, Cover Letter, Employment Letter
- **Form-driven generation** — type-specific forms with field validation ensure the AI receives clean, structured input
- **Structured output** — documents are stored as JSON arrays of titled sections, not raw text blobs
- **Section-level editing** — edit, reorder, and update individual sections independently

### AI Capabilities
- **Powered by Google Gemini** — uses `gemini-2.0-flash` for fast, cost-efficient generation
- **5 AI edit actions per section** — Rewrite, Simplify, Make Professional, Summarize, and Translate
- **Deterministic output** — documents are returned as validated JSON, not streamed markdown
- **Context-aware prompts** — each document type has a custom-engineered prompt that feeds user input into the generation

### Export & Sharing
- **PDF export** — server-side rendering via `@react-pdf/renderer` with clean typography and layout
- **DOCX export** — downloadable Word document via the `docx` library with proper headings and formatting
- **Shareable links** — generate a read-only, token-based shareable URL for any document without requiring the recipient to log in

### Authentication & User Management
- **Supabase Auth** — email/password authentication with full session management
- **Password reset flow** — forgot password and reset password pages
- **Protected routes** — server-side middleware enforces authentication on all dashboard routes
- **User profiles** — per-user tier, usage tracking, and Stripe customer ID

### Subscription & Billing
- **Freemium model** — free tier allows 3 documents per month; premium is unlimited
- **Monthly usage reset** — automatic reset via Supabase RPC function
- **Stripe Checkout** — one-click upgrade to premium with hosted Stripe payment flow
- **Stripe Billing Portal** — self-serve subscription management, cancellation, and invoice history
- **Webhook-driven tier sync** — Stripe webhooks keep subscription state in sync in real time

### Template System
- **Save as template** — save any generated document as a reusable template
- **Template marketplace** — browse public templates across all document categories
- **Template reuse** — create new documents from existing templates to skip the form

### Developer Experience
- **Type-safe throughout** — TypeScript with strict mode, Zod validation on all API inputs
- **Schema registry pattern** — all document types registered in a single manifest with forms, prompts, icons, and metadata
- **Path aliases** — `@/*` resolves to `src/` across the entire codebase
- **Dark mode** — `next-themes` with system preference support and localStorage persistence

### UI & Responsiveness
- **shadcn/ui components** — accessible, customizable component library built on Radix UI
- **Tailwind CSS v4** — utility-first styling with CSS variable-driven theming
- **Responsive layout** — sidebar collapses to a mobile sheet on small screens
- **Toast notifications** — Sonner for non-intrusive status feedback

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Components) |
| **Language** | TypeScript 5 (strict mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4, shadcn/ui (base-nova), Lucide React icons |
| **AI Provider** | Google Gemini API (`@google/genai`) |
| **Authentication** | Supabase Auth (SSR session cookies) |
| **Database** | Supabase (PostgreSQL with Row-Level Security) |
| **Payments** | Stripe (Checkout, Billing Portal, Webhooks) |
| **Form Handling** | react-hook-form + Zod |
| **PDF Export** | @react-pdf/renderer (server-side) |
| **DOCX Export** | docx library |
| **Notifications** | Sonner |
| **Theme** | next-themes |
| **Utilities** | clsx, tailwind-merge, date-fns, nanoid, file-saver |
| **Deployment** | Vercel (recommended) |

---

## Architecture

### How a Document Gets Generated

```
User fills form
      │
      ▼
/api/ai/generate (POST)
      │
      ├── Check usage limit (Supabase profiles table)
      │       free: 3/month ─── premium: unlimited
      │
      ├── Build prompt
      │       buildDocumentPrompt(type, formData)
      │       └── type-specific prompt template
      │
      ├── Call Google Gemini API
      │       model: gemini-2.0-flash
      │       responseMimeType: application/json
      │       temperature: 0.7 / maxOutputTokens: 4096
      │
      ├── Parse JSON → DocumentSection[]
      │
      ├── Save to Supabase (documents table)
      │       form_data + content_json stored as JSONB
      │
      └── Increment usage_count
              ▼
      Redirect → /documents/[id]
```

### Route Architecture

The app uses Next.js route groups to separate layout concerns:

- `(auth)/` — unauthenticated pages with branded split-panel layout
- `(dashboard)/` — all protected pages behind middleware auth check
- `(public)/` — landing and pricing pages with no auth dependency
- `api/` — REST API routes for AI, documents, export, Stripe, and templates
- `shared/[token]` — public read-only document view (no auth required)

### Data Model

```
profiles
  id (uuid, FK → auth.users)
  email, full_name, avatar_url
  tier: 'free' | 'premium' | 'admin'
  usage_count: int
  usage_reset_at: timestamptz
  stripe_customer_id: text

documents
  id (uuid)
  user_id (FK → profiles)
  type: DocumentType
  title: text
  form_data: jsonb
  content_json: jsonb   ← array of { id, title, content }
  status: 'draft' | 'final'
  created_at, updated_at

templates
  id (uuid)
  user_id (FK → profiles)
  name, type, description
  content: jsonb
  is_public: boolean
  category: text
  use_count: int
  created_at
```

---

## Project Structure

```
docupilot-ai/
├── src/
│   ├── app/
│   │   ├── (auth)/                   # Login, register, forgot/reset password, OAuth callback
│   │   ├── (dashboard)/              # Protected: dashboard, documents, templates, settings
│   │   │   ├── dashboard/            # Stats, recent documents
│   │   │   ├── documents/
│   │   │   │   ├── new/              # Document type picker + generation form
│   │   │   │   └── [id]/             # Section editor with AI tools
│   │   │   ├── templates/            # Template marketplace
│   │   │   └── settings/
│   │   │       └── billing/          # Subscription management
│   │   ├── (public)/                 # Landing page, pricing
│   │   ├── api/
│   │   │   ├── ai/generate/          # Gemini document generation
│   │   │   ├── ai/edit/              # Gemini section edit
│   │   │   ├── documents/            # CRUD for documents
│   │   │   ├── export/pdf/           # Server-side PDF rendering
│   │   │   ├── export/docx/          # DOCX generation
│   │   │   ├── stripe/checkout/      # Stripe checkout session
│   │   │   ├── stripe/portal/        # Stripe billing portal
│   │   │   ├── stripe/webhook/       # Stripe event handler
│   │   │   └── templates/            # Template CRUD
│   │   └── shared/[token]/           # Public read-only document view
│   ├── components/
│   │   ├── ui/                       # shadcn/ui primitives
│   │   ├── auth/                     # Login, register, password forms
│   │   ├── documents/                # Editor, form, type picker, AI toolbar, export menu
│   │   ├── dashboard/                # Sidebar, top nav, stats cards, document cards
│   │   ├── billing/                  # Plan cards, upgrade dialog, portal button
│   │   ├── templates/                # Template card, save-as-template dialog
│   │   └── providers/                # ThemeProvider
│   ├── hooks/
│   │   ├── useUser.ts                # Auth state + profile subscription
│   │   ├── useAIGenerate.ts          # Document generation handler
│   │   ├── useSubscription.ts        # Usage gating logic
│   │   └── useDocuments.ts           # Document list state
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── gemini.ts             # Gemini SDK wrapper
│   │   │   ├── edit-actions.ts       # AI edit action dispatch
│   │   │   └── prompts/              # Per-type prompt builders
│   │   ├── document-schemas/         # Zod schemas + field configs per document type
│   │   ├── export/
│   │   │   ├── pdf.ts                # PDF renderer
│   │   │   └── docx.ts               # DOCX builder
│   │   ├── stripe/
│   │   │   ├── server.ts             # Stripe SDK init
│   │   │   └── webhook-handlers.ts   # Subscription event handlers
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── server.ts             # Server + service role clients
│   │   │   └── middleware.ts         # Session refresh middleware
│   │   └── utils.ts                  # cn(), formatDate(), checkUsageLimit(), etc.
│   ├── types/
│   │   ├── document.types.ts         # DocumentType, DocumentSection, TemplateMeta
│   │   ├── ai.types.ts               # AI request/response types, AIError
│   │   └── stripe.types.ts           # PlanTier, Plan, PLANS constant
│   └── middleware.ts                 # Route protection + auth redirect logic
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Server externals, image domains
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key (Gemini)
- A [Stripe](https://stripe.com) account (test mode is fine for local dev)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/docupilot-ai.git
cd docupilot-ai

# Install dependencies
npm install
```

### Environment Variables

Copy the example below into a `.env.local` file in the project root and fill in your credentials.

```env
# ─── Supabase ──────────────────────────────────────────────────────────────────
# Found in: Supabase Dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Server-only. Never expose to client.

# ─── Google Gemini ─────────────────────────────────────────────────────────────
# Found in: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key

# ─── Stripe ────────────────────────────────────────────────────────────────────
# Found in: Stripe Dashboard → Developers → API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...          # From Stripe CLI or webhook endpoint
STRIPE_PREMIUM_PRICE_ID=price_...        # Your Premium plan price ID

# ─── App ───────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase Setup

1. Create a new Supabase project.
2. Run the following SQL to create the required tables and enable Row-Level Security:

```sql
-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  tier text default 'free' check (tier in ('free', 'premium', 'admin')),
  usage_count int default 0,
  usage_reset_at timestamptz default now(),
  stripe_customer_id text
);

-- Documents table
create table documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text not null,
  title text,
  form_data jsonb,
  content_json jsonb,
  status text default 'draft' check (status in ('draft', 'final')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Templates table
create table templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  type text not null,
  description text,
  content jsonb,
  is_public boolean default false,
  category text,
  use_count int default 0,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table documents enable row level security;
alter table templates enable row level security;

-- RLS policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can manage own documents" on documents for all using (auth.uid() = user_id);
create policy "Users can manage own templates" on templates for all using (auth.uid() = user_id);
create policy "Public templates are readable" on templates for select using (is_public = true);

-- Auto-create profile on user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- RPC: lazy monthly usage reset
create or replace function reset_monthly_usage_if_due(user_id uuid)
returns void as $$
begin
  update profiles
  set usage_count = 0, usage_reset_at = now()
  where id = user_id
    and usage_reset_at < date_trunc('month', now());
end;
$$ language plpgsql security definer;
```

3. In Supabase Auth settings, set your **Site URL** to `http://localhost:3000` and add `http://localhost:3000/callback` as a redirect URL.

### Stripe Setup

1. Create a product in Stripe with a recurring monthly price.
2. Copy the price ID into `STRIPE_PREMIUM_PRICE_ID`.
3. For local webhook testing, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This prints a webhook signing secret — paste it into `STRIPE_WEBHOOK_SECRET`.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

---

## API Reference

All API routes live under `/api/`. Dashboard routes require a valid Supabase session cookie. The Stripe webhook route is excluded from auth middleware and verified by signature instead.

### AI

#### `POST /api/ai/generate`

Generate a new document using Gemini AI.

```json
// Request
{
  "type": "invoice",
  "formData": {
    "invoiceNumber": "INV-001",
    "issuerName": "Acme Corp",
    "clientName": "Client Ltd",
    "lineItems": [{ "description": "Web design", "quantity": 1, "rate": 2500 }]
  }
}

// Response
{
  "documentId": "uuid",
  "sections": [
    { "id": "a1b2c3d4", "title": "Invoice Details", "content": "..." },
    { "id": "e5f6g7h8", "title": "Line Items", "content": "..." }
  ]
}

// Error — usage limit reached
{ "error": "limit_reached", "message": "Monthly document limit reached." }
```

#### `POST /api/ai/edit`

Rewrite a single document section using a specified action.

```json
// Request
{
  "sectionId": "a1b2c3d4",
  "content": "Current section content...",
  "action": "make_professional"
}

// Response
{ "content": "Revised section content..." }
```

Valid `action` values: `rewrite` · `simplify` · `make_professional` · `summarize` · `translate`

### Documents

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/documents` | List all documents for the authenticated user |
| `POST` | `/api/documents` | Create a new document |
| `GET` | `/api/documents/[id]` | Fetch a single document |
| `PUT` | `/api/documents/[id]` | Update document content or metadata |
| `DELETE` | `/api/documents/[id]` | Delete a document |
| `POST` | `/api/documents/[id]/share` | Generate a shareable read-only link |

### Export

#### `POST /api/export/pdf`

Returns a rendered PDF binary.

```json
// Request
{ "documentId": "uuid" }
// Response: Content-Type: application/pdf
```

#### `POST /api/export/docx`

Returns a rendered DOCX binary.

```json
// Request
{ "documentId": "uuid" }
// Response: Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

### Stripe

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/stripe/checkout` | Create a Stripe Checkout session, returns redirect URL |
| `POST` | `/api/stripe/portal` | Create a Stripe Billing Portal session, returns redirect URL |
| `POST` | `/api/stripe/webhook` | Stripe event handler (no auth, signature-verified) |

**Handled Stripe events:** `checkout.session.completed` · `customer.subscription.updated` · `customer.subscription.deleted` · `invoice.paid` · `invoice.payment_failed`

### Templates

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/templates` | List templates (own + public) |
| `POST` | `/api/templates` | Save a new template |
| `GET` | `/api/templates/[id]` | Fetch a single template |
| `PUT` | `/api/templates/[id]` | Update a template |
| `DELETE` | `/api/templates/[id]` | Delete a template |

---

## AI System

### Document Generation

Every document type has a dedicated prompt builder in [src/lib/ai/prompts/](src/lib/ai/prompts/). These are not generic prompts — they are structured templates that map the user's form input to a precise, well-scoped instruction.

**System instruction sent to Gemini:**
> You are an expert professional document writer. Generate a complete, professional document as a JSON array of sections. Return ONLY valid JSON. Each section: `{ id: string, title: string, content: string }`.

The model is called with `responseMimeType: 'application/json'` to enforce structured output without markdown wrapping or code fences.

### AI Edit Actions

| Action | Behavior |
|---|---|
| **Rewrite** | Rephrases the section while preserving the meaning |
| **Simplify** | Reduces complexity and removes jargon |
| **Make Professional** | Elevates tone to formal, business-grade language |
| **Summarize** | Condenses the section to its key points |
| **Translate** | Translates the content to a target language |

### Model Configuration

```typescript
// Document generation
temperature: 0.7
maxOutputTokens: 4096

// Section editing
temperature: 0.5
maxOutputTokens: 2048
```

Lower temperature for editing produces more conservative, predictable rewrites without drifting from the original intent.

---

## Performance

- **Server Components by default** — data fetching happens on the server; no client-side loading waterfalls for initial renders
- **Server-side PDF and DOCX rendering** — both export libraries are declared as server external packages in `next.config.ts`, keeping them out of the client bundle entirely
- **Supabase SSR** — sessions managed via HTTP-only cookies with automatic refresh in middleware, no client-side token overhead
- **Zod validation at the boundary** — all API inputs validated before hitting the database or AI provider
- **Lazy monthly reset** — usage counters reset lazily on the next generation request via an RPC call, eliminating the need for scheduled jobs
- **JSON-typed AI responses** — requesting `application/json` from Gemini cuts response parsing to zero and reduces output token count compared to markdown-wrapped responses

---

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` to the Vercel project settings.
4. Deploy.

For production Stripe webhooks, create a new webhook endpoint in the Stripe Dashboard pointing to `https://your-domain.com/api/stripe/webhook` and copy the signing secret into your Vercel env vars.

> **Note:** This project requires a Node.js runtime. Do not set any routes to the Edge runtime — the PDF and DOCX export libraries require Node.js APIs.

### Any Node.js Host

```bash
npm run build
npm run start
```

---

## Screenshots

> _Replace the placeholders below with actual screenshots._

**Landing Page**
![Landing Page](public/screenshots/landing.png)

**Dashboard**
![Dashboard](public/screenshots/dashboard.png)

**Document Generation Form**
![Document Form](public/screenshots/document-form.png)

**AI Document Editor**
![Document Editor](public/screenshots/editor.png)

**Export & Share**
![Export Menu](public/screenshots/export.png)

**Billing & Upgrade**
![Billing Page](public/screenshots/billing.png)

---

## Developer Notes

### Schema Registry Pattern

All document type configuration lives in a single registry in [src/lib/document-schemas/](src/lib/document-schemas/). Each type exports a Zod schema, an ordered field descriptor array, a prompt builder function, and display metadata (label, icon, color). Adding a new document type means adding one file and registering it — the form, the AI prompt, and the UI all derive from that single source.

### Usage Gating

`checkUsageLimit()` in [src/lib/utils.ts](src/lib/utils.ts) is the single source of truth for plan enforcement. It runs in the API route before any Gemini request, so limits are enforced server-side regardless of client state. The monthly reset happens lazily via `reset_monthly_usage_if_due()` on the same request cycle.

### Stripe Webhook Idempotency

Webhook handlers receive Stripe events and update the `profiles` table using the service role key (bypassing RLS). Each handler upserts rather than inserts to handle Stripe's at-least-once delivery guarantee safely.

### Client vs. Server Supabase Clients

- [src/lib/supabase/client.ts](src/lib/supabase/client.ts) — browser client with the anon key, used in client components and custom hooks
- [src/lib/supabase/server.ts](src/lib/supabase/server.ts) — exports `createClient()` (anon key, for server components and API routes) and `createServiceClient()` (service role key, used only in Stripe webhook handlers where RLS bypass is required)

Never import `createServiceClient()` from client components.

---

## Roadmap

- [ ] Google OAuth sign-in (scaffolding exists, currently disabled)
- [ ] Document version history and revision tracking
- [ ] Team workspaces with shared document libraries
- [ ] Admin dashboard for user and usage management
- [ ] Webhook-based document generation API for paying users
- [ ] Custom branding on exported PDFs (logo upload, color scheme)
- [ ] AI-assisted form fill from a plain-text description
- [ ] Email delivery of exported documents directly from the editor

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request for non-trivial changes.

```bash
# Fork and clone
git clone https://github.com/your-username/docupilot-ai.git
cd docupilot-ai

# Create a branch
git checkout -b feature/your-feature-name

# Make changes, then lint before pushing
npm run lint

# Open a pull request against main
```

**Code conventions:**
- TypeScript strict mode — no `any`, no unchecked non-null assertions
- All API inputs validated with Zod before use
- Components in `src/components/`, hooks in `src/hooks/`, server logic in `src/lib/`
- `SUPABASE_SERVICE_ROLE_KEY` and `STRIPE_SECRET_KEY` must never appear in client-side code

---

## License

MIT © [Engraya](https://github.com/Engraya)
