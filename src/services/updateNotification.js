import { addDoc, collection, getFirestore } from "firebase/firestore";

const updateNotification = async (
  senderId,
  senderName,
  senderPhotoUrl,
  type,
  receiverId
) => {
  const db = getFirestore();
  const recriverNotiRef = collection(db, `noti:${receiverId.toString()}`);
  try {
    await addDoc(recriverNotiRef, {
      userId: receiverId,
      type: type,
      sender: {
        userId: senderId,
        username: senderName,
        senderPhoto: senderPhotoUrl,
      },
      dateCreated: Date.now(),
    });
  } catch (err) {
    console.log(err);
  }
};

export default updateNotification;
