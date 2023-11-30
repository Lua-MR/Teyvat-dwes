
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
  const app= initializeApp(firebaseConfig);
  const db=getDatabase();


function renderCharacterCards(characters) {
    const characterCardsContainer = document.getElementById('characterCards');
    characterCardsContainer.innerHTML = '';

    characters.forEach(character => {
        const card = createCharacterCard(character);
        characterCardsContainer.appendChild(card);
    });
}

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');

    const characterImage = document.createElement('img');
    characterImage.src = character.imagem;
    characterImage.alt = character.name;
    card.appendChild(characterImage);

    const characterInfo = document.createElement('div');
    characterInfo.innerHTML = `
        <p><strong>${character.name}</strong></p>
        <p><strong>Nacao:</strong> ${character.nacao}</p>
        <p><strong>Arma:</strong> ${character.arma}</p>
        <p><strong>Estrelas:</strong> ${character.estrelas}</p>
        <p><strong>Nivel:</strong> ${character.nivel}</p>
        <p><strong>Vida:</strong> ${character.vida}</p>
        <p><strong>Ataque:</strong> ${character.atq}</p>
        <p><strong>Defesa:</strong> ${character.def}</p>
        <p><strong>Proficiência:</strong> ${character.prof}</p>
        <p><strong>Elemento:</strong> ${character.elemento}</p>
        <button class="btn btn-favorite" onclick="toggleFavorite('${character.id}')">
            ${character.favorito ? 'Remover Favorito' : 'Adicionar Favorito'}
        </button>
        <button class="btn btn-add" onclick="openAddCharacterModal('${character.id}')">
            Adicionar Personagem
        </button>
    `;
    card.appendChild(characterInfo);

    return card;
}

// Adiciona um novo personagem ao banco de dados
function addCharacterToDatabase(characterData) {
    // Aqui você deve enviar os dados para o Firebase Realtime Database
    // Substitua esta parte com a lógica do seu projeto
    const newItemRef = push(ref(db, 'personagens'));
    set(newItemRef, characterData);
}

function openAddCharacterModal(characterId) {
    const nomePersonagem = prompt('Nome do Personagem:');
    const nacaoPersonagem = prompt('Nação do Personagem:');
    const estrelasPersonagem = prompt('Estrelas do Personagem:');

    // Adiciona um input para a seleção da imagem
    const imagemPersonagem = prompt('Link da Imagem do Personagem:');

    // Adicione outros prompts conforme necessário para outros campos

    const characterData = {
        id: characterId,
        nome: nomePersonagem,
        nacao: nacaoPersonagem,
        estrelas: estrelasPersonagem,
        imagem: imagemPersonagem, // Adiciona a imagem ao objeto de dados
        // Preencha os outros campos conforme necessário
    };

    if (nomePersonagem && nacaoPersonagem && estrelasPersonagem) {
        addCharacterToDatabase(characterData);
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCharacterCards(characters);
 });
  