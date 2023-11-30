// Update your import statements in login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
console.log("Firebase inicializado com sucesso!");
console.log(firebase.auth());

// Buttons
const authEmailPassButton = document.getElementById('authEmailPassButton');
const authGoogleButton = document.getElementById('authGoogleButton');
const authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
const createUserButton = document.getElementById('createUserButton');
const logOutButton = document.getElementById('logOutButton');

// Inputs
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// Display
const displayName = document.getElementById('displayName');

console.log(authEmailPassButton, authGoogleButton, authAnonymouslyButton, createUserButton, logOutButton);
console.log(emailInput, passwordInput, displayName);

// Criar novo usuário
createUserButton.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(() => {
            alert(`Bem-vindo ${emailInput.value}`);
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console.');
        });
});

// Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(result => {
            console.log(result);
            displayName.innerText = `Bem-vindo, ${emailInput.value}`;
            alert(`Autenticado ${emailInput.value}`);
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.');
        });
});

// Logout
logOutButton.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        })
        .catch(error => {
            console.error(error);
        });
});

// Autenticar Anônimo
authAnonymouslyButton.addEventListener('click', () => {
    firebase.auth().signInAnonymously()
        .then(result => {
            console.log(result);
            displayName.innerText = 'Bem-vindo, desconhecido';
            alert('Autenticado Anonimamente');
        })
        .catch(error => {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.');
        });
});

// Autenticar com Google
authGoogleButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(result);
            const token = result.credential.accessToken;
            displayName.innerText = `Bem-vindo, ${result.user.displayName}`;
        })
        .catch(error => {
            console.log(error);
            alert('Falha na autenticação');
        });
});
