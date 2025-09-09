/**
 * Validate todo data to ensure data integrity in database and to handle errors.
 * This can be eliminated by using TypeScript and validation libs.
 */

export function validateTodoData(body) {
  const VALID_STATUSES = ["not started", "in progress", "done"];

  if (!body || typeof body !== "object") return "Invalid request body";
  if (!body.title || typeof body.title !== "string") return "Title is required";
  if (body.description && typeof body.description !== "string") return "Description must be string";
  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return `Status must be one of: ${VALID_STATUSES.join(", ")}`;
  }
  return null;
}