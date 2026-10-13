"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase";

function readForm(formData: FormData) {
  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

const notSetUp = "Sign-in is not set up yet.";

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect(`/signup?error=${encodeURIComponent(notSetUp)}`);
  const { error } = await supabase.auth.signUp(readForm(formData));

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/");
}

export async function logIn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect(`/login?error=${encodeURIComponent(notSetUp)}`);
  const { error } = await supabase.auth.signInWithPassword(readForm(formData));

  if (error) {
    redirect("/login?error=Wrong%20email%20or%20password.");
  }
  redirect("/");
}

export async function logOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/");
}
