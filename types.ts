import { PaymentLinkType, PaymentStatusType, PaymentType } from '@/utils/enum';
import { Chain, MoneyCurrencyEnum } from '@circle-fin/circle-sdk';

// TODO - keep consistence on interface and types key naming
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
  updated_at: string;
  balance: number;
  unresolved: number;
  chain: Chain;
  currency: MoneyCurrencyEnum;
  public_address?: string;
}

export interface PaymentLink {
  id: string;
  user_id: string;
  slug: string;
  type: PaymentLinkType;
  metadata: PaymentLinkMetadata;
  description?: string;
  created_at: string;
}

export interface PaymentLinkMetadata {
  user_id: string;
  user_name: string;
  user_email: string;
  on_ramp_metadata?: PaymentLinkOnRampMetadata;
}

export interface PaymentLinkOnRampMetadata {
  client_id: string;
  chain: Chain | 'VENOM';
  public_address_on_chain: string;
  external_user_id: string;
}


export interface Transaction {
  id: string;
  user_id: string;
  created_at: string;
  status: PaymentStatusType;
  amount: TransactionAmount;
  metadata: TransactionMetadata;
  payment_slug: string;
  type: PaymentLinkType;
  source: TransactionSource;
  updated_at: string;
  keyId?: string;
  autoCapture?: boolean;
  verification?: string;
  verificationSuccessUrl?: string;
  verificationFailureUrl?: string;
  description?: string;
  encryptedData?: string;
  channel?: string;
}

export interface TransactionSource {
  id: string;
  type: string;
}

export interface TransactionAmount {
  amount: string;
  currency: MoneyCurrencyEnum;
}

export interface TransactionMetadata {
  userId: string;
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
  currency?: MoneyCurrencyEnum;
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

export interface Payment {
  id: string;
  type: PaymentType;
  merchantId: string;
  merchantWalletId: string;
  amount: TransactionAmount;
  source: TransactionSource;
  status: PaymentStatusType;
  description: string;
  fees: TransactionAmount[];
  trackingRef: string;
  errorCode: string;
  createDate: string;
  updateDate: string;
  metadata: TransactionMetadata;
}