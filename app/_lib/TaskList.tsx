import Link from "next/link";
import { createClient } from "./supabase";
import { addList, addTask, setDone } from "./task-actions";
import { SKILLS } from "./skills";
import DoneBox from "./DoneBox";

// The signed-in visitor's study tasks, one list at a time, with a menu of
// their lists and forms to add a list or a task.
// Shows nothing to visitors who are not signed in.
export default async function TaskList({
  error,
  listId,
}: {
  error?: string;
  listId?: string;
}) {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Supabase's rules only return this account's own lists and tasks.
  const { data: lists } = await supabase
    .from("lists")
    .select("id, name")
    .order("created_at");

  // Show the list named in the address (?list=...), or else the first one.
  const current =
    lists?.find((list) => String(list.id) === listId) ?? lists?.[0];

  const { data: tasks } = current
    ? await supabase
        .from("tasks")
        .select("id, title, skill, done")
        .eq("list_id", current.id)
        .order("created_at")
    : { data: [] };

  return (
    <section>
      <h2>My study tasks</h2>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <nav className="list-menu" aria-label="Lists">
        {lists?.map((list) => (
          <Link
            key={list.id}
            href={`/?list=${list.id}`}
            aria-current={list.id === current?.id ? "page" : undefined}
          >
            {list.name}
          </Link>
        ))}
        <details className="new-list">
          <summary>New list</summary>
          <form action={addList} className="task-form">
            <input
              name="name"
              required
              maxLength={50}
              placeholder="Reading"
              aria-label="List name"
            />
            <button type="submit">Save</button>
          </form>
        </details>
      </nav>

      {!current ? (
        <p>Make your first list with New list, then add tasks to it.</p>
      ) : (
        <>
          <h3>{current.name}</h3>
          <form action={addTask} className="task-form">
            <input
              name="title"
              required
              maxLength={200}
              placeholder="Read one news article"
              aria-label="Task"
            />
            <select name="skill" required defaultValue="" aria-label="Skill">
              <option value="" disabled>
                Choose a skill
              </option>
              {SKILLS.map((skill) => (
                <option key={skill}>{skill}</option>
              ))}
            </select>
            <select
              name="list_id"
              required
              defaultValue={current.id}
              aria-label="List"
            >
              {lists?.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>

          {tasks && tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={task.done ? "task-done" : undefined}
                >
                  <form action={setDone}>
                    <input type="hidden" name="id" value={task.id} />
                    <input type="hidden" name="list_id" value={current.id} />
                    <DoneBox done={task.done} />
                  </form>
                  <span className="task-title">{task.title}</span>
                  <span className="skill-tag">{task.skill}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks in this list yet. Add one above.</p>
          )}
        </>
      )}
    </section>
  );
}
