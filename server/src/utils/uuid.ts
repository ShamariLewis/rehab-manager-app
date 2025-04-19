import { v4 as uuidv4 } from "uuid";

// Generate invite code to invite others to projects
export function generateInviteCode() {
  return uuidv4().replace(/-/g, "").substring(0, 8);
}

// Generate a task code every time a new task is created
export function generateTaskCode() {
  return `task-${uuidv4().replace(/-/g, "").substring(0, 3)}`;
}
