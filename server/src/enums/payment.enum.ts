export const PaymentMethod = {
  CHECK: "CHECK",
  WIRE: "WIRE",
  CREDIT_CARD: "CREDIT_CARD",
  CASH: "CASH",
  DEBIT_CARD: "DEBIT_CARD",
} as const;

export type PaymentMethodType = keyof typeof PaymentMethod;

export const PaymentStatus = {
  NOT_PAID: "NOT_PAID",
  PAYMENT_INITIATED: "PAYMENT_INITIATED",
  PAID: "PAID",
} as const;

export type PaymentStatusType = keyof typeof PaymentStatus;
