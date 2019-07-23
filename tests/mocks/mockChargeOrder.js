export const chargeOrder = {
  stripe_token: 'tok_visa',
  order_id: '1',
  description: 'bus',
  amount: '500',
  currency: 'usd'
};

export const wrongChargeOrder = {
  stripe_token: 'tok_vear',
  order_id: '1',
  description: 'bus',
  amount: '500',
  currency: 'usd'
};

export const wrongChargeOrder2 = {
  stripe_token: '',
  order_id: '1',
  description: 'bus',
  amount: '500',
  currency: 'usd'
};

export const chargeOrderTokenError = [
  'code',
  'message',
  'field'
];
