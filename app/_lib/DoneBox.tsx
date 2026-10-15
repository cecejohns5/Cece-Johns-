"use client";

// A task's Done checkbox. Ticking it saves right away, with no Save button.
export default function DoneBox({ done }: { done: boolean }) {
  return (
    <input
      type="checkbox"
      name="done"
      defaultChecked={done}
      aria-label="Done"
      onChange={(event) => event.currentTarget.form?.requestSubmit()}
    />
  );
}
