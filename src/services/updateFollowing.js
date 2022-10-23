import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";

const updateFollowing = async (docId, userId) => {
  const db = getFirestore();
  const profileRef = doc(db, "users", docId);
  try {
    await updateDoc(profileRef, {
      followers: arrayUnion(userId),
    });
  } catch (err) {
    console.log(err);
  }
};

export default updateFollowing;
