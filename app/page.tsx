import TaskList from "./_lib/TaskList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; list?: string }>;
}) {
  const { error, list } = await searchParams;
  return (
    <>
      <header className="hero">
        <h1>Study Task List</h1>
        <p className="tagline">by Cece Johns</p>
      </header>

      <main>
        <TaskList error={error} listId={list} />

        <section>
          <h2>About this app</h2>
          <p>
            Study Task List helps language learners plan their practice and
            notice which skills they have been skipping.
          </p>
          <ul>
            <li>
              Add study tasks and tag each one with a skill: Reading, Writing,
              Listening, or Speaking.
            </li>
            <li>Sort your tasks into lists, and give them due dates.</li>
            <li>Tick a task Done when you finish it.</li>
            <li>
              Open the Progress tab to see how many tasks you have finished in
              each skill, and which skill you have been avoiding.
            </li>
          </ul>
          <p>
            Your tasks are private: only you can see them. To start, open the
            Account tab and sign up with an email and password.
          </p>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Cece Johns</p>
      </footer>
    </>
  );
}
