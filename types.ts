import { PaymentLinkType, PaymentStatusType } from '@/utils/enum';
import { Chain, MoneyCurrencyEnum } from '@circle-fin/circle-sdk';

export interface PageMetadata {
  title: string;
  description: string;
  card_image: string;
}

export interface User {
  id: string;
  wallet_id: string;
  email_address: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  created_at: string;
  balance: number;
  unresolved: number;
}

export interface Payment {
  id: string;
  user_id: string;
  link: string;
  amount: string;
  status: boolean;
  created_at: string;
  metadata: string;
}

export interface PaymentLink {
  created_at: string;
  id: string;
  slug: string;
  metadata?: PaymentLinkMetadata;
  type: PaymentLinkType;
  user_id: string;
}

export interface PaymentLinkMetadata {
  description?: string;
  receiver?: string;
  user_name: string;
  user_email: string;
}

export interface Transaction {
  id: string;
  created_at: string;
  status: string;
  amount: string;
  metadata: TransactionMetadata;
  user_id: string;
  payment_slug: string;
  type: string;
  source: TransactionSource;
  updated_at: string;
  // keyId: string;
  // autoCapture: true;
  // verification: string;
  // verificationSuccessUrl: string;
  // verificationFailureUrl: string;
  // description: string;
  // encryptedData: string;
  // channel: string;
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
  // sessionId: string;
  // ipAddress: string;
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
  name: string;
  city: string;
  country: string;
  line1: string;
  line2?: string;
  district?: string;
  postalCode: string;
  number: string;
  cvv: string;
  expMonth: string;
  expYear: string;
  email: string;
  phoneNumber: string;
  sessionId?: string;
  ipAddress?: string;
  amount: string;
  currency?: string;
}

export interface Transfer {
  id?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  status?: PaymentStatusType;
  amount: TransferAmount;
  destination: TransferDestination;
  source?: TransferSource;
}

export interface TransferSource {
  id: string;
  type: string;
}

export interface TransferAmount {
  amount: string;
  currency?: Chain;
}

export interface TransferDestination {
  type?: string;
  address: string;
  addressTag: string;
  chain: Chain;
}

export interface Toast {
  message?: string;
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

export interface WithdrawUSDCModal {
  open: boolean;
  handleCloseWithdrawUSDCModal: () => void;
}
