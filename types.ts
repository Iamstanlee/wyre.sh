export interface PageMetadata {
  title: string;
  description: string;
  card_image: string;
}

export interface User {
  id: string /* primary key */;
  email_address: string;
  first_name: string;
  last_name: string;
  payment?: Payment;
  username: string;
  payment_link: string;
}

export interface Wallet {
  id: string /* primary key */;
  user_id: string;
  created_at: string;
  balance: number;
  unresolved: number;
}

export interface Payment {
  id: string /* primary key */;
  user_id: string;
  link: string;
  amount: string;
  status: boolean;
  created_at: string;
  metadata: string;
}

export interface Toast {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'danger';
  show?: boolean;
}

export interface SummaryCard {
  name: string;
  amount: string;
}

export interface CreatePaymentModal {
  open: boolean;
  handleCloseCreatePaymentModal: () => void;
}

export interface LinkCreatedModal {
  open: boolean;
  handleCloseLinkCreatedModal: () => void;
  link: string | null;
}

export interface PaymentCreatedModal {
  open: boolean;
  handleClosePaymentCreatedModal: () => void;
  status: string | null;
}

export interface PaymentLink {
  amount?: string;
  created_at: string;
  id: string;
  link: string;
  metadata: PaymentLinkMetadata;
  type: string;
  user_id: string;
}

export interface PaymentLinkMetadata {
  description?: string;
  receiver?: string;
  user_name: string;
  user_email: string;
}

export interface Transaction {
  idempotencyKey: string;
  keyId: string;
  metadata: TransactionMetadata;
  amount: TransactionAmount;
  autoCapture: true;
  verification: string;
  verificationSuccessUrl: string;
  verificationFailureUrl: string;
  source: TransactionSource;
  description: string;
  encryptedData: string;
  channel: string;
}
export interface TransactionSource {
  id: string;
  type: string;
}
export interface TransactionAmount {
  amount: string;
  currency: string;
}

export interface TransactionMetadata {
  email: string;
  phoneNumber: string;
  sessionId: string;
  ipAddress: string;
}
export interface EncryptionKey {
  publicKey: string;
  keyId: string;
}
export interface CardInformationToEncrypt {
  number: string;
  cvv: string;
}
export interface CardInformation {
  idempotencyKey?: string;
  keyId?: string;
  encryptedData?: string;
  billingDetails: {
    name: string;
    city: string;
    country: string;
    line1: string;
    line2?: string;
    district?: string;
    postalCode: string;
  };

  number: string;
  cvv: string;
  expMonth: string;
  expYear: string;
  metadata: {
    email: string;
    phoneNumber: string;
    sessionId: string;
    ipAddress: string;
  };
  amount: { amount: string; currency?: string };
}
