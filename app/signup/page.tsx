import AuthForm from "../_lib/AuthForm";
import { signUp } from "../_lib/auth-actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthForm
      title="Sign up"
      action={signUp}
      buttonLabel="Sign up"
      error={error}
    />
  );
}
