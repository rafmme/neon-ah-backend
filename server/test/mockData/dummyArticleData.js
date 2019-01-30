const mockArticles = [
  {},
  {
    title: 'How to be a 10x developer',
    banner: 'https://unsplash.com/photos/eY7ETwocMyU',
    content: `it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)`,
    isPublished: true,
    tagsList: 'Tech, Skills, Productivity, Software'
  },
  {
    title: 'Using node.js to scale',
    banner: '66668',
    content: `it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`,
    isPublished: true,
    tagsList: 'Tech, Skills, Productivity, Software'
  },
  {
    title: '',
    content: '',
    isPublished: true,
  },
  {
    title: 'What is feels like to be a trend setter in 21st Century',
    content: `it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)`,
  },
  {
    title: 'What is feels like to be a trend setter in 21st Century',
    content: `it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)`,
  },
  [
    {
      id: "d3000031-92e9-44bc-96fa-4d25d86a1853",
      slug: "welcome-to-team-neon-vQYS0nYy",
      title: "Welcome to team neon",
      content: "lorem fsjhghg iwyfgawvjv jgfugwgg gjfufdf",
      banner: "https://unsplash.com/photos/Q7wDdmgCBFg",
      isPublished: true,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:15:19 PM",
      updatedAt: "Thu Jan 24 2019 11:15:19 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: [
        "Greetings",
        "Welcome"
      ]
    },
    {
      id: "b7ce233c-fd32-4b11-a302-23f91fc35b5e",
      slug: "hello-team-neon-4DFx3Y8z",
      title: "Hello team neon",
      content: "lorem fsjhghg iwyfgawvjv jgfugwgg gjfufdf gg",
      banner: "https://unsplash.com/photos/Q7wDdmgCBFg",
      isPublished: true,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:34:50 PM",
      updatedAt: "Thu Jan 24 2019 11:34:50 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: [
        "Greetings",
        "Love",
        "Welcome"
      ]
    },
    {
      id: "85745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
      slug: "how-to-google-in-2019",
      title: "How to google in 2019",
      content: "ensure you know the keywords to your question",
      banner: "https://www.imagurl.com/img.jpg",
      isPublished: true,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:11:48 PM",
      updatedAt: "Thu Jan 24 2019 11:11:48 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: []
    },
    {
      id: "70945c60-7b1a-11e8-9c9c-2d42b21b1a3e",
      slug: "universa-ergonomical-standard",
      title: "Measuring up to the universe standard",
      content: "This is just a testng article content",
      banner: "https://www.imagurl.com/img.jpg",
      isPublished: false,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:11:48 PM",
      updatedAt: "Thu Jan 24 2019 11:11:48 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: []
    },
    {
      id: "95745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
      slug: "how-to-be-a-10x-dev-sGNYfURm",
      title: "Mighty God",
      content: "Hallelujah",
      banner: "https://www.imagurl.com/img.jpg",
      isPublished: true,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:11:48 PM",
      updatedAt: "Thu Jan 24 2019 11:11:48 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: []
    },
    {
      id: "25745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
      slug: "What-a-mighty-God",
      title: "Mighty God",
      content: "Hallelujah",
      banner: "https://www.imagurl.com/img.jpg",
      isPublished: true,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:11:48 PM",
      updatedAt: "Thu Jan 24 2019 11:11:48 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: []
    },
    {
      id: "75745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
      slug: "how-to-say-hello-in-2019",
      title: "How to say hello in 2019",
      content: "open your mouth and say HELLO!",
      banner: "https://www.imagurl.com/img.jpg",
      isPublished: false,
      isReported: false,
      createdAt: "Thu Jan 24 2019 11:11:48 PM",
      updatedAt: "Thu Jan 24 2019 11:11:48 PM",
      author: {
        userName: "jesseinit",
        bio: "Gitting Started",
        img: null
      },
      tags: []
    }
],
{
  slug: 'bookmark-test1',
  title: 'Bookmark Test',
  banner: 'https://unsplash.com/photos/eY7ETwocMyU',
  content: `it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
  The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)`,
  tagsList: 'Tech, Skills, Productivity, Software'
},
];

export default mockArticles;
