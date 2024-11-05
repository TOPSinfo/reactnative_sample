export interface NewCard {
  year: string;
  month: string;
  primary?: string;
  cardCode: string;
  cardNumber: string;
  postalCode: string;
}

interface Expiration {
  date: string;
  timezone: string;
  timezone_type: number;
}

export interface Card {
  id: string;
  type: string;
  isDefault: string;
  lastFour: string;
  expiration: Expiration;
}
