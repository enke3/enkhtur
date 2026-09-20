# Enkhee Enkhbat — Portfolio

A single-page portfolio site. Plain HTML, CSS, and JavaScript, no build step, no dependencies.

## Files

- `index.html` — page content and structure
- `style.css` — theme, layout, and all animations (starfield, hover states, scroll reveal, the full-screen menu)
- `script.js` — menu open/close logic and the scroll-triggered reveal animations

## Run it locally

Just open `index.html` in a browser, or serve it so relative paths and fonts behave exactly like they will in production:

```bash
npx serve .
```

## Deploy to Vercel

**Option A — Vercel CLI (fastest, no GitHub needed)**

```bash
npm install -g vercel
vercel
```

Follow the prompts (link or create a project, accept the defaults — it's a static site, so no build command or output directory is needed). Running `vercel --prod` promotes it to your production URL.

**Option B — GitHub + Vercel dashboard**

1. Create a new empty repo on GitHub (don't initialize it with a README).
2. Push this repo to it:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. In the [Vercel dashboard](https://vercel.com/new), import that GitHub repo. Framework preset: "Other" (static). No build command needed.

Either way, every push to `main` will redeploy automatically once the project is linked.
