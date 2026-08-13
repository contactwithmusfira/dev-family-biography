# living-echoes-platform

Living Echoes Digital Biography Platform — Phase 1

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
