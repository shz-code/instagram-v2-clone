import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const userNameExists = async (username) => {
  let exists = false;
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("username", "==", username));
  try {
    const snapshot = await getDocs(usersQuery);
    snapshot.forEach((doc) => {
      exists = true;
    });
  } catch (err) {}

  return exists;
};

export default userNameExists;
