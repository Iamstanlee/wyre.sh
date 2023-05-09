export enum HttpMethod {
  post = 'POST',
}


export enum RouteKey {
  signin = 'sign-in',
  dashboard = 'dashboard',
  setup = 'setup',
}

export enum DbTable {
  users = 'users',
  businesses = 'businesses',
  subscriptions = 'subscriptions',
  generated_contents = 'generated_contents',
  payments = 'payments',
  wallets = 'wallets',
}

export enum PaymentLinkType {
  temp = 'TEMP_LINK',
  parmanent = 'PERMA_LINK'
}