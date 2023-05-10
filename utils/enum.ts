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
  payment_link = 'payment_link',
  wallets = 'wallets',
  transactions = 'transactions'
}

export enum PaymentLinkType {
  temp = 'TEMP_LINK',
  parmanent = 'PERMA_LINK'
}

export enum PaymentStatusType {
  created = 'CREATED',
  pending = 'PENDING',
  success = 'SUCCESS',
  failed = 'FAILED',
  cancelled = 'CANCELLED'
}
