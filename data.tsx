export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

export interface MenuSection {
  title: string;
  dishes: Dish[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: string;
  reviews: string;
  deliveryFee: string;
  eta: string;
  image: string;
  promo?: string;
  menu: MenuSection[];
}

export const categories = [
  { id: 'all', label: 'All', icon: '🍽️' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'sushi', label: 'Sushi', icon: '🍣' },
  { id: 'burger', label: 'Burgers', icon: '🍔' },
  { id: 'healthy', label: 'Healthy', icon: '🥗' },
  { id: 'dessert', label: 'Desserts', icon: '🍰' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'napoli',
    name: 'Napoli Express',
    cuisine: 'Italian · Pizza · Pasta',
    rating: '4.8',
    reviews: '412',
    deliveryFee: 'Free delivery',
    eta: '15–25 min',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=340&fit=crop',
    promo: '20% OFF',
    menu: [
      {
        title: 'Popular',
        dishes: [
          {
            id: 'n1',
            name: 'Margherita Pizza',
            description: 'San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil',
            price: 9.9,
            image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop',
            popular: true,
          },
          {
            id: 'n2',
            name: 'Diavola',
            description: 'Tomato sauce, mozzarella, spicy salami, chilli flakes',
            price: 11.9,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop',
            popular: true,
          },
        ],
      },
      {
        title: 'Pasta',
        dishes: [
          {
            id: 'n3',
            name: 'Cacio e Pepe',
            description: 'Pecorino Romano, black pepper, spaghetti',
            price: 10.5,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop',
          },
          {
            id: 'n4',
            name: 'Carbonara',
            description: 'Guanciale, egg yolk, Pecorino Romano, rigatoni',
            price: 12.9,
            image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=300&fit=crop',
          },
        ],
      },
      {
        title: 'Drinks',
        dishes: [
          {
            id: 'n5',
            name: 'San Pellegrino',
            description: 'Sparkling mineral water, 500ml',
            price: 2.5,
            image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop',
          },
          {
            id: 'n6',
            name: 'Limonata',
            description: 'Italian lemon soda, 330ml',
            price: 3.2,
            image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=300&fit=crop',
          },
        ],
      },
    ],
  },
  {
    id: 'sakura',
    name: 'Sakura Sushi',
    cuisine: 'Japanese · Sushi · Poke',
    rating: '4.9',
    reviews: '528',
    deliveryFee: '€2.49',
    eta: '25–35 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=340&fit=crop',
    menu: [
      {
        title: 'Popular',
        dishes: [
          {
            id: 's1',
            name: 'Salmon Nigiri Set',
            description: '8 pieces of fresh Norwegian salmon nigiri',
            price: 14.9,
            image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=300&h=300&fit=crop',
            popular: true,
          },
          {
            id: 's2',
            name: 'Dragon Roll',
            description: 'Eel, avocado, cucumber, tobiko, unagi sauce',
            price: 13.5,
            image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=300&fit=crop',
            popular: true,
          },
        ],
      },
      {
        title: 'Poke Bowls',
        dishes: [
          {
            id: 's3',
            name: 'Salmon Poke Bowl',
            description: 'Sushi rice, salmon, avocado, edamame, wakame, sesame',
            price: 12.9,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
          },
          {
            id: 's4',
            name: 'Tuna Poke Bowl',
            description: 'Sushi rice, tuna, mango, cucumber, crispy onion, ponzu',
            price: 13.9,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
          },
        ],
      },
    ],
  },
  {
    id: 'greenbox',
    name: 'Green Box',
    cuisine: 'Healthy · Salads · Bowls',
    rating: '4.6',
    reviews: '189',
    deliveryFee: '€1.49',
    eta: '20–30 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=340&fit=crop',
    menu: [
      {
        title: 'Bowls',
        dishes: [
          {
            id: 'g1',
            name: 'Mediterranean Bowl',
            description: 'Quinoa, grilled chicken, hummus, feta, roasted vegetables, tahini',
            price: 11.9,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
            popular: true,
          },
          {
            id: 'g2',
            name: 'Açaí Bowl',
            description: 'Açaí, granola, banana, blueberries, coconut flakes, honey',
            price: 9.9,
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop',
          },
        ],
      },
    ],
  },
];

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
