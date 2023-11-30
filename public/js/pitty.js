

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, set, get, remove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

    const quantidade = tbody.children.length + 1;
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const estrelas = parseInt(document.getElementById("estrelas").value);
    const data = document.getElementById("data").value;

    // Verifica se os campos estrelas e tipo não estão vazios
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

    // Gera uma nova referência usando push
    const newItemRef = push(ref(db, 'desejo'));

    // Extrai o ID da referência gerada
    const itemId = newItemRef.key;

    const newRow = tbody.insertRow();
    newRow.setAttribute("data-id", itemId); // Define o atributo data-id com o ID gerado

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

    contadorId++;
    incrementarPitty();
    atualizarGraficos();
    atualizarGraficoPizza();

    const desejo = {
        id: contadorId, 
        nome: nome,
        tipo: tipo,
        estrelas: estrelas,
        data: data || ""
    };

    // Envia os dados para o Firebase
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
    // Adiciona uma confirmação
    var confirmacao = confirm("Você tem certeza que deseja apagar todos os dados da tabela e do pitty?\n Essa ação não poderá ser desfeita!");
    
    // Se o usuário confirmar, prossiga com a limpeza
    if (confirmacao) {
        // Armazenar os dados antes da limpeza
        dadosAntigos.tabela = clonarTabela();
        dadosAntigos.pitty = document.getElementById("pittyCount").innerText;

        // Limpar os campos de entrada
        document.getElementById("nome").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("estrelas").value = "";
        document.getElementById("data").value = "";

        // Limpar os dados da tabela
        var tabela = document.getElementById("tabelaItens");
        var tbody = tabela.getElementsByTagName("tbody")[0];
        tbody.innerHTML = ""; // Limpar todas as linhas da tabela

        // Limpar o contador de pitty
        document.getElementById("pittyCount").innerText = "0";
        pitty = 0;
        atualizarGraficos();

        // Limpar os dados no Firebase
        contadorId = 0;
        limparDadosFirebase();
    }
}

function limparDadosFirebase() {3
    const itensRef = ref(db, 'desejo');

    // Obter uma referência para os dados em 'desejo'
    const desejoRef = ref(itensRef, '/');

    // Remover todos os dados do nó 'desejo'
    set(desejoRef, null)
        .then(() => {
            console.log("Dados do Firebase removidos com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao remover dados do Firebase:", error);
        });
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

        desfazerNoFirebase();
        contadorId--;

       
        tbody.deleteRow(rowCount - 1);
        decrementarPitty();
        atualizarGraficos();
        atualizarGraficoPizza();
    }

    // Limpar o contador de pitty
    document.getElementById("pittyCount").innerText = "0";
    
   
}

function desfazerNoFirebase() {
    remove(ref(db, "desejo/"+id.value),{
       data:varTitulo.value,
        nome: varArtista.value,
        tipo:varTitulo.value,
        estrelas: varArtista.value

   }).then(()=>{
        console.log("excluído com sucesso");
   })
   .catch((error)=>{
        console.log("erro de exclusão");
   })
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

    // Garante que o percentual não ultrapasse 100%
    percentual = Math.min(100, percentual);

    barraProgresso.style.width = percentual + "%";
    barraProgresso.innerText = Math.round(percentual) + "%";

    // Muda a cor para azul quando o Pity atinge 70
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
        // Se o gráfico já existe, atualize os dados
        window.myChart.data.datasets[0].data = [cinzaCount, roxoCount, amareloCount];
        window.myChart.update();
    } else {
        // Se o gráfico ainda não existe, crie-o
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

// Adiciona os ouvintes de eventos após a definição das funções
document.getElementById("btsalvar").addEventListener('click', adicionarItem);
document.getElementById("limpa").addEventListener('click', LimparItem);
document.getElementById("desfaz").addEventListener('click', DesfazItem);
