import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const updateLikes = async (docId, userId, liked) => {
  const db = getFirestore();
  const postsRef = doc(db, "posts", docId);
  try {
    if (liked) {
      await updateDoc(postsRef, {
        likes: arrayUnion(userId),
      });
    } else {
      await updateDoc(postsRef, {
        likes: arrayRemove(userId),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateLikes;
