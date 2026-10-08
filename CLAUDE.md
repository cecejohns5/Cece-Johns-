# Cece's project #2

## Stack
- Next.js with the App Router, TypeScript, plain CSS (no CSS frameworks).
- Supabase for sign-in and the database.
- Deployed on Vercel. Every pushed branch gets a preview link; merging to main deploys https://cece-johns.vercel.app.

## Commands
- npm run dev: run the site locally
- npm run build: check the site builds
- npm run lint: check code style
(Confirm these against package.json before relying on them.)

## Never
- Add a dependency without asking first.
- Edit .env or any environment variable.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders.
- Merge a pull request. Push the branch, open a draft pull request, and stop.
- Put passwords, API keys, or connection strings in code, prompts, or any file in the repo. They go in Vercel > Settings > Environment Variables only.
- Use real personal data. Fake names and fake content only.
- Edit roadmap.md, project-state.md, or CLAUDE.md during feature work. Only a dedicated docs session edits them.

## Conventions
- Ask before adding a new library, service, or account.
- Explain every change in plain language in the pull request description, so Cece can explain it herself at a live session.
- Flag anything Cece would be embarrassed not to understand if asked about it.
- Keep each pull request to one slice or smaller.

## Current focus
See roadmap.md. Work only on the slice marked ACTIVE.
