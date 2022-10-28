import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const updateFollower = async (docId, userId, flag) => {
  const db = getFirestore();
  const profileRef = doc(db, "users", docId);
  try {
    if (flag) {
      await updateDoc(profileRef, {
        followers: arrayUnion(userId),
      });
    } else {
      await updateDoc(profileRef, {
        followers: arrayRemove(userId),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateFollower;
