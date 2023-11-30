import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const db = getDatabase();

function enviarMensagem() {
    console.log("entrou");
    const nomefale = document.getElementById("nome").value;
    const emailfale = document.getElementById("email").value;
    const mensagemfale = document.getElementById("mensagem").value;

    // Verifica se a mensagem não está vazia
    if (!mensagemfale) {
        alert("Por favor, preencha o campo de mensagem.");
        return;
    }

    const fale = {
        nome: nomefale || "", // Adiciona um valor padrão vazio se nomefale for nulo
        email: emailfale || "", // Adiciona um valor padrão vazio se emailfale for nulo
        mensagem: mensagemfale
    };

    
    enviarParaFirebase(fale);

    alert("Mensagem enviada com sucesso!");

    limparCampos();
}

function enviarParaFirebase(fale) {
    // Crie uma referência para um novo nó no banco de dados
    const itensRef = ref(db, 'fale');
    
    push(itensRef, fale);
    
}

document.getElementById("limparCampos").addEventListener("click", limparCampos);

function limparCampos() {
     console.log("entrou");
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensagem").value = "";
}


document.getElementById("limparCampos").addEventListener('click', limparCampos);
document.getElementById("enviarMensagem").addEventListener("click", enviarMensagem);
