// The email + password form shared by the Log in and Sign up pages.
export default function AuthForm({
  title,
  action,
  buttonLabel,
  error,
}: {
  title: string;
  action: (formData: FormData) => Promise<void>;
  buttonLabel: string;
  error?: string;
}) {
  return (
    <main>
      <h2>{title}</h2>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <form action={action} className="auth-form">
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={
              buttonLabel === "Sign up" ? "new-password" : "current-password"
            }
          />
        </label>
        <button type="submit">{buttonLabel}</button>
      </form>
    </main>
  );
}
