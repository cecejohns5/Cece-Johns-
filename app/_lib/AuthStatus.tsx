import Link from "next/link";
import { createClient } from "./supabase";
import { logOut } from "./auth-actions";

// The bar at the top of every page: who is signed in, or links to sign in.
export default async function AuthStatus() {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <nav className="auth-bar">
        <span>Sign-in is not set up: Supabase settings are missing.</span>
      </nav>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="auth-bar">
      {user ? (
        <>
          <span>Signed in as {user.email}</span>
          <form action={logOut}>
            <button type="submit">Log out</button>
          </form>
        </>
      ) : (
        <>
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </>
      )}
    </nav>
  );
}
