# NextTick Live Dashboard

This is your live frontend for `/live-signals`, powered by Supabase + Tailwind + Next.js 14.

## How to Use

1. Add your Supabase keys to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

2. Run locally:

```
npm install
npm run dev
```

3. Deploy on Vercel and add those same env variables in project settings.

You're done. Live signals will show up automatically.
