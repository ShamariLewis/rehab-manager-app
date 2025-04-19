export const ProviderType = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  FACEBOOK: "FACEBOOK",
  EMAIL: "EMAIL",
};

export type ProviderEnumType = keyof typeof ProviderType;
