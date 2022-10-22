import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useUserProfile(uid) {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("userId", "==", uid));
      try {
        const snapshot = await getDocs(usersQuery);
        snapshot.forEach((doc) => {
          setUserProfile({ ...doc.data() });
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();

    return fetchData;
  }, []);
  return {
    userProfile,
    loading,
  };
}
