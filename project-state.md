# Project state
Last updated: October 15, 2026

## Works
- A person can open https://cece-johns.vercel.app, click Sign up, and create an account with an email and password.
- After signing up, they get a confirmation email, and clicking its link signs them in. The page then shows "Signed in as" followed by their email.
- They can click Log out, and the page goes back to showing a Log in link with no email.
- If they try to log in with the wrong password, they see an error message and stay logged out. With the right password, they are signed in.
- When signed in, they see a My study tasks section on the home page. They can type a task, choose Reading, Writing, Listening, or Speaking, and click Add; the task appears with its skill label.
- They can tick a task's Done box. It stays ticked after a refresh, and the task is crossed out.
- Their tasks are still there after they log out, close the browser, and log back in.
- Each account sees only its own tasks. A second account does not see the first account's tasks.
- Every task belongs to a list. They can click New list, type a name, and save; the list appears in the list menu.
- When adding a task, they pick its list from a dropdown, and the task shows under that list.
- They look at one list at a time by clicking its name in the list menu; tasks from other lists are not shown.
- Tasks made before lists existed are in a list called My tasks.
- Live Next.js site (App Router, TypeScript, plain CSS) deployed on Vercel at https://cece-johns.vercel.app.
- GitHub repo cecejohns5/Cece-Johns-, default branch main. Merging to main deploys the live site.
- Supabase project at https://grmbdaajxpvxccajjgsc.supabase.co is linked to the repo. The site uses it for sign-up, log-in, and log-out, and stores study tasks and lists in its tasks and lists tables.

## Broken or flaky
- None known.

## Environment notes
- Supabase keys belong only in Vercel > Settings > Environment Variables. They are set there, since sign-in works on the live site.
- Supabase requires email confirmation on sign-up: a new account must click the link in its confirmation email before it is signed in.
- Every pushed branch gets a Vercel preview link on its pull request.

## Next session
- Start Slice 4, Skill balance.
