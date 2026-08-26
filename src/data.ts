export type Category = 'Starters' | 'Main Course' | 'Desserts' | 'Beverages';

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  location: string;
  distanceKm: number;
  image: string;
  gallery: string[];
  hours: string;
  about: string;
  popularDishes: string[];
  categories: Category[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: Category;
  cuisine: string;
  price: number;
  rating: number;
  image: string;
  restaurantId: string;
};

export type Review = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  restaurantId?: string;
};

export const categories: { name: Category; icon: string; description: string }[] = [
  { name: 'Starters', icon: 'Salad', description: 'Small plates to begin' },
  { name: 'Main Course', icon: 'UtensilsCrossed', description: 'Hearty signature dishes' },
  { name: 'Desserts', icon: 'Cake', description: 'Sweet finales' },
  { name: 'Beverages', icon: 'Wine', description: 'Crafted drinks' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'saffron-house',
    name: 'Saffron House',
    cuisine: 'Indian',
    rating: 4.8,
    reviews: 1284,
    priceRange: '$$$',
    location: 'Downtown, San Francisco',
    distanceKm: 1.2,
    image: 'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5395180/pexels-photo-5395180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    hours: '11:00 AM – 11:00 PM',
    about:
      'Saffron House brings the vibrant soul of regional Indian cooking to the heart of the city. Our chefs source single-origin spices and pair them with seasonal produce for plates that are bold, aromatic, and unmistakably modern.',
    popularDishes: ['ms-butter-chicken', 'ms-lamb-chops', 'ms-mango-lassi'],
    categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
  },
  {
    id: 'bella-tavola',
    name: 'Bella Tavola',
    cuisine: 'Italian',
    rating: 4.7,
    reviews: 962,
    priceRange: '$$',
    location: 'North Beach, San Francisco',
    distanceKm: 2.8,
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17906500/pexels-photo-17906500.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/36430171/pexels-photo-36430171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    hours: '12:00 PM – 10:30 PM',
    about:
      'A neighbourhood trattoria pouring heart into every plate. Hand-rolled pasta, wood-fired focaccia, and a cellar of small-production Italian wines make Bella Tavola the city’s cosiest corner of Italy.',
    popularDishes: ['ms-truffle-pasta', 'ms-bruschetta', 'ms-tiramisu'],
    categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
  },
  {
    id: 'sakura-izakaya',
    name: 'Sakura Izakaya',
    cuisine: 'Japanese',
    rating: 4.9,
    reviews: 1530,
    priceRange: '$$$',
    location: 'Japantown, San Francisco',
    distanceKm: 3.4,
    image: 'https://images.pexels.com/photos/24289165/pexels-photo-24289165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/24289165/pexels-photo-24289165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12107010/pexels-photo-12107010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15671371/pexels-photo-15671371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2098070/pexels-photo-2098070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    hours: '5:00 PM – 1:00 AM',
    about:
      'An intimate izakaya where omakase meets late-night energy. Sit at the counter, watch the chef work over binchotan charcoal, and let a curated flight of sake carry the evening.',
    popularDishes: ['ms-scallop', 'ms-clams', 'ms-yuzu-cocktail'],
    categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
  },
  {
    id: 'maison-verte',
    name: 'Maison Verte',
    cuisine: 'French',
    rating: 4.6,
    reviews: 740,
    priceRange: '$$$$',
    location: 'SoMa, San Francisco',
    distanceKm: 0.9,
    image: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8194817/pexels-photo-8194817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3167309/pexels-photo-3167309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    hours: '6:00 PM – 11:00 PM',
    about:
      'Maison Verte is a love letter to contemporary French cuisine. A seasonal tasting menu, an all-French wine list, and a candlelit room designed for slow, deliberate evenings.',
    popularDishes: ['ms-beef-tenderloin', 'ms-ravioli', 'ms-creme-brulee'],
    categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
  },
  {
    id: 'el-fuego',
    name: 'El Fuego Cantina',
    cuisine: 'Mexican',
    rating: 4.5,
    reviews: 1102,
    priceRange: '$$',
    location: 'Mission District, San Francisco',
    distanceKm: 2.1,
    image: 'https://images.pexels.com/photos/39122376/pexels-photo-39122376.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/39122376/pexels-photo-39122376.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2092508/pexels-photo-2092508.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/605408/pexels-photo-605408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    hours: '11:00 AM – 12:00 AM',
    about:
      'A lively cantina serving street-food-inspired plates and a mezcal list that runs deep. Bright colours, open air, and a patio that turns into a party after sundown.',
    popularDishes: ['ms-street-tacos', 'ms-chips-salsa', 'ms-mezcal-paloma'],
    categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
  },
  {
    id: 'green-leaf',
    name: 'Green Leaf Kitchen',
    cuisine: 'Vegetarian',
    rating: 4.7,
    reviews: 688,
    priceRange: '$$',
    location: 'Hayes Valley, San Francisco',
    distanceKm: 1.7,
    image: 'https://images.pexels.com/photos/17237180/pexels-photo-17237180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17237180/pexels-photo-17237180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    hours: '8:00 AM – 9:00 PM',
    about:
      'A plant-forward kitchen proving that vegetables deserve the spotlight. Bowls, flatbreads, and cold-pressed juices built from produce sourced within 50 miles of the door.',
    popularDishes: ['ms-garden-bowl', 'ms-bruschetta', 'ms-matcha-latte'],
    categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
  },
];

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 'ms-bruschetta',
    name: 'Heirloom Tomato Bruschetta',
    description: 'Grilled sourdough, whipped ricotta, basil oil, aged balsamic.',
    category: 'Starters',
    cuisine: 'Italian',
    price: 12,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'bella-tavola',
  },
  {
    id: 'ms-clams',
    name: 'Steamed Clams, White Wine',
    description: 'Manila clams, garlic, chilli, parsley, charred sourdough.',
    category: 'Starters',
    cuisine: 'Japanese',
    price: 16,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/15671371/pexels-photo-15671371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'sakura-izakaya',
  },
  {
    id: 'ms-chips-salsa',
    name: 'Tableside Guacamole & Chips',
    description: 'Hass avocado, lime, toasted pepitas, blue corn tortillas.',
    category: 'Starters',
    cuisine: 'Mexican',
    price: 11,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'el-fuego',
  },
  {
    id: 'ms-scallop',
    name: 'Seared Scallop, Yuzu Beurre',
    description: 'Diver scallop, yuzu kosho, trout roe, micro shiso.',
    category: 'Starters',
    cuisine: 'Japanese',
    price: 19,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/12107010/pexels-photo-12107010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'sakura-izakaya',
  },
  // Main Course
  {
    id: 'ms-butter-chicken',
    name: 'Saffron Butter Chicken',
    description: 'Tandoor chicken, tomato fenugreek gravy, naan, basmati.',
    category: 'Main Course',
    cuisine: 'Indian',
    price: 24,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'saffron-house',
  },
  {
    id: 'ms-truffle-pasta',
    name: 'Black Truffle Tagliolini',
    description: 'Hand-rolled pasta, cultured butter, parmigiano, shaved truffle.',
    category: 'Main Course',
    cuisine: 'Italian',
    price: 28,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5395180/pexels-photo-5395180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'bella-tavola',
  },
  {
    id: 'ms-beef-tenderloin',
    name: 'Beef Tenderloin, Bordelaise',
    description: 'Aged tenderloin, pommes purée, glazed carrots, red wine jus.',
    category: 'Main Course',
    cuisine: 'French',
    price: 42,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5395180/pexels-photo-5395180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'maison-verte',
  },
  {
    id: 'ms-lamb-chops',
    name: 'Char-Grilled Lamb Chops',
    description: 'Rosemary marinade, smoked aubergine, mint chutney.',
    category: 'Main Course',
    cuisine: 'Indian',
    price: 32,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/17237180/pexels-photo-17237180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'saffron-house',
  },
  {
    id: 'ms-ravioli',
    name: 'Ricotta Ravioli, Sage',
    description: 'Hand-folded ravioli, brown butter, crispy sage, hazelnut.',
    category: 'Main Course',
    cuisine: 'French',
    price: 26,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/15419504/pexels-photo-15419504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'maison-verte',
  },
  {
    id: 'ms-street-tacos',
    name: 'Street-Style Al Pastor Tacos',
    description: 'Marinated pork, pineapple salsa, cilantro, onion, lime.',
    category: 'Main Course',
    cuisine: 'Mexican',
    price: 15,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/2092508/pexels-photo-2092508.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'el-fuego',
  },
  {
    id: 'ms-garden-bowl',
    name: 'Roasted Garden Grain Bowl',
    description: 'Quinoa, roasted squash, chickpea, tahini, pomegranate.',
    category: 'Main Course',
    cuisine: 'Vegetarian',
    price: 17,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=inysrgb&h=650&w=940',
    restaurantId: 'green-leaf',
  },
  // Desserts
  {
    id: 'ms-tiramisu',
    name: 'Classic Tiramisu',
    description: 'Espresso-soaked savoiardi, mascarpone, cocoa, amaretto.',
    category: 'Desserts',
    cuisine: 'Italian',
    price: 11,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5172006/pexels-photo-5172006.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'bella-tavola',
  },
  {
    id: 'ms-creme-brulee',
    name: 'Vanilla Crème Brûlée',
    description: 'Tahitian vanilla custard, caramelised sugar, shortbread.',
    category: 'Desserts',
    cuisine: 'French',
    price: 13,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'maison-verte',
  },
  {
    id: 'ms-chocolate-brownie',
    name: 'Warm Chocolate Brownie',
    description: 'Dark chocolate, salted caramel, brown butter ice cream.',
    category: 'Desserts',
    cuisine: 'Vegetarian',
    price: 10,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/33312981/pexels-photo-33312981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'green-leaf',
  },
  {
    id: 'ms-mango-saffron',
    name: 'Mango Saffron Kulfi',
    description: 'Alphonso mango, saffron, pistachio crumble, rose syrup.',
    category: 'Desserts',
    cuisine: 'Indian',
    price: 12,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/34520947/pexels-photo-34520947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'saffron-house',
  },
  // Beverages
  {
    id: 'ms-mango-lassi',
    name: 'Mango Lassi',
    description: 'Alphonso mango, house yoghurt, cardamom, pistachio.',
    category: 'Beverages',
    cuisine: 'Indian',
    price: 7,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/30591630/pexels-photo-30591630.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'saffron-house',
  },
  {
    id: 'ms-yuzu-cocktail',
    name: 'Yuzu Spritz',
    description: 'Yuzu, gin, elderflower, prosecco, shiso leaf.',
    category: 'Beverages',
    cuisine: 'Japanese',
    price: 14,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'sakura-izakaya',
  },
  {
    id: 'ms-mezcal-paloma',
    name: 'Mezcal Paloma',
    description: 'Arte de Oaxaca mezcal, grapefruit, lime, agave, salt rim.',
    category: 'Beverages',
    cuisine: 'Mexican',
    price: 13,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/605408/pexels-photo-605408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'el-fuego',
  },
  {
    id: 'ms-matcha-latte',
    name: 'Ceremonial Matcha Latte',
    description: 'Stone-milled matcha, steamed oat milk, light honey.',
    category: 'Beverages',
    cuisine: 'Vegetarian',
    price: 6,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/30232926/pexels-photo-30232926.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    restaurantId: 'green-leaf',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Amara Okafor',
    avatar: 'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    date: '2 weeks ago',
    text: 'Saffron House completely redefined what I expect from Indian fine dining. The butter chicken was luminous and the saffron kulfi was the perfect ending. Service was warm without being overbearing.',
    restaurantId: 'saffron-house',
  },
  {
    id: 'r2',
    name: 'Daniel Reyes',
    avatar: 'https://images.pexels.com/photos/15019490/pexels-photo-15019490.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    date: '1 month ago',
    text: 'Bella Tavola feels like a secret you want to share. The truffle tagliolini is genuinely the best pasta I have had outside of Bologna. We stayed two hours and never felt rushed.',
    restaurantId: 'bella-tavola',
  },
  {
    id: 'r3',
    name: 'Sophie Laurent',
    avatar: 'https://images.pexels.com/photos/16869444/pexels-photo-16869444.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    date: '3 weeks ago',
    text: 'Maison Verte is a masterclass in atmosphere. Candlelight, low music, and a tasting menu that surprised me at every course. The beef tenderloin was cooked to absolute perfection.',
    restaurantId: 'maison-verte',
  },
  {
    id: 'r4',
    name: 'Marcus Chen',
    avatar: 'https://images.pexels.com/photos/29615996/pexels-photo-29615996.png?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 4,
    date: '5 days ago',
    text: 'Sakura Izakaya is my go-to for a late night. The omakase counter is an experience in itself and the yuzu spritz pairs with everything. Booking ahead is essential.',
    restaurantId: 'sakura-izakaya',
  },
  {
    id: 'r5',
    name: 'Priya Nair',
    avatar: 'https://images.pexels.com/photos/35490806/pexels-photo-35490806.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    date: '1 week ago',
    text: 'Foodie Finder made planning our anniversary dinner effortless. I filtered by cuisine and distance, read real reviews, and booked a table in minutes. This is how discovery should feel.',
  },
  {
    id: 'r6',
    name: 'James Whitfield',
    avatar: 'https://images.pexels.com/photos/30269649/pexels-photo-30269649.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 4,
    date: '2 months ago',
    text: 'El Fuego Cantina is loud, bright, and exactly what a Friday should be. The al pastor tacos and a mezcal paloma on the patio — I cannot think of a better way to start a weekend.',
    restaurantId: 'el-fuego',
  },
];

export const cuisines = ['Indian', 'Italian', 'Japanese', 'French', 'Mexican', 'Vegetarian'];
