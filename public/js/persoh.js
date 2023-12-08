import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, get, set} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const app= initializeApp(firebaseConfig);
const db=getDatabase();


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const filterButtons = document.getElementById("filterButtons");

const buttonsArray = Array.from(filterButtons.children);

const shuffledButtons = shuffleArray(buttonsArray);

filterButtons.innerHTML = "";

shuffledButtons.forEach(button => {
    filterButtons.appendChild(button);
});


function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function handleButtonClick(location) {
  openModal(`modal${location}`);
}

document.getElementById("btnMondstadt").addEventListener("click", function () {
  handleButtonClick("Mondstadt");
});

document.getElementById("btnLiyue").addEventListener("click", function () {
  handleButtonClick("Liyue");
});

document.getElementById("btnFontaine").addEventListener("click", function () {
  handleButtonClick("Fontaine");
});

document.getElementById("btnInazuma").addEventListener("click", function () {
  handleButtonClick("Inazuma");
});

document.getElementById("btnSumeru").addEventListener("click", function () {
  handleButtonClick("Sumeru");
});


document.getElementById("fecharMondstadt").addEventListener("click", function () {
  closeModal("modalMondstadt");
});

document.getElementById("fecharLiyue").addEventListener("click", function () {
  closeModal("modalLiyue");
});

document.getElementById("fecharFontaine").addEventListener("click", function () {
  closeModal("modalFontaine");
});

document.getElementById("fecharSumeru").addEventListener("click", function () {
  closeModal("modalSumeru");
});

document.getElementById("fecharInazuma").addEventListener("click", function () {
  closeModal("modalInazuma");
});




