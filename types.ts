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
  business?: Business;
  subscription?: Subscription;
  payment?: Payment;
  username: string;
  payment_link: string;
}

export interface Business {
  id: string /* primary key */;
  user_id: string;
  name: string;
  description: string;
  brand_color: string;
  brand_logo_url: string;
  niche: string;
  website_url: string;
}


export interface Wallet {
  id: string;
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

export interface AIGeneratedContent {
  id: string /* primary key */;
  business_id: string;
  formatted_date: string;
  content: string[];
}

export interface SubscriptionPlan {
  name: 'Basic' | 'Pro' | 'Basic (Yearly)' | 'Pro (Yearly)';
  price: number;
  variant: 'monthly' | 'yearly';
  checkout_url: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  business_id: string;
  metadata: SubscriptionMetadata;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionMetadata {
  store_id: number;
  order_id: number;
  order_item_id: number;
  status:
  | 'on_trial'
  | 'active'
  | 'paused'
  | 'past_due'
  | 'unpaid'
  | 'cancelled'
  | 'expired';

  product_id: number;
  variant_id: number;
  product_name: string;
  variant_name: string;
  user_name: string;
  user_email: string;
  status_formatted: string;
  pause?: { mode: 'void' | 'free'; resumes_at?: string };
  cancelled: boolean;
  trial_ends_at?: string;
  billing_anchor: number;
  urls: Urls;
  renews_at: Date;
  ends_at?: string;
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}

export interface Urls {
  update_payment_method: string;
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
