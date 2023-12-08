import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";


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
const db = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);

    console.log("UID do usuário:", uid);
  } else {
    console.log("Usuário não autenticado");
  }
});


function enviarMensagem() {
    const nomefale = document.getElementById("nome").value;
    const emailfale = document.getElementById("email").value;
    const mensagemfale = document.getElementById("mensagem").value;

    if (!mensagemfale) {
        alert("Por favor, preencha o campo de mensagem.");
        return;
    }

    const user = auth.currentUser;

    if (user) {
        const fale = {
            nome: nomefale || "", 
            email: emailfale || "", 
            mensagem: mensagemfale
        };
    
    enviarParaFirebase(fale);

    alert("Mensagem enviada com sucesso!");

    limparCampos();
} else {
    alert("Usuário não autenticado. Faça login para enviar mensagens.");
}
}

function enviarParaFirebase(fale) {
    const user = auth.currentUser;
    const uid = user.uid;

    const itensRef = ref(db, 'fale/' + uid );
    
    push(itensRef, fale);
    
}


function limparCampos() {
     console.log("entrou");
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensagem").value = "";
}


document.getElementById("limparCampos").addEventListener("click", limparCampos);
document.getElementById("enviarMensagem").addEventListener("click", enviarMensagem);
