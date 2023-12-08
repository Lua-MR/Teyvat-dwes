const dataAlvo = new Date("2023-12-18T19:00:00"); // 18 de dezembro de 2023, às 19:00

const atualizarContador = () => {
    const agora = new Date();
    const diferenca = dataAlvo - agora;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("contador").innerHTML = `${dias} dias ${horas} horas ${minutos} minutos e ${segundos} segundos`;
};

setInterval(atualizarContador, 1000);

atualizarContador();
