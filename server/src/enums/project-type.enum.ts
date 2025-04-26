export const ProjectType = {
  SINGLE_FAMILY: "SINGLE_FAMILY",
  DUPLEX: "DUPLEX",
  TRIPLEX: "TRIPLEX",
  QUADPLEX: "QUADPLEX",
  SMALL_MULTI_FAMILY: "SMALL_MULTI_FAMILY",
  LARGE_MULTI_FAMILY: "LARGE_MULTI_FAMILY",
  NEW_CONSTRUCTION: "NEW_CONSTRUCTION",
  MIXED_USE_COMMERCIAL: "MIXED_USE_COMMERCIAL",
  SHOPPING_CENTER: "SHOPPING_CENTER",
} as const;

export const ProjectStrategy = {
  FIX_AND_FLIP: "FIX_AND_FLIP",
  RENTAL: "RENTAL",
  WHOLESALE_DEAL: "WHOLESALE_DEAL",
} as const;

export const ProjectStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
} as const;

export type ProjectTypeEnum = keyof typeof ProjectType;
export type ProjectStrategyEnum = keyof typeof ProjectStrategy;
export type ProjectStatusEnum = keyof typeof ProjectStatus;
