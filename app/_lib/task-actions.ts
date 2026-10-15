"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase";
import { SKILLS } from "./skills";
import { isValidDate } from "./due-dates";

// Sends the visitor back to the home page, showing one list and,
// if something went wrong, a short error message.
function backTo(listId: number | null, error?: string): never {
  const params = new URLSearchParams();
  if (listId) params.set("list", String(listId));
  if (error) params.set("error", error);
  const query = params.toString();
  redirect(query ? `/?${query}` : "/");
}

function readListId(formData: FormData) {
  const listId = Number(formData.get("list_id"));
  return Number.isInteger(listId) && listId > 0 ? listId : null;
}

// Makes a new list for whoever is signed in, then shows it.
export async function addList(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) backTo(null, "Type a name for the list.");

  const { data, error } = await supabase
    .from("lists")
    .insert({ name })
    .select("id")
    .single();
  if (error || !data) backTo(null, "Could not make the list.");

  revalidatePath("/");
  backTo(data.id);
}

// Adds a task, with an optional due date, to one of the signed-in
// visitor's lists, then shows that list. Supabase fills in user_id itself,
// and refuses a list that belongs to another account.
export async function addTask(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/");

  const title = String(formData.get("title") ?? "").trim();
  const skill = String(formData.get("skill") ?? "");
  const listId = readListId(formData);
  const dueDate = String(formData.get("due_date") ?? "");
  if (!listId) backTo(null, "Choose a list.");
  if (!title || !SKILLS.includes(skill)) {
    backTo(listId, "Type a task and choose a skill.");
  }
  if (dueDate && !isValidDate(dueDate)) {
    backTo(listId, "Pick a due date from the calendar, or leave it empty.");
  }

  const { error } = await supabase
    .from("tasks")
    .insert({ title, skill, list_id: listId, due_date: dueDate || null });
  if (error) backTo(listId, "Could not add the task.");

  revalidatePath("/");
  backTo(listId);
}

// Ticks or unticks a task's Done box. Supabase only lets an account change
// its own tasks, so another account's task id does nothing.
export async function setDone(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/");

  const id = Number(formData.get("id"));
  const done = formData.get("done") === "on";
  const listId = readListId(formData);

  const { error } = await supabase.from("tasks").update({ done }).eq("id", id);
  if (error) backTo(listId, "Could not save that change.");

  revalidatePath("/");
  backTo(listId);
}
