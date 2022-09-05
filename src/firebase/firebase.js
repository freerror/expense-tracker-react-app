import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV04Oq50Y4uB3h9vZZw6nGxdk_7d3BA-M",
  authDomain: "xp3ns-1337.firebaseapp.com",
  projectId: "xp3ns-1337",
  storageBucket: "xp3ns-1337.appspot.com",
  messagingSenderId: "934659011074",
  appId: "1:934659011074:web:b9137404e945676df96d1b",
  measurementId: "G-3JEVVEPTGY"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)