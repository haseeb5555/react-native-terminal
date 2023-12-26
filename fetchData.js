import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';

export const storeDataInFirestore = async (data) => {
  try {
    const dbFS = getFirestore();
    const collectionRef = collection(dbFS, 'mycoll');

    await Promise.all(data.map(item => addDoc(collectionRef, item)));

  } catch (error) {
    console.error('Error storing data in Firestore', error);
  }
};

export const fetchDataFromFirestore = async () => {
  try {
    const dbFS = getFirestore();
    const collectionRef = collection(dbFS, 'mycoll');

    const q = query(collectionRef);
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching data from Firestore', error);
    return [];
  }
};
