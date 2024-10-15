export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.,;]).{8,24}$/
export const EMAIL_REGEX = /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PRODUCT = {
  "id": "",
  "name": "",
  "category": "",
  "slug": [
    "",
  ],
  "description": "",
  "price": 0,
  "dp": "",
  "images": [
    ""
  ],
  "variation": [
    {
      "type": "",
      "price": "",
      "variant": "",
      "quantity": "0"
    },
  ],
  "merchant_id": "",
  "quantity": 0,
  "discount_type": "",
  "discount_amount": 0,
  "opening_date": "",
  "available_till": 0,
  "delivery_duration": 0,
  "dispatch_location": "",
  "unit": "",
  "product_type": "",
  "inStock": true,
  "createdAt": "",
  "updatedAt": "",
  "suplementryProducts": [
    {
      "id": "",
      "name": "",
      "product_id": "",
      "quantity": 0,
      "price": 0,
      "dp": ""
    },
  ]
}