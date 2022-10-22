import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const postsRef = collection(db, "photos");
      const postsQuery = query(postsRef);
      try {
        const snapshot = await getDocs(postsQuery);
        snapshot.forEach((doc) => {
          setPosts((prev) => {
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
  }, []);
  return {
    posts,
    loading,
  };
}