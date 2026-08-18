# living-echoes-platform

Living Echoes Digital Biography Platform — Phase 1

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` (or `.env`) and fill in values from the Supabase and Stripe dashboards.

Required now:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`

Stripe keys are required from Milestone 2 checkout work onward.

**Never commit real keys.** `.env*` is gitignored.

## Supabase setup

### 1. Environment

1. Create a Supabase project (free tier is fine for development).
2. Copy project URL + publishable/secret keys into `.env`.

### 2. Supabase CLI (recommended)

The CLI lives as a dev dependency. Use it to apply and track migrations from `supabase/migrations/`.

**One-time setup** (run from project root):

```bash
# Log in to the Supabase account that owns this project
npm run supabase login

# Link this repo to your remote project (ref is in your project URL)
npm run supabase link -- --project-ref YOUR_PROJECT_REF
```

Your project ref is the subdomain in `NEXT_PUBLIC_SUPABASE_URL`  
(e.g. `https://vrfztjlprydasgexugrw.supabase.co` → ref is `vrfztjlprydasgexugrw`).

**If you already applied the initial schema manually** (SQL Editor), mark it as applied so the CLI stays in sync:

```bash
npm run supabase migration repair -- --status applied 20250817000000
```

**Apply new migrations** (after schema changes):

```bash
npm run db:push
```

**Useful commands:**

| Command | Purpose |
|---------|---------|
| `npm run db:status` | List migrations and whether they ran on remote |
| `npm run db:push` | Apply pending migrations to linked remote project |
| `npm run db:pull` | Pull remote schema changes into a new migration file |
| `npm run db:diff -- new_migration_name` | Generate a migration from local vs remote diff |

### 3. Verify

Confirm `organizations` has one seeded row (`Living Echoes`, `is_primary = true`).

Supabase client utilities live in [`src/lib/supabase/`](src/lib/supabase/).

## Database design (Phase 1)

**8 tables** (plus Supabase `auth.users`):

| Table | Role |
|-------|------|
| `organizations` | Tenant (branch). Its `id` is used as `tenant_id` elsewhere. |
| `profiles` | Global user identity (1:1 with `auth.users`). **No** `tenant_id`. |
| `organization_members` | Staff ↔ org join (`role`: admin, moderator, …). Composite PK `(organization_id, user_id)`. |
| `families` | Customer account container. |
| `family_members` | User ↔ family join. Composite PK `(family_id, user_id)`. |
| `biographies` | Memorial content under a family. |
| `media` | Photos/videos under a biography. |
| `orders` | Stripe purchase records. |

**Tenancy rule:** `tenant_id` on every tenant-scoped table. Exceptions: `organizations` (it *is* the tenant) and `profiles` (global identity; tenancy comes from memberships).

    ```mermaid
    erDiagram
        ORGANIZATIONS ||--o{ ORGANIZATION_MEMBERS : has_staff
        PROFILES ||--o{ ORGANIZATION_MEMBERS : is_staff_in
        ORGANIZATIONS ||--o{ FAMILIES : owns
        FAMILIES ||--o{ FAMILY_MEMBERS : has
        PROFILES ||--o{ FAMILY_MEMBERS : is_member_of
        FAMILIES ||--o{ BIOGRAPHIES : contains
        BIOGRAPHIES ||--o{ MEDIA : contains
        FAMILIES ||--o{ ORDERS : has

        ORGANIZATIONS {
            uuid id PK
            text name
            text slug
            bool is_primary
            bool is_active
        }

        PROFILES {
            uuid id PK "FK auth.users"
            text full_name
            bool is_platform_admin
            bool is_active
        }

        ORGANIZATION_MEMBERS {
            uuid organization_id PK_FK
            uuid user_id PK_FK
            text role
            bool is_active
        }

        FAMILIES {
            uuid id PK
            uuid tenant_id FK
            text name
            text status
            text primary_contact_email
            text primary_contact_name
            text primary_contact_phone
        }

        FAMILY_MEMBERS {
            uuid family_id PK_FK
            uuid user_id PK_FK
            uuid tenant_id FK
            text relationship_label
            bool is_active
        }

        BIOGRAPHIES {
            uuid id PK
            uuid family_id FK
            uuid tenant_id FK
            text full_name
            text story
            text status
            timestamptz approved_at
        }

        MEDIA {
            uuid id PK
            uuid biography_id FK
            uuid family_id FK
            uuid tenant_id FK
            text media_type
            text storage_path
            text caption
            bool is_published
            int sort_order
        }

        ORDERS {
            uuid id PK
            uuid family_id FK
            uuid tenant_id FK
            text stripe_checkout_session_id
            text stripe_payment_intent_id
            int amount_total
            text currency
            text status
            text customer_name
            text customer_email
            text customer_phone
        }
    ```
