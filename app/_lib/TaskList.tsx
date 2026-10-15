import { createClient } from "./supabase";
import { addTask, setDone } from "./task-actions";
import { SKILLS } from "./skills";
import DoneBox from "./DoneBox";

// The signed-in visitor's study tasks, with a form to add more.
// Shows nothing to visitors who are not signed in.
export default async function TaskList({ error }: { error?: string }) {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Supabase's rules only return this account's own tasks.
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, skill, done")
    .order("created_at");

  return (
    <section>
      <h2>My study tasks</h2>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
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
        <button type="submit">Add</button>
      </form>

      {tasks && tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? "task-done" : undefined}>
              <form action={setDone}>
                <input type="hidden" name="id" value={task.id} />
                <DoneBox done={task.done} />
              </form>
              <span className="task-title">{task.title}</span>
              <span className="skill-tag">{task.skill}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet. Add your first one above.</p>
      )}
    </section>
  );
}
