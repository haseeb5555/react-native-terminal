import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, View, TextInput , } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc, onSnapshot } from 'firebase/firestore';
import app from './firebase';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
export default function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const dbFS = getFirestore();
    const snapshot = collection(dbFS, 'mycoll');
    const q = query(snapshot, ref);
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    });
  }, []);

  const handleSearch = () => {
    const dbFS = getFirestore();
    const snapshot = collection(dbFS, 'mycoll');
    const q = query(snapshot, where('name', '==', searchText));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 44,
  },
});