import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {

    apiKey: "AIzaSyBOduGHkKHFkuzrQK3fQjcTjBN5uMqZEYU",
  
    authDomain: "netflixclone-1c807.firebaseapp.com",
  
    projectId: "netflixclone-1c807",
  
    storageBucket: "netflixclone-1c807.appspot.com",
  
    messagingSenderId: "131968264421",
  
    appId: "1:131968264421:web:07e17eb1114397a73e4c0c",
  
    measurementId: "G-RHVE8DS5W8"
  
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

  
  