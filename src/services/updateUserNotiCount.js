import { doc, getFirestore, updateDoc } from "firebase/firestore";

const updateUserNotiCount = async (docId, userId, count) => {
  const db = getFirestore();
  const profileRef = doc(db, "users", docId);
  try {
    await updateDoc(profileRef, {
      notificationRead: count,
    });
  } catch (err) {
    console.log(err);
  }
};

export default updateUserNotiCount;
