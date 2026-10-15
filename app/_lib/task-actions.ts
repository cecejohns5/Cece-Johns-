"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase";
import { SKILLS } from "./skills";

// Adds a task for whoever is signed in. Supabase fills in user_id itself,
// and its rules refuse a task saved under anyone else's account.
export async function addTask(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/");

  const title = String(formData.get("title") ?? "").trim();
  const skill = String(formData.get("skill") ?? "");
  if (!title || !SKILLS.includes(skill)) {
    redirect("/?error=Type%20a%20task%20and%20choose%20a%20skill.");
  }

  const { error } = await supabase.from("tasks").insert({ title, skill });
  if (error) {
    redirect("/?error=Could%20not%20add%20the%20task.");
  }
  revalidatePath("/");
  redirect("/");
}

// Ticks or unticks a task's Done box. Supabase only lets an account change
// its own tasks, so another account's task id does nothing.
export async function setDone(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/");

  const id = Number(formData.get("id"));
  const done = formData.get("done") === "on";

  const { error } = await supabase.from("tasks").update({ done }).eq("id", id);
  if (error) {
    redirect("/?error=Could%20not%20save%20that%20change.");
  }
  revalidatePath("/");
  redirect("/");
}
