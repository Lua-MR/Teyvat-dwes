import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, update, get, set, child, remove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
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
const db = getDatabase(app);
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


 let contadorId = 0;

 function carregarPersonagens() {
  contadorId = 0;
  const characterCards = document.getElementById("characterCards");
  characterCards.innerHTML = "";

  const personagensRef = ref(db, 'person');

  get(personagensRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const personagem = childSnapshot.val();
        const card = criarCard(personagem);
        characterCards.appendChild(card);
        contadorId++;

      });
    } else {
      console.log("Nenhum personagem encontrado no banco de dados.");
    }
  }).catch((error) => {
    console.error("Erro ao carregar personagens:", error);
  });
  document.getElementById("searchFilter").addEventListener("input", filterCharacters);

}

function filterCharacters() {
  const searchFilter = document.getElementById("searchFilter").value.toLowerCase();

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const id = card.dataset.personId;
    const nome = card.querySelector("h2").textContent.toLowerCase();
   
    if (searchFilter === "") {

        preencherCampos(null);
      } else {
    const isMatchingSearch = nome.includes(searchFilter);
    if (isMatchingSearch) {
      card.style.display = "block";
    
      const personagemEncontrado = {
        id: id,
        nome: card.querySelector("h2").textContent,
        nacao: card.querySelector("p:nth-child(3)").textContent.replace("Nação: ", ""),
        arma: card.querySelector("p:nth-child(5)").textContent.replace("Arma: ", ""),
        estrelas: parseInt(card.querySelector("p:nth-child(6)").textContent.replace("Estrelas: ", "")),
        nivel: parseInt(card.querySelector("p:nth-child(7)").textContent.replace("Nível: ", "")),
        vida: parseInt(card.querySelector("p:nth-child(8)").textContent.replace("Vida: ", "")),
        atq: parseInt(card.querySelector("p:nth-child(9)").textContent.replace("Ataque: ", "")),
        defesa: parseInt(card.querySelector("p:nth-child(10)").textContent.replace("Defesa: ", "")),
        proficiencia: parseInt(card.querySelector("p:nth-child(11)").textContent.replace("Proficiência: ", "")),
        elemento: card.querySelector("p:nth-child(4)").textContent.replace("Elemento: ", "")
      };

      preencherCampos(personagemEncontrado);
    } else {
      card.style.display = "none";
      
    }
}
  });
}

function preencherCampos(personagem) {
    if (personagem) {
      document.getElementById("idAlterar").value = personagem.id || "";
      document.getElementById("nomeAlterar").value = personagem.nome || "";
      document.getElementById("nacaoAlterar").value = personagem.nacao || "";
      document.getElementById("armaAlterar").value = personagem.arma || "";
      document.getElementById("estrelasAlterar").value = personagem.estrelas || "";
      document.getElementById("nivelAlterar").value = personagem.nivel || "";
      document.getElementById("vidaAlterar").value = personagem.vida || "";
      document.getElementById("atqAlterar").value = personagem.atq || "";
      document.getElementById("defAlterar").value = personagem.defesa || "";
      document.getElementById("profAlterar").value = personagem.proficiencia || "";
      document.getElementById("elementoAlterar").value = personagem.elemento || "";
    } else {
     
      limparCampos();
    }
  }

function criarCard(personagem) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.personId = personagem.id;

  const isFavorite = personagem.favorito;
  const buttonText = isFavorite ? '★' : '☆';
  const buttonColor = isFavorite ? 'gold' : 'white';

  const favoritosButton = document.createElement("button");
  favoritosButton.className = "favoritos-button";
  

  adicionarEstilos(card, personagem.elemento);
  const estrelasHTML = gerarEstrelas(personagem.estrelas);

  card.appendChild(favoritosButton); 
  card.innerHTML += `
    <h2>${personagem.nome}</h2>
    <p>Nação: ${personagem.nacao}</p>
    <p>Elemento: ${personagem.elemento}</p>
    <p>Arma: ${personagem.arma}</p>
    <p>Estrelas: ${estrelasHTML}</p>
    <p>Nível: ${personagem.nivel}</p>
    <p>Vida: ${personagem.vida}</p>
    <p>Ataque: ${personagem.atq}</p>
    <p>Defesa: ${personagem.defesa}</p>
    <p>Proficiência: ${personagem.proficiencia}</p>
  `;

  return card;
}


function gerarEstrelas(quantidade) {
  const estrelasHTML = Array.from({ length: quantidade }, () => "⭐").join("");
  return estrelasHTML;
}

function adicionarEstilos(card, elemento) {
    card.style.borderRadius = "10px";
  
    const elementoLowerCase = elemento.toLowerCase(); 
  
    switch (elementoLowerCase) {
      case "electro":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(97,54,138,1) 0%, rgba(175,111,174,1) 52%, rgba(58,0,96,1) 100%)";
        break;
      case "anemo":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(125,199,159,1) 0%, rgba(0,228,126,1) 45%, rgba(153,221,194,1) 100%)";
        break;
      case "dendro":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(51,130,60,1) 0%, rgba(123,244,121,1) 52%, rgba(21,163,4,1) 100%)";
        break;
      case "geo":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(199,167,97,1) 0%, rgba(231,205,74,1) 52%, rgba(227,114,16,1) 100%)";
        break;
      case "hydro":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(97,112,199,1) 0%, rgba(74,79,231,1) 52%, rgba(16,215,227,1) 100%)";
        break;
      case "pyro":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(214,29,29,1) 2%, rgba(255,81,81,1) 46%, rgba(182,43,43,1) 83%)";
        break;
      case "cryo":
        card.style.backgroundImage = "linear-gradient(90deg, rgba(65,199,213,1) 0%, rgba(168,213,206,1) 45%, rgba(83,211,237,1) 100%)";
        break;
     
    default:
      card.style.backgroundImage = "linear-gradient(90deg, rgba(238,118,103,1) 0%, rgba(233,231,59,1) 16%, rgba(105,215,95,1) 36%, rgba(29,253,195,1) 54%, rgba(123,166,230,1) 71%, rgba(172,129,233,1) 82%, rgba(252,69,237,1) 100%)";
      break;
    }
  }

 function adicionarPersonagem() {

  const nome = document.getElementById("nome").value;
  const nacao = document.getElementById("nacao").value;
  const arma = document.getElementById("arma").value;
  const estrelas = parseInt(document.getElementById("estrelas").value);
  const nivel = parseInt(document.getElementById("nivel").value);
  const vida = parseInt(document.getElementById("vida").value);
  const atq = parseInt(document.getElementById("atq").value);
  const defesa = parseInt(document.getElementById("def").value);
  const proficiencia = parseInt(document.getElementById("prof").value);
  const elemento = document.getElementById("elemento").value;

  contadorId++;
  const person = {
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
      favorito: false
    
  };

  enviarParaFirebase(person);
  carregarPersonagens();
  limparCampos();
  alert("Personagem adicionado");
  
}

function atualizarPersonagem() {

  const idp =  document.getElementById("idAlterar").value;
  const nome = document.getElementById("nomeAlterar").value;
  const nacao = document.getElementById("nacaoAlterar").value;
  const arma = document.getElementById("armaAlterar").value;
  const estrelas = parseInt(document.getElementById("estrelasAlterar").value);
  const nivel = parseInt(document.getElementById("nivelAlterar").value);
  const vida = parseInt(document.getElementById("vidaAlterar").value);
  const atq = parseInt(document.getElementById("atqAlterar").value);
  const defesa = parseInt(document.getElementById("defAlterar").value);
  const proficiencia = parseInt(document.getElementById("profAlterar").value);
  const elemento = document.getElementById("elementoAlterar").value;

  console.log(idp);

const person = {
      id: idp,
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
      favorito: false
    
  };

  const itensRef = ref(db, 'person/' + idp);
  update(itensRef, person);
  carregarPersonagens();
  

  
}

function excluirPersonagem(){
  const idp = document.getElementById("idAlterar").value;


  const personagensRef = ref(db, 'person/' + idp);

  remove(personagensRef).then(() => {
    console.log('Personagem excluído com sucesso!');
    limparCampos();
    carregarPersonagens();
  }).catch((error) => {
    console.error('Erro ao excluir personagem:', error);
  });
  }

 function enviarParaFirebase(person) {

  const itensRef = ref(db, 'person/' + contadorId);
  set(itensRef, person);
  contadorId++;
  
}


function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("nacao").value = "";
    document.getElementById("arma").value = "";
    document.getElementById("estrelas").value = "";
    document.getElementById("nivel").value = "";
    document.getElementById("vida").value = "";
    document.getElementById("atq").value = "";
    document.getElementById("def").value = "";
    document.getElementById("prof").value = "";
    document.getElementById("elemento").value = "";
  
    document.getElementById("idAlterar").value = " ";
    document.getElementById("nomeAlterar").value =  "";
    document.getElementById("nacaoAlterar").value =  "";
    document.getElementById("armaAlterar").value =  "";
    document.getElementById("estrelasAlterar").value =  "";
    document.getElementById("nivelAlterar").value = "";
    document.getElementById("vidaAlterar").value =  "";
    document.getElementById("atqAlterar").value = "";
    document.getElementById("defAlterar").value = "";
    document.getElementById("profAlterar").value =  "";
    document.getElementById("elementoAlterar").value =  "";
  }
  

document.addEventListener("DOMContentLoaded", carregarPersonagens);
document.getElementById("btlimparper").addEventListener("click", limparCampos);
document.getElementById("btsalvarper").addEventListener("click", adicionarPersonagem);
document.getElementById("btsalvarperatt").addEventListener("click", atualizarPersonagem);

document.getElementById("excluirp").addEventListener("click", excluirPersonagem);

