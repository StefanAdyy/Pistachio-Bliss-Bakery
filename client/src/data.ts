import { Food } from './app/shared/models/Food';
import { Tag } from './app/shared/models/Tag';

export const sample_foods: Food[] = [
  {
    id: '1',
    name: 'Pistachio Croissant',
    preparationTime: '15-20',
    price: 3.5,
    favorite: true,
    origins: ['France'],
    imageUrl: 'assets/food_images/pistachio-croissant.jpg',
    tags: ['Pastry', 'Breakfast'],
  },
  {
    id: '2',
    name: 'Pistachio Eclair',
    preparationTime: '20-25',
    price: 4.00,
    favorite: true,
    origins: ['France'],
    imageUrl: 'assets/food_images/pistachio-eclair.jpg',
    tags: ['Pastry', 'Dessert'],
  },
  {
    id: '3',
    name: 'Pistachio Muffin',
    preparationTime: '20-25',
    price: 2.0,
    favorite: false,
    origins: ['United States'],
    imageUrl: 'assets/food_images/pistachio-muffin.jpg',
    tags: ['Bakery', 'Breakfast'],
  },
  {
    id: '4',
    name: 'Pistachio Gelato',
    preparationTime: '10-15',
    price: 4.5,
    favorite: true,
    origins: ['Italy'],
    imageUrl: 'assets/food_images/pistachio-gelato.jpg',
    tags: ['Dessert', 'Gelato'],
  },
  {
    id: '5',
    name: 'Pistachio Choux',
    preparationTime: '20-25',
    price: 3.75,
    favorite: true,
    origins: ['France'],
    imageUrl: 'assets/food_images/pistachio-choux.jpg',
    tags: ['Pastry', 'Dessert'],
  },
];

export const sample_tags: Tag[] = [
  { name: 'All', count: 5 },
  { name: 'Pastry', count: 3 },
  { name: 'Dessert', count: 3 },
  { name: 'Breakfast', count: 2 },
  { name: 'Bakery', count: 1 },
  { name: 'Gelato', count: 1 },
]