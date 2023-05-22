export enum HttpMethod {
  post = 'POST'
}

export enum RouteKey {
  signin = 'sign-in',
  dashboard = 'dashboard',
  setup = 'setup',
  transactions = 'transactions',
  account = 'account',
}

export enum DbTable {
  users = 'users',
  payment_links = 'payment_links',
  wallets = 'wallets',
  transactions = 'transactions'
}

export enum PaymentLinkType {
  link = 'payment_link',
  productPage = 'product_page',
  onRamp = 'on_ramp'
}

export enum PaymentStatusType {
  pending = 'pending',
  confirmed = 'confirmed',
  success = 'success',
  failed = 'failed',
  cancelled = 'cancelled'
}

export enum PaymentType {
  payment = 'payment',
  refund = 'refund',
  cancel = 'cancel'
}