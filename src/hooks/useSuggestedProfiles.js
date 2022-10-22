import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useSuggestedProfile(uid) {
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const suggestedUsersRef = collection(db, "users");
      const suggestedUsersQuery = query(suggestedUsersRef);
      try {
        const snapshot = await getDocs(suggestedUsersQuery);
        snapshot.forEach((doc) => {
          if (
            doc.data().userId !== uid &&
            !doc.data().followers?.includes(uid)
          ) {
            setSuggestedProfiles((prev) => {
              return [...prev, doc.data()];
            });
          }
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();

    return fetchData;
  }, []);
  return {
    suggestedProfiles,
    loading,
  };
}
