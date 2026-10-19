import Link from "next/link";
import { createClient } from "../_lib/supabase";
import { logOut } from "../_lib/auth-actions";

// Build this page fresh for each visit, since it depends on who is signed in.
export const dynamic = "force-dynamic";

// The Account tab: who is signed in and a Log out button, or links to log in
// and sign up.
export default async function AccountPage() {
  const supabase = await createClient();
  const user = supabase
    ? (await supabase.auth.getUser()).data.user
    : null;

  return (
    <main>
      <h2>Account</h2>
      {user ? (
        <>
          <p>Signed in as {user.email}</p>
          <form action={logOut}>
            <button type="submit">Log out</button>
          </form>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <p className="account-links">
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </p>
        </>
      )}
    </main>
  );
}
