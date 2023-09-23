import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIRABASE!,
  authDomain: "product-managament.firebaseapp.com",
  projectId: "product-managament",
  storageBucket: "product-managament.appspot.com",
  messagingSenderId: "585071773978",
  appId: "1:585071773978:web:41cc7f298d56c26d8a84a3",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
