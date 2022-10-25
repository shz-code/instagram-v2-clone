import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function usePosts(userId) {
  const [userPosts, setUserPosts] = useState([]);
  const [loadingUP, setLoadingUP] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const userPostsRef = collection(db, userId);
      const userPostsQuery = query(userPostsRef);
      try {
        const snapshot = await getDocs(userPostsQuery);
        snapshot.forEach((doc) => {
          setUserPosts((prev) => {
            return [...prev, doc.data()];
          });
          setLoadingUP(false);
        });
      } catch (err) {
        console.log(err);
        setLoadingUP(false);
      }
    };
    fetchData();

    return fetchData;
  }, []);
  return {
    userPosts,
    loadingUP,
  };
}
