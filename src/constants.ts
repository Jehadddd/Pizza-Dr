import { MenuItem, Review, CustomizationOption } from './types';

export const CRUST_OPTIONS: CustomizationOption[] = [
  { id: 'c1', name: 'Classic Hand-Tossed', price: 0 },
  { id: 'c2', name: 'Thin & Crispy', price: 0 },
  { id: 'c3', name: 'Stuffed Crust', price: 2.99 },
  { id: 'c4', name: 'Gluten-Free', price: 3.50 },
];

export const SAUCE_OPTIONS: CustomizationOption[] = [
  { id: 's1', name: 'Cure-All Tomato', price: 0 },
  { id: 's2', name: 'Creamy Alfredo', price: 0.50 },
  { id: 's3', name: 'Spicy Buffalo', price: 0.50 },
  { id: 's4', name: 'BBQ Therapy', price: 0.50 },
];

export const TOPPING_OPTIONS: CustomizationOption[] = [
  { id: 't1', name: 'Extra Mozzarella', price: 1.50 },
  { id: 't2', name: 'Pepperoni', price: 1.50 },
  { id: 't3', name: 'Italian Sausage', price: 1.50 },
  { id: 't4', name: 'Mushrooms', price: 1.00 },
  { id: 't5', name: 'Bell Peppers', price: 1.00 },
  { id: 't6', name: 'Red Onions', price: 1.00 },
  { id: 't7', name: 'Black Olives', price: 1.00 },
  { id: 't8', name: 'Bacon', price: 1.50 },
  { id: 't9', name: 'Pineapple', price: 1.00 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'The Emergency Pepperoni',
    description: 'Double pepperoni, extra mozzarella, and our secret "Cure-All" tomato sauce.',
    price: 14.99,
    image: 'https://picsum.photos/seed/pizza-pepperoni/600/400',
    category: 'classic',
    popular: true,
  },
  {
    id: '2',
    name: 'Veggie Vitality',
    description: 'Fresh bell peppers, red onions, mushrooms, olives, and spinach on a whole wheat crust.',
    price: 13.99,
    image: 'https://picsum.photos/seed/pizza-veggie/600/400',
    category: 'classic',
  },
  {
    id: '3',
    name: 'The Surgeon General\'s Meat Feast',
    description: 'Pepperoni, Italian sausage, ham, bacon, and ground beef. Not for the faint of heart.',
    price: 17.99,
    image: 'https://picsum.photos/seed/pizza-meat/600/400',
    category: 'premium',
    popular: true,
  },
  {
    id: '4',
    name: 'Truffle Therapy',
    description: 'White sauce base, wild mushrooms, truffle oil, and fresh arugula.',
    price: 19.99,
    image: 'https://picsum.photos/seed/pizza-truffle/600/400',
    category: 'premium',
  },
  {
    id: '5',
    name: 'Garlic Knot Bandages',
    description: '6 pieces of buttery, garlicky goodness served with marinara dipping sauce.',
    price: 5.99,
    image: 'https://picsum.photos/seed/garlic-knots/600/400',
    category: 'side',
  },
  {
    id: '6',
    name: 'Buffalo Wing Vaccines',
    description: '8 spicy wings that will kick any cold to the curb. Served with ranch.',
    price: 9.99,
    image: 'https://picsum.photos/seed/chicken-wings/600/400',
    category: 'side',
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    rating: 5,
    text: 'Pizza Dr. literally saved my Friday night. The Emergency Pepperoni is the real deal!',
    avatar: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    rating: 5,
    text: 'Fastest delivery I\'ve ever had. Still steaming hot when it arrived!',
    avatar: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: '3',
    name: 'Mike Ross',
    rating: 5,
    text: 'The crust is perfect. Not too thick, not too thin. Just right.',
    avatar: 'https://picsum.photos/seed/user3/100/100',
  },
];
