import { MoneyCurrencyEnum } from '@circle-fin/circle-sdk';

export const useCurrencyFormatter = (currency: MoneyCurrencyEnum = MoneyCurrencyEnum.Usd) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  });
};


export const useDateFormatter = () => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
};



