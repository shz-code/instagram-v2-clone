import { addDoc, collection, getFirestore } from "firebase/firestore";

const users = [
  {
    userId: "1VKziKKg8rTAZEw4N8mJneGDEWu2",
    username: "karl",
    fullName: "Karl Hadwen",
    emailAddress: "karlhadwen@gmail.com",
    following: ["2"],
    followers: ["2", "3", "4"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/karl.jpg`,
  },
  {
    userId: "2",
    username: "raphael",
    fullName: "Raffaello Sanzio da Urbino",
    emailAddress: "raphael@sanzio.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/raphael.jpg`,
  },
  {
    userId: "3",
    username: "dali",
    fullName: "Salvador Dalí",
    emailAddress: "salvador@dali.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/dali.jpg`,
  },
  {
    userId: "4",
    username: "orwell",
    fullName: "George Orwell",
    emailAddress: "george@orwell.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/orwell.jpg`,
  },
];

const posts = [
  {
    photoId: "1",
    userId: "3",
    username: "dali",
    profilePhotoUrl: `./images/avaters/dali.jpg`,
    imageSrc: `./images/users/raphael/1.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    photoId: "2",
    userId: "2",
    username: "raphael",
    profilePhotoUrl: `./images/avaters/raphael.jpg`,
    imageSrc: `./images/users/raphael/2.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "dali",
        comment: "Love this place, looks like my animal farm!",
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    photoId: "3",
    userId: "3",
    username: "dali",
    profilePhotoUrl: `./images/avaters/dali.jpg`,
    imageSrc: `./images/users/raphael/3.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    photoId: "4",
    userId: "1VKziKKg8rTAZEw4N8mJneGDEWu2",
    username: "karl",
    profilePhotoUrl: `./images/avaters/karl.jpg`,
    imageSrc: `./images/users/raphael/4.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    photoId: "5",
    userId: "4",
    username: "orwell",
    profilePhotoUrl: `./images/avaters/orwell.jpg`,
    imageSrc: `./images/users/raphael/5.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
      },
      {
        displayName: "karl",
        comment: "Would you mind if I used this picture?",
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
];

const addUser = async () => {
  let i;
  const db = getFirestore();
  for (i = 0; i < users.length; ++i) {
    try {
      const docRef = await addDoc(collection(db, "users"), users[i]);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
};
const addPosts = async () => {
  let i;
  const db = getFirestore();
  for (i = 0; i < posts.length; ++i) {
    try {
      const docRef = await addDoc(collection(db, "posts"), posts[i]);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
};

export { addPosts, addUser };
