import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

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
const auth = getAuth(app); 

document.addEventListener('DOMContentLoaded', () => {
  
const authEmailPassButton = document.getElementById("authEmailPassButton");
const authGoogleButton = document.getElementById("authGoogleButton");
const authAnonymouslyButton = document.getElementById("authAnonymouslyButton");
const createUserButton = document.getElementById("createUserButton");


const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");


const displayName = document.getElementById("displayName");


createUserButton.addEventListener("click", () => {
  console.log("entrei");
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
 
  .then(() => {
      alert(`Bem-vindo ${emailInput.value}`);
     
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      alert("Falha ao cadastrar, verifique o erro no console.");
    });
});

authEmailPassButton.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((result) => {
      console.log(result);
      alert(`Bem-vindo ${emailInput.value}`);
      if (emailInput.value == "adm@adm.com") {
        window.location.href = "../html/persoadm.html";
      }
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      alert("Email ou senha inválidos");
    });
});


authAnonymouslyButton.addEventListener("click", () => {
  signInAnonymously(auth)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("bem vindo desconhecida(o)");
  })
    .catch((error) => {
      console.error("Código do erro:", error.code);
      console.error("Mensagem do erro:", error.message);
      alert("Falha ao autenticar amo. Consulte o console para obter mais informações.");
    });
});


authGoogleButton.addEventListener("click", () => {
    console.log("entrei");
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const token = result.credential.accessToken;
      displayName.innerText = `Bem-vindo, ${result.user.displayName}`;
    })
    .catch((error) => {
      console.log("google" + error);
      alert("Falha na autenticação gg");
    });
});

});
