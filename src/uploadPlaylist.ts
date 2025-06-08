// src/uploadPlaylist.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { playlistData } from "@/data/playlist"; // Correct path to playlist.ts

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxh2LNQf7qkuxrvDwXzCY2YIfFrE-C99Q",
  authDomain: "masque-management.firebaseapp.com",
  projectId: "masque-management",
  storageBucket: "masque-management.firebasestorage.app",
  messagingSenderId: "146755242300",
  appId: "1:146755242300:web:1690d15aaee5f327ea3639",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Upload the playlist to Firestore
async function uploadPlaylist() {
  const colRef = collection(db, "playlist");

  // Loop through the playlistData and upload each track
  for (const track of playlistData) {
    try {
      const docRef = await addDoc(colRef, track);
      console.log(`Uploaded: ${track.title} with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error uploading playlist track:", error);
    }
  }
}

uploadPlaylist();
