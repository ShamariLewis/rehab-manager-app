export const MilestoneStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DELAYED: "DELAYED",
  IN_INSPECTION: "IN_INSPECTION",
  DONE: "DONE",
} as const;

export const MilestonePriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type MilestoneStatusType = keyof typeof MilestoneStatus;
export type MilestonePriorityType = keyof typeof MilestonePriority;
