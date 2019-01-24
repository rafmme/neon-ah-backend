export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [{
    id: '95745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    slug: 'how-to-be-a-10x-dev-sGNYfURm',
    title: 'Mighty God',
    content: 'Hallelujah',
    isPublished: true,
    banner: 'https://www.imagurl.com/img.jpg',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  },
  {
    id: '85745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    slug: 'how-to-google-in-2019',
    title: 'How to google in 2019',
    content: 'ensure you know the keywords to your question',
    isPublished: true,
    banner: 'https://www.imagurl.com/img.jpg',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  },
  {
    id: '25745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    slug: 'What-a-mighty-God',
    title: 'Mighty God',
    content: 'Hallelujah',
    isPublished: true,
    banner: 'https://www.imagurl.com/img.jpg',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  },
  {
    id: '75745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    slug: 'how-to-say-hello-in-2019',
    title: 'How to say hello in 2019',
    content: 'open your mouth and say HELLO!',
    isPublished: false,
    banner: 'https://www.imagurl.com/img.jpg',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',

  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
