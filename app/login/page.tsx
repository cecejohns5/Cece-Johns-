import AuthForm from "../_lib/AuthForm";
import { logIn } from "../_lib/auth-actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthForm title="Log in" action={logIn} buttonLabel="Log in" error={error} />
  );
}
