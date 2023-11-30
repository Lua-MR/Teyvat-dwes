  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCLjhkvihtbmbLYRm8a4CetoYnMSSb5IHg",
    authDomain: "teyvatfarm-fab65.firebaseapp.com",
    databaseURL: "https://teyvatfarm-fab65-default-rtdb.firebaseio.com",
    projectId: "teyvatfarm-fab65",
    storageBucket: "teyvatfarm-fab65.appspot.com",
    messagingSenderId: "92083536567",
    appId: "1:92083536567:web:cfc6490a98c154b9ccc332",
    measurementId: "G-KZ4FBM2YQ1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);