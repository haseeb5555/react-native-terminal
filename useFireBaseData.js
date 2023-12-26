import { useEffect, useState } from 'react';
import { fetchDataFromFirestore } from './fetchData';

const useFirebaseData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestoreData = await fetchDataFromFirestore();
      setData(firestoreData);
    };

    fetchData();
  }, []);

  return data;
};

export default useFirebaseData;
