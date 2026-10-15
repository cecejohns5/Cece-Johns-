// Due dates are stored as plain dates like "2026-10-15", with no time.

// Today's date in Hawaii, in the same "YYYY-MM-DD" form. The site's server
// runs on UTC, which is already tomorrow by Hawaii's afternoon, so using
// the server's own date would mark tasks due today as overdue too early.
export function todayInHawaii() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Pacific/Honolulu",
  }).format(new Date());
}

// A task is overdue when its date has passed and it is not ticked done.
// Dates in "YYYY-MM-DD" form sort the same as text, so < compares them.
export function isOverdue(dueDate: string | null, done: boolean) {
  return dueDate !== null && !done && dueDate < todayInHawaii();
}

// Shows "2026-10-15" as "Oct 15, 2026".
export function formatDueDate(dueDate: string) {
  const [year, month, day] = dueDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
