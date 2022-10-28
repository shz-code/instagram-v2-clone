import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const userNewPost = async (
  userId,
  username,
  name,
  profilePhotoUrl,
  caption,
  imgSrc,
  postId
) => {
  const db = getFirestore();
  const userPostsRef = doc(db, userId, postId.toString());
  try {
    await addDoc(collection(db, "posts"), {
      userId: userId,
      username: username,
      fullName: name,
      profilePhotoUrl: profilePhotoUrl,
      caption: caption,
      comments: [],
      likes: [],
      postId: postId,
      imageSrc: imgSrc,
      dateCreated: Date.now(),
    });
    await setDoc(userPostsRef, {
      userId: userId,
      comments: [],
      likes: [],
      postId: postId,
      imageSrc: imgSrc,
      dateCreated: Date.now(),
    });
  } catch (err) {
    console.log("There was an error creating the post");
  }
};

export default userNewPost;
