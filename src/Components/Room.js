import { collection, onSnapshot } from 'firebase/firestore';

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
    const roomsList = snapshot.docs.map(doc => doc.data());
    setRooms(roomsList);
  });

  return () => unsubscribe();
}, []);
