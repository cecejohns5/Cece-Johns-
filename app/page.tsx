export default function Home() {
  return (
    <>
      <header className="hero">
        <h1>Cece Johns</h1>
        <p className="tagline">I am a freshman at UH Manoa</p>
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>
            I am in my first year at the University of Hawaiʻi at Mānoa. I am
            just beginning my college journey, and I am using this time to
            explore my interests and figure out what I want to learn more
            about.
          </p>
        </section>

        <section>
          <h2>This semester</h2>
          <ul>
            <li>Taking introductory courses to build a strong foundation.</li>
            <li>Joining the AIR workshop to learn how to build with AI.</li>
            <li>Getting involved in a student organization on campus.</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Cece Johns</p>
      </footer>
    </>
  );
}
