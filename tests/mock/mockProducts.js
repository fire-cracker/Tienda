export const mockGetAllProducts = {
  count: 101,
  rows: [
    {
      product_id: 1,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic',
      price: '14.99',
      discounted_price: '0.00',
      thumbnail: 'arc-d-triomphe-thumbnail.gif'
    },
    {
      product_id: 2,
      name: 'Chartres Cathedral',
      description: '"The Fur Merchants".',
      price: '16.95',
      discounted_price: '15.95',
      thumbnail: 'chartres-cathedral-thumbnail.gif'
    }
  ]
};

export const productKeys = [
  'product_id',
  'name',
  'description',
  'price',
  'discounted_price',
  'image',
  'image_2'
];
