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

export const updateCustomer = {
  name: 'Lannucci',
  email: 'lannucci@hotmail.com',
  day_phone: '+351323213511235',
  eve_phone: '+452436143246123',
  mob_phone: '+351323213511235',
};

export const updateWrongCustomer = {
  customer_id: 1,
  name: '',
  email: 'lannucci@hotmail.com',
  day_phone: '+351323213511235',
  eve_phone: '+452436143246123',
  mob_phone: '+351323213511235',
};

export const updateAddress = {
  address_1: 'Andela Tower',
  address_2: 'gfghohihho',
  city: 'Laogos',
  region: 'Ikorodu Road',
  postal_code: '123',
  country: 'Nigeria',
  shipping_region_id: 23,
};

export const updateWrongAddress = {
  address_1: 'Andela Tower',
  address_2: 'gfghohihho',
  city: 'Laogos',
  postal_code: '123',
  country: 'Nigeria',
  shipping_region_id: 23,
};
