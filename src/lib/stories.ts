export type Story = {
  id: string;
  title: string;
  author: string;
  coverImageId: string;
  pages: {
    pageNumber: number;
    text: string;
    imageId: string;
    interactiveElement?: {
      word: string;
    };
  }[];
};

export const stories: Story[] = [
  {
    id: '1',
    title: 'The Magical Forest',
    author: 'Jane Doe',
    coverImageId: 'whimsytales-cover-1',
    pages: [
      {
        pageNumber: 1,
        text: 'Once upon a time, in a shimmering magical forest, lived a little squirrel named Squeaky. He loved to collect shiny nuts.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 2,
        text: 'One day, Squeaky found a peculiar, glowing acorn. When he touched it, the acorn started to bounce all around!',
        interactiveElement: {
          word: 'bounce',
        },
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 3,
        text: 'The bouncing acorn led him to a hidden part of the forest, where he met a wise old owl who taught him magic.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 4,
        text: "Squeaky the squirrel became the forest's new magical guardian, and everyone lived happily ever after. The End.",
        imageId: 'page-image-placeholder',
      },
    ],
  },
  {
    id: '2',
    title: 'The Boy Who Could Fly',
    author: 'John Smith',
    coverImageId: 'whimsytales-cover-2',
    pages: [
      {
        pageNumber: 1,
        text: 'Leo was not an ordinary boy. He had a secret. On windy days, he could fly high up in the sky!',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 2,
        text: 'He would soar above the houses and trees, waving to the birds. It was his favorite thing to do.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 3,
        text: 'One sunny afternoon, he saw a little kitten stuck in a tall tree. "I have to help!" he thought, and he swooped down to save it.',
        interactiveElement: {
          word: 'swooped',
        },
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 4,
        text: "Leo gently carried the kitten back to its owner. From that day on, he was known as the town's flying superhero. The End.",
        imageId: 'page-image-placeholder',
      },
    ],
  },
  {
    id: '3',
    title: 'The Mystery of the Missing Toy',
    author: 'Emily White',
    coverImageId: 'whimsytales-cover-3',
    pages: [
      {
        pageNumber: 1,
        text: 'Lily\'s favorite teddy bear, Barnaby, was missing! "Oh no! Where could he be?" she wondered.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 2,
        text: 'She looked under her bed, in the closet, and even in the garden. But Barnaby was nowhere to be found.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 3,
        text: 'Suddenly, she heard a little giggle from the laundry basket. She peeked inside and saw Barnaby hiding under a blanket!',
        interactiveElement: {
          word: 'giggle',
        },
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 4,
        text: 'It turned out her puppy, Max, had hidden him there to play a game. Lily hugged Barnaby tight, happy to have found her friend. The End.',
        imageId: 'page-image-placeholder',
      },
    ],
  },
  {
    id: '4',
    title: "The Little Bear's Big Journey",
    author: 'Michael Brown',
    coverImageId: 'whimsytales-cover-4',
    pages: [
      {
        pageNumber: 1,
        text: 'A little bear named Benji wanted to see the world. He packed a bag with honey snacks and set off on a big journey.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 2,
        text: 'He crossed a wide river, climbed a tall mountain, and walked through a field of colorful flowers.',
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 3,
        text: 'He met many new friends, like a friendly rabbit and a singing bluebird. They had a happy dance party together.',
        interactiveElement: {
          word: 'dance',
        },
        imageId: 'page-image-placeholder',
      },
      {
        pageNumber: 4,
        text: 'After his amazing adventure, Benji returned home with many stories to tell. He learned that the world is a wonderful place. The End.',
        imageId: 'page-image-placeholder',
      },
    ],
  },
];