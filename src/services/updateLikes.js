import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const updateLikes = async (docId, userId, liked, postUserId, postId) => {
  const db = getFirestore();
  const postsRef = doc(db, "posts", docId);
  const userPostRef = doc(db, postUserId.toString(), postId.toString());
  try {
    if (liked) {
      await updateDoc(postsRef, {
        likes: arrayUnion(userId),
      });
      await updateDoc(userPostRef, {
        likes: arrayUnion(userId),
      });
    } else {
      await updateDoc(postsRef, {
        likes: arrayRemove(userId),
      });
      await updateDoc(userPostRef, {
        likes: arrayRemove(userId),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateLikes;
