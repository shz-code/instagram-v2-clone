import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const users = [
  {
    userId: "1VKziKKg8rTAZEw4N8mJneGDEWu2",
    username: "karl",
    fullName: "Karl Hadwen",
    emailAddress: "karlhadwen@gmail.com",
    following: ["jjdgtawns1762AS"],
    followers: ["jjdgtawns1762AS", "asdb123asd2", "8715asawdsZAW"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/karl.jpg`,
  },
  {
    userId: "jjdgtawns1762AS",
    username: "raphael",
    fullName: "Raffaello Sanzio da Urbino",
    emailAddress: "raphael@sanzio.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/raphael.jpg`,
  },
  {
    userId: "asdb123asd2",
    username: "dali",
    fullName: "Salvador Dalí",
    emailAddress: "salvador@dali.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/dali.jpg`,
  },
  {
    userId: "8715asawdsZAW",
    username: "orwell",
    fullName: "George Orwell",
    emailAddress: "george@orwell.com",
    following: [],
    followers: [],
    dateCreated: Date.now(),
    profilePhotoUrl: `./images/avaters/orwell.jpg`,
  },
];

const posts = [
  {
    postId: "1",
    userId: "asdb123asd2",
    username: "dali",
    profilePhotoUrl: `./images/avaters/dali.jpg`,
    imageSrc: `./images/users/raphael/1.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
        profilePhotoUrl: `./images/avaters/raphael.jpg`,
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
        profilePhotoUrl: `./images/avaters/orwell.jpg`,
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    postId: "2",
    userId: "jjdgtawns1762AS",
    username: "raphael",
    profilePhotoUrl: `./images/avaters/raphael.jpg`,
    imageSrc: `./images/users/raphael/2.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "dali",
        comment: "Love this place, looks like my animal farm!",
        profilePhotoUrl: `./images/avaters/dali.jpg`,
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
        profilePhotoUrl: `./images/avaters/orwell.jpg`,
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    postId: "3",
    userId: "asdb123asd2",
    username: "dali",
    profilePhotoUrl: `./images/avaters/dali.jpg`,
    imageSrc: `./images/users/raphael/3.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
        profilePhotoUrl: `./images/avaters/raphael.jpg`,
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
        profilePhotoUrl: `./images/avaters/orwell.jpg`,
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    postId: "4",
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
        profilePhotoUrl: `./images/avaters/raphael.jpg`,
      },
      {
        displayName: "orwell",
        comment: "Would you mind if I used this picture?",
        profilePhotoUrl: `./images/avaters/kaorwellrl.jpg`,
      },
    ],
    userLatitude: "40.7128°",
    userLongitude: "74.0060°",
    dateCreated: Date.now(),
  },
  {
    postId: "5",
    userId: "8715asawdsZAW",
    username: "orwell",
    profilePhotoUrl: `./images/avaters/orwell.jpg`,
    imageSrc: `./images/users/raphael/5.jpg`,
    caption: "Saint George and the Dragon",
    likes: [],
    comments: [
      {
        displayName: "raphael",
        comment: "Love this place, looks like my animal farm!",
        profilePhotoUrl: `./images/avaters/raphael.jpg`,
      },
      {
        displayName: "karl",
        comment: "Would you mind if I used this picture?",
        profilePhotoUrl: `./images/avaters/karl.jpg`,
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

const addUserPosts = async () => {
  const db = getFirestore();
  const docRef = doc(db, "1VKziKKg8rTAZEw4N8mJneGDEWu2", "4");
  try {
    await setDoc(docRef, {
      postId: "4",
      userId: "asdb123asd2",
      imageSrc: `./images/users/raphael/3.jpg`,
      likes: [],
      comments: [
        {
          displayName: "raphael",
          comment: "Love this place, looks like my animal farm!",
          profilePhotoUrl: `./images/avaters/raphael.jpg`,
        },
        {
          displayName: "orwell",
          comment: "Would you mind if I used this picture?",
          profilePhotoUrl: `./images/avaters/kaorwellrl.jpg`,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};

export { addPosts, addUser, addUserPosts };
