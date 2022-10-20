const addUser = async (users) => {
  let i;
  for (i = 0; i < users.length; ++i) {
    try {
      const docRef = await addDoc(collection(db, "users"), users[i]);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
};
const addPhotos = async () => {
  let i;
  for (i = 1; i <= 5; ++i) {
    try {
      const docRef = await addDoc(collection(db, "photos"), {
        photoId: i,
        userId: "2",
        imageSrc: `./images/users/raphael/${i}.jpg`,
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
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
};

const users = [
  {
    userId: "1VKziKKg8rTAZEw4N8mJneGDEWu2",
    username: "karl",
    fullName: "Karl Hadwen",
    emailAddress: "karlhadwen@gmail.com",
    following: ["2"],
    followers: ["2", "3", "4"],
    dateCreated: Date.now(),
  },
  {
    userId: "2",
    username: "raphael",
    fullName: "Raffaello Sanzio da Urbino",
    emailAddress: "raphael@sanzio.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
  },
  {
    userId: "3",
    username: "dali",
    fullName: "Salvador Dalí",
    emailAddress: "salvador@dali.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
  },
  {
    userId: "4",
    username: "orwell",
    fullName: "George Orwell",
    emailAddress: "george@orwell.com",
    following: [],
    followers: ["1VKziKKg8rTAZEw4N8mJneGDEWu2"],
    dateCreated: Date.now(),
  },
];
