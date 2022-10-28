import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const updateFollowing = async (docId, userId, flag) => {
  const db = getFirestore();
  const profileRef = doc(db, "users", docId);
  try {
    if (flag) {
      await updateDoc(profileRef, {
        following: arrayUnion(userId),
      });
    } else {
      await updateDoc(profileRef, {
        following: arrayRemove(userId),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateFollowing;
