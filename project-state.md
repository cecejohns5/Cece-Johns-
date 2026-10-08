# Project state
Last updated: October 8, 2026

## Works
- Live Next.js site (App Router, TypeScript, plain CSS) deployed on Vercel at https://cece-johns.vercel.app.
- GitHub repo cecejohns5/AI-Workshop, default branch main. Merging to main deploys the live site.
- Supabase project created at https://grmbdaajxpvxccajjgsc.supabase.co and linked to the repo. The site does not use it yet.

## Broken or flaky
- None known. Not yet checked.

## Environment notes
- Supabase keys belong only in Vercel > Settings > Environment Variables. It is not yet confirmed whether they are set there.
- Supabase may require email confirmation on sign-up by default. Not yet checked.
- Every pushed branch gets a Vercel preview link on its pull request.

## Next session
- Start Slice 1, Sign up and log in.
- Open question: are the Supabase URL and public key already set in Vercel's environment variables?
