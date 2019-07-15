export const registerCustomer = {
  name: 'Oyedeji Peace',
  password: 'oyedejipeace',
  email: 'oyedejipeace@performance.com'
};

export const registerCustomer2 = {
  name: 'Oyedeji Peace',
  password: 'oyedejipeace',
  email: 'oyedejipeace@great.com'
};


export const incorrectCustomerRegistration = {
  name: 'Oyedeji Peace',
  password: 'oyedejipeace',
  email: 'oyedejipeace'
};

export const customerProfileKeys = [
  'customer_id',
  'name',
  'email',
  'address_1',
  'address_2',
  'city',
  'region',
  'postal_code',
  'country',
  'shipping_region_id',
  'day_phone',
  'eve_phone',
  'mob_phone',
  'credit_card'
];

export const loginCustomer = {
  password: 'oyedejipeace',
  email: 'oyedejipeace@performance.com'
};

export const loginCustomerWrongEmail = {
  password: 'oyedejipeace',
  email: 'oyedejipeace@artisan.com'
};

export const loginCustomerWrongPassword = {
  password: 'oyedejipeac',
  email: 'oyedejipeace@performance.com'
};

export const customer = {
  customer: {
    schema: {
      customer_id: 1,
      name: 'Lannucci',
      email: 'lannucci@hotmail.com',
      address_1: 'QI 19',
      address_2: '',
      city: '',
      region: '',
      postal_code: '',
      country: '',
      shipping_region_id: 1,
      day_phone: '+351323213511235',
      eve_phone: '+452436143246123',
      mob_phone: '+351323213511235',
      credit_card: 'XXXXXXXX5100'
    }
  },
  accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NTA0MjQ0OTgsImV4cCI6MTU1MDUxMDg5OH0.aEFrNUPRWuRWx0IOEL-_A4J4Ti39iXEHAScm6GI61RR',
  expires_in: '24h'
};
