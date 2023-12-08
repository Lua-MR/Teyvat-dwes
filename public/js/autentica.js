  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyABzPZI-zfsf6HynvCyEQjVA9s0oHQOFr0",
    authDomain: "teyvatdwe.firebaseapp.com",
    databaseURL: "https://teyvatdwe-default-rtdb.firebaseio.com",
    projectId: "teyvatdwe",
    storageBucket: "teyvatdwe.appspot.com",
    messagingSenderId: "921626372720",
    appId: "1:921626372720:web:c20f931ad0f94a3c0fa2b5",
    measurementId: "G-QKX6HW4KCJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);