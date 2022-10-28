import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function usePosts(userProfile) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef);
      try {
        const snapshot = await getDocs(postsQuery);
        snapshot.forEach((doc) => {
          if (
            userProfile.following?.includes(doc.data().userId) &&
            doc.data().userId !== userProfile.userId
          ) {
            const newObj = _.cloneDeep(doc.data());
            newObj.docId = doc.id;
            setPosts((prev) => {
              return [...prev, newObj];
            });
          }
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();

    return fetchData;
  }, [userProfile.userId]);
  return {
    posts,
    loading,
  };
}
