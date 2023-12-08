import { initializeApp } from "https:www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
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

  get(personagensRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const personagensArray = [];

        snapshot.forEach((childSnapshot) => {
          const personagem = childSnapshot.val();
          personagensArray.push(personagem);
        });

        const personagensOrdenados = personagensArray.sort((a, b) => a.nome.localeCompare(b.nome));

        personagensOrdenados.forEach((personagem) => {
          const card = criarCard(personagem);
          characterCards.appendChild(card);
          contadorId++;
        });
      } else {
        console.log("Nenhum personagem encontrado no banco de dados.");
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar personagens:", error);
    });

  document.getElementById("searchFilter").addEventListener("input", filterCharacters);
}


function filterCharacters() {
  const searchFilter = document.getElementById("searchFilter").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const nome = card.querySelector("h2").textContent.toLowerCase();
    const elemento = card.querySelector("p:nth-child(5)").textContent.toLowerCase().replace("elemento: ", "");
    const arma = card.querySelector("p:nth-child(6)").textContent.toLowerCase().replace("arma: ", "");

    const isMatchingSearch = nome.includes(searchFilter) || elemento.includes(searchFilter) || arma.includes(searchFilter);

    if (isMatchingSearch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


function atualizarCard(personagem, favoritosButton) {
  const user = auth.currentUser;

  if (user) {
  const uid = user.uid;

  const personagensUserRef = ref(db, `person/favorites/${uid}/${personagem.id}`);

  get(personagensUserRef).then((snapshot) => {
    if (snapshot.exists()) {
      personagem.favorito = true;
      const personagensRef = ref(db, `person/${personagem.id}`);
      update(personagensRef, { favorito: true });
     
    } else {
      
      personagem.favorito = false;
      const personagensRef = ref(db, `person/${personagem.id}`);
      update(personagensRef, { favorito: false });
     
    }

    const buttonText = personagem.favorito ? '★' : '☆';
    const buttonColor = personagem.favorito ? 'gold' : 'white';
    favoritosButton.textContent = buttonText;
    favoritosButton.style.backgroundColor = buttonColor;
  });
} else {
  console.log("Usuário não logado");
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
  favoritosButton.textContent = buttonText;
  favoritosButton.style.backgroundColor = buttonColor;

  adicionarEstilos(card, personagem.elemento);
  const estrelasHTML = gerarEstrelas(personagem.estrelas);

  card.appendChild(favoritosButton); 
  card.innerHTML += `
  <br>
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

  atualizarCard(personagem, favoritosButton);

  return card;
}


characterCards.addEventListener("click", (event) => {
  const targetButton = event.target.closest(".favoritos-button");
  if (targetButton) {
    const card = targetButton.closest(".card");
    const personId = card.dataset.personId;

    const user = auth.currentUser;
    if (user) {
      toggleFavorite(personId, targetButton);
      console.log('Botão de favoritos clicado!');
    } else {
      alert(" Faça login para adicionar aos favoritos.");
    }
  }
});


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

function toggleFavorite(personId, button) {

  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    const personagensUserRef = ref(db, `person/favorites/${uid}/${personId}`);

    get(personagensUserRef)
    .then((snapshot) => {
      const updatedFavoriteStatus = !snapshot.exists();

      if (updatedFavoriteStatus) {
        const personagensRef = ref(db, `person/${personId}`);
        get(personagensRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const personagem = snapshot.val();
            personagem.favorito = true;

            const itensRef = ref(db, `person/favorites/${uid}/${personId}`);
            set(itensRef, personagem);

            atualizarCard(personagem, button);
          }
        });
      } else {
        const personagem = snapshot.val();
        personagem.favorito = false;
        const itensRef = ref(db, `person/${personId}`);
        set(itensRef, personagem);
        atualizarCard({ favorito: false }, button);
        remove(personagensUserRef);
       
       
      }

      const buttonText = updatedFavoriteStatus ? '★' : '☆';
      const buttonColor = updatedFavoriteStatus ? 'gold' : 'white';
      button.textContent = buttonText;
      button.style.backgroundColor = buttonColor;
    }).catch((error) => {
      console.error("Error checking favorite status:", error);
    });
  } else {
    alert(" Faça login para adicionar aos favoritos.");
  }
}


document.addEventListener("DOMContentLoaded", carregarPersonagens);
