import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLjhkvihtbmbLYRm8a4CetoYnMSSb5IHg",
  authDomain: "teyvatfarm-fab65.firebaseapp.com",
  databaseURL: "https://teyvatfarm-fab65-default-rtdb.firebaseio.com",
  projectId: "teyvatfarm-fab65",
  storageBucket: "teyvatfarm-fab65.appspot.com",
  messagingSenderId: "92083536567",
  appId: "1:92083536567:web:cfc6490a98c154b9ccc332",
  measurementId: "G-KZ4FBM2YQ1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

let contadorId = 0;

function adicionarPersonagem() {
  const tabela = document.getElementById("tabelaItens");
  const tbody = tabela.getElementsByTagName("tbody")[0];
  const quantidade = tbody.children.length + 1;

  const nome = document.getElementById("nome").value;
  const nacao = document.getElementById("nacao").value;
  const arma = document.getElementById("arma").value;
  const estrelas = parseInt(document.getElementById("estrelas").value);
  const nivel = parseInt(document.getElementById("nivel").value);
  const vida = parseInt(document.getElementById("vida").value);
  const atq = parseInt(document.getElementById("atq").value);
  const defesa = parseInt(document.getElementById("def").value);
  const proficiencia = parseInt(document.getElementById("prof").value); // Ensure this is a number
  const elemento = document.getElementById("elemento").value;

  // Gera uma nova referência usando push
  const newItemRef = push(ref(db, "personagens"));

  // Extrai o ID da referência gerada
  const itemId = newItemRef.key;

  const newRow = tbody.insertRow();
  newRow.setAttribute("data-id", itemId); // Define o atributo data-id com o ID gerado

  newRow.innerHTML = `
        <td>${quantidade}</td>
        <td>${nome}</td>
        <td>${nacao}</td>
        <td>${arma}</td>
        <td>${estrelas}</td>
        <td>${nivel}</td>
        <td>${vida}</td>
        <td>${atq}</td>
        <td>${defesa}</td>
        <td>${proficiencia}</td>
        <td>${elemento}</td>
    `;

  contadorId++;

  const personagem = {
    id: contadorId,
    nome: nome,
    nacao: nacao,
    arma: arma,
    estrelas: estrelas,
    nivel: nivel,
    vida: vida,
    atq: atq,
    defesa: defesa,
    proficiencia: proficiencia,
    elemento: elemento,
  };

  // Envia os dados para o Firebase
  set(newItemRef, personagem);
}

document
  .getElementById("btsalvarc")
  .addEventListener("click", adicionarPersonagem);
