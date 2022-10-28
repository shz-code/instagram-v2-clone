import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useNotifications(uid) {
  const [userNotis, setUserNotis] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const userNotiRef = collection(db, `noti:${uid}`);
      const userNotiQuery = query(userNotiRef);
      try {
        const snapshot = await getDocs(userNotiQuery);
        snapshot.forEach((doc) => {
          setUserNotis((prev) => {
            return [...prev, doc.data()];
          });
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();

    return fetchData;
  }, [uid]);
  return {
    userNotis,
    loading,
  };
}
