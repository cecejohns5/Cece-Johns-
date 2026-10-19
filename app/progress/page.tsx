import Link from "next/link";
import { createClient } from "../_lib/supabase";
import { SKILLS } from "../_lib/skills";

// Build this page fresh for each visit, since it depends on who is signed in.
export const dynamic = "force-dynamic";

// The Progress tab: how many tasks the signed-in visitor has finished in each
// skill, and which skill or skills they have finished the fewest of.
export default async function ProgressPage() {
  const supabase = await createClient();
  const user = supabase
    ? (await supabase.auth.getUser()).data.user
    : null;

  if (!supabase || !user) {
    return (
      <main>
        <h2>Progress</h2>
        <p>
          <Link href="/login">Log in</Link> to see how many tasks you have
          finished in each skill.
        </p>
      </main>
    );
  }

  // Supabase's rules only return this account's own tasks, from every list.
  const { data: doneTasks } = await supabase
    .from("tasks")
    .select("skill")
    .eq("done", true);

  const counts = SKILLS.map((skill) => ({
    skill,
    count: doneTasks?.filter((task) => task.skill === skill).length ?? 0,
  }));

  // Every skill tied for the lowest count counts as "avoiding."
  const lowest = Math.min(...counts.map((row) => row.count));
  const avoiding = counts
    .filter((row) => row.count === lowest)
    .map((row) => row.skill);

  return (
    <main>
      <h2>Progress</h2>
      <p>Tasks you have finished in each skill:</p>
      <ul className="skill-counts">
        {counts.map((row) => (
          <li key={row.skill}>
            <span className="skill-tag">{row.skill}</span>
            <strong>{row.count}</strong>
          </li>
        ))}
      </ul>
      <p className="avoiding">
        <strong>Avoiding:</strong> {avoiding.join(", ")}
      </p>
    </main>
  );
}
