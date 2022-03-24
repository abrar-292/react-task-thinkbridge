export type Inventory = {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  quantityOrdered: number;
};

export const staticData: Inventory[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'New Desc',
    price: 299.99,
    quantityAvailable: 122,
    quantityOrdered: 3,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'New Desc 2',
    price: 299.99,
    quantityAvailable: 122,
    quantityOrdered: 3,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'New Desc 3',
    price: 299.99,
    quantityAvailable: 122,
    quantityOrdered: 3,
  },
];
