import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";

const updateComments = async (
  docId,
  comment,
  username,
  profilePhotoUrl,
  postUserId,
  postId,
  userId
) => {
  const db = getFirestore();
  const postsRef = doc(db, "posts", docId);
  const userPostRef = doc(db, postUserId.toString(), postId.toString());
  try {
    await updateDoc(postsRef, {
      comments: arrayUnion({
        comment: comment,
        displayName: username,
        profilePhotoUrl: profilePhotoUrl,
        userId: userId,
      }),
    });
    await updateDoc(userPostRef, {
      comments: arrayUnion({
        comment: comment,
        displayName: username,
        profilePhotoUrl: profilePhotoUrl,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export default updateComments;
