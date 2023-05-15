export enum HttpMethod {
  post = 'POST'
}

export enum RouteKey {
  signin = 'sign-in',
  dashboard = 'dashboard',
  setup = 'setup'
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
}

export enum PaymentStatusType {
  created = 'CREATED',
  pending = 'PENDING',
  success = 'SUCCESS',
  failed = 'FAILED',
  cancelled = 'CANCELLED'
}
