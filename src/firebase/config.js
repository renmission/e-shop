
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAKkzAgRBYt43Eoeu45JtXGnwAMv_AdXhY",
  authDomain: "eshop-4c50f.firebaseapp.com",
  projectId: "eshop-4c50f",
  storageBucket: "eshop-4c50f.appspot.com",
  messagingSenderId: "134306509837",
  appId: "1:134306509837:web:2e47fced14cd126ca4d144"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;