/**
 * Checks if a due date is overdue (past due and not completed)
 * @param dueDate - Due date string in YYYY-MM-DD format or null
 * @param isCompleted - Whether the task is completed
 * @returns True if the task is overdue, false otherwise
 */
export const isOverdue = (dueDate: string | null, isCompleted: boolean): boolean => {
  if (!dueDate || isCompleted) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0); // Normalize to start of day

  return due < today;
};

/**
 * Formats a Date object to YYYY-MM-DD string format
 * @param date - Date object to format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};