const categories = [
  {
    id: 'word',
    name: 'Microsoft Word',
    tags: ['phần mềm', 'phần cứng'],
    count: 147,
    image: require('../assets/icons/word.png')
  },
  {
    id: 'excel',
    name: 'Excel',
    tags: ['phần mềm', 'phần cứng'],
    count: 16,
    image: require('../assets/icons/excel.png')
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    tags: ['phần mềm', 'phần cứng'],
    count: 68,
    image: require('../assets/icons/photoshop.png')
  },
  {
    id: 'net',
    name: 'Mạng trong nhà',
    tags: ['phần mềm', 'full service'],
    count: 17,
    image: require('../assets/icons/browser.png')
  },
  {
    id: 'security',
    name: 'Kaspersky',
    tags: ['phần mềm', 'full service'],
    count: 47,
    image: require('../assets/icons/cloud.png')
  },
  {
    id: 'lightroom',
    name: 'Adobe Lightroom',
    tags: ['phần mềm', 'full service'],
    count: 47,
    image: require('../assets/icons/lightroom.png')
  },
];

const products = [
  {
    id: 1, 
    name: '16 Best Plants That Thrive In Your Bedroom',
    description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
    ]
  }
];

const explore = [
  // images
  require('../assets/images/explore_1.png'),
  require('../assets/images/explore_2.png'),
  require('../assets/images/explore_3.png'),
  require('../assets/images/explore_4.png'),
  require('../assets/images/explore_5.png'),
  require('../assets/images/explore_6.png'),
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

export {
  categories,
  explore,
  products,
  profile,
}