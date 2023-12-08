import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, set, get, remove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
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
  const app= initializeApp(firebaseConfig);
  const db=getDatabase();
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
  let pitty = 0;
  let pittyd = 0;
  let pityAlvo = 90;
  let lastPitty = 0;
  let dadosAntigos = {
      tabela: null,
      pitty: null
  };

  function adicionarItem() {
    const tabela = document.getElementById("tabelaItens");
    const tbody = tabela.getElementsByTagName("tbody")[0];

    const user = auth.currentUser;

    if (user) {
    const quantidade = tbody.children.length + 1;
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const estrelas = parseInt(document.getElementById("estrelas").value);
    const data = document.getElementById("data").value;

  
    if (!tipo || !estrelas) {
        alert("Por favor, preencha os campos Tipo e Estrelas.");
        return;
    }

    if (estrelas === 3 && tipo.toLowerCase() === "personagem") {
        alert("Personagens de 3 estrelas não podem ter o tipo 'personagem'.");
        return;
    }

    if (pittyd > 8) {
        if (estrelas !== 4) {
            alert("A cada 10 itens, pelo menos 1 deve ser de 4 estrelas.");
            pittyd = 0;
            return;
        }
    }

    if (pitty > 88 && estrelas !== 5) {
        alert("Até o pitty 90, você deve adicionar pelo menos 1 item de 5 estrelas.");
        return;
    }


   
    const newRow = tbody.insertRow();
    newRow.setAttribute("data-id", contadorId); 

    newRow.innerHTML = `
        <td>${quantidade}</td>
        <td>${nome}</td>
        <td>${tipo}</td>
        <td>${estrelas}</td>
        <td>${data || ""}</td>
    `;

    if (estrelas === 4) {
        newRow.classList.add("purple-row");
    } else if (estrelas === 5) {
        newRow.classList.add("gold-row");
        lastPitty = pitty;
        reiniciarPitty();
    } else {
        newRow.classList.add("simple-row");
    }


    incrementarPitty();
    atualizarGraficos();
    atualizarGraficoPizza();

    contadorId++;
    const desejo = {
        id: contadorId, 
        nome: nome,
        tipo: tipo,
        estrelas: estrelas,
        data: data || ""
    };

    enviarParaFirebase(desejo);
}else {
        alert("Usuário não autenticado. Faça login para enviar mensagens.");
    }
}

function enviarParaFirebase(desejo) {
    const user = auth.currentUser;
    const uid = user.uid;
  
    const newItemRef = ref(db, 'desejo/'+ uid + contadorId);
    
   set(newItemRef, desejo);
}

function incrementarPitty() {
    pitty++;
    pittyd++;
    document.getElementById("pittyCount").innerText = pitty;
}

function reiniciarPitty() {
    pitty = -1;
    document.getElementById("pittyCount").innerText = pitty;
}

function atualizarGraficos() {
    atualizarProgrBarra();
    atualizarGraficoPizza();
}

function LimparItem() {

    var confirmacao = confirm("Você tem certeza que deseja apagar todos os dados da tabela e do pitty?\n Essa ação não poderá ser desfeita!");
    
  
    if (confirmacao) {
      
        dadosAntigos.tabela = clonarTabela();
        dadosAntigos.pitty = document.getElementById("pittyCount").innerText;

    
        document.getElementById("nome").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("estrelas").value = "";
        document.getElementById("data").value = "";

    
        var tabela = document.getElementById("tabelaItens");
        var tbody = tabela.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";

        document.getElementById("pittyCount").innerText = "0";
        pitty = 0;
        atualizarGraficos();

       
        while(contadorId>=1){
            console.log(contadorId)
            const user = auth.currentUser;
            const uid = user.uid;

            remove(ref(db, "desejo/" + uid +  contadorId));
            contadorId--;
        }
    
      

    }
}


function DesfazItem() {
    console.log("Iniciando DesfazItem...");

    const tabela = document.getElementById("tabelaItens");
    const tbody = tabela.getElementsByTagName("tbody")[0];
    const rowCount = tbody.children.length;


    if (rowCount > 0) {
        const lastRow = tbody.children[rowCount - 1];
      
        const lastRowEstrelas = parseInt(lastRow.children[3].innerText);

        if (lastRowEstrelas === 5) {
            pitty = lastPitty; // Restaura o valor do pity anterior
            document.getElementById("pittyCount").innerText = pitty;
            contadorId=0;
        }

        const user = auth.currentUser;
        const uid = user.uid;

        remove(ref(db, "desejo/" + uid + contadorId));
        contadorId--;

       
        tbody.deleteRow(rowCount - 1);
        decrementarPitty();
        atualizarGraficos();
        atualizarGraficoPizza();
    }


    document.getElementById("pittyCount").innerText = "0";
    
   
}

function clonarTabela() {
    var tabela = document.getElementById("tabelaItens");
    var novaTabela = document.createElement('table');
    novaTabela.innerHTML = tabela.innerHTML;
    return novaTabela.outerHTML;
}


function decrementarPitty() {
    pitty = Math.max(0, pitty - 1);
    document.getElementById("pittyCount").innerText = pitty;
}

function randomnb() {
    return Math.floor(Math.random() * 100);
}

function atualizarProgrBarra() {
    const barraProgresso = document.getElementById("barraProgresso");
    let percentual = (pitty / pityAlvo) * 100;

    percentual = Math.min(100, percentual);

    barraProgresso.style.width = percentual + "%";
    barraProgresso.innerText = Math.round(percentual) + "%";

    if (pitty >= 70) {
        barraProgresso.classList.remove("bg-rosa");
        barraProgresso.classList.add("bg-rosaa");
    } else {
        barraProgresso.classList.remove("bg-rosaa");
        barraProgresso.classList.add("bg-rosa");
    }
}

function atualizarGraficoPizza() {
    const tabela = document.getElementById("tabelaItens");
    const tbody = tabela.getElementsByTagName("tbody")[0];
    
    const totalItens = tbody.children.length;
    let cinzaCount = 0;
    let roxoCount = 0;
    let amareloCount = 0;

    for (let i = 0; i < totalItens; i++) {
        const estrelas = parseInt(tbody.children[i].children[3].innerText);

        if (estrelas === 3) {
            cinzaCount++;
        } else if (estrelas === 4) {
            roxoCount++;
        } else if (estrelas === 5) {
            amareloCount++;
        } 
    }

    atualizarDadosGraficoPizza(cinzaCount, roxoCount, amareloCount);
}

function atualizarDadosGraficoPizza(cinzaCount, roxoCount, amareloCount) {
    const ctx = document.getElementById("graficoPizza").getContext("2d");
    if (window.myChart) {
      
        window.myChart.data.datasets[0].data = [cinzaCount, roxoCount, amareloCount];
        window.myChart.update();
    } else {
       
        window.myChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Comum", "4 estrelas", "5 estrelas"],
                datasets: [{
                    data: [cinzaCount, roxoCount, amareloCount],
                    backgroundColor: ["#cbcacccb", "#9370DB", "#FFD700"]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            }
        });
    }
}

document.getElementById("btsalvar").addEventListener('click', adicionarItem);
document.getElementById("limpa").addEventListener('click', LimparItem);
document.getElementById("desfaz").addEventListener('click', DesfazItem);
