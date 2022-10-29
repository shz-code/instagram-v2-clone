import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useNotifications(uid) {
  const [userNotis, setUserNotis] = useState([]);
  const [notiLoading, setNotiLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const userNotiRef = collection(db, `noti:${uid}`);
      const userNotiQuery = query(
        userNotiRef,
        orderBy("dateCreated", "desc"),
        limit(10)
      );
      try {
        const snapshot = await getDocs(userNotiQuery);
        setUserNotis([]);
        snapshot.forEach((doc) => {
          setUserNotis((prev) => {
            return [...prev, doc.data()];
          });
        });
        setNotiLoading(false);
      } catch (err) {
        console.log(err);
        setNotiLoading(false);
      }
    };
    fetchData();

    return fetchData;
  }, [uid]);
  return {
    userNotis,
    notiLoading,
  };
}
