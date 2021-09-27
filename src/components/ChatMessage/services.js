import { storage } from "../../firebase";

export const deleteMessage = async ({ messagesRef, messageId }) => {
  const storageRef = storage.ref(`/${messageId}`);
  const { items } = await storageRef.listAll();

  for await (let imageRef of items) {
    imageRef.delete();
  }
  messagesRef.doc(messageId).delete();
};
export const copyMessage = async ({ text }) => {
  navigator.clipboard.writeText(text);
};

export const getPhotos = async ({ storageIdFolder }) => {
  const storageRef = storage.ref(`/${storageIdFolder}`);
  const _photosList = await storageRef.listAll();
  const _listImages = [];
  for await (const imageRef of _photosList.items) {
    const url = await imageRef.getDownloadURL();
    _listImages.push(url);
  }
  return _listImages;
};
