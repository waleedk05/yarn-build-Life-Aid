import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDB74dG-bCG8afLqmAXxMqxV6C4rJj92xY",
    authDomain: "lifeaidtest-1e0d2.firebaseapp.com",
    projectId: "lifeaidtest-1e0d2",
    storageBucket: "lifeaidtest-1e0d2.appspot.com",
    messagingSenderId: "628105333743",
    appId: "1:628105333743:web:6e2f28228313718cefc41a",
    measurementId: "G-W0V5Z8421N"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);
const dbRealtime = getDatabase(app);

export { auth, db, storage, dbRealtime };