let canvas;
let ctx;
let imgPlay;
const velocidade = 6;
let play;

let frames = 0;

const estados = {
    parado: 0,
    jogando: 1,
    perdeu: 2,
};


let estadoAtual = estados.parado;

const ALTURA = window.innerHeight - 10;
const LARGURA = window.innerWidth - 10;

const maximoPulos = 3;

const chao = new Chao();

const bloco = new Personagem();

const obstaculo = new Obstaculo();

const ranking = new Ranking();

function main() {

    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000"

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", clique);
    document.addEventListener("keydown", keyboard);

    estadoAtual = estados.parado;

    ranking.carrega();
    imgPlay = openImage("./img/jogo.png");

    roda();
}

function iniciarJogo() {
    estadoAtual = estados.jogando;
    ranking.carrega();
} 

function clique(event) {
    if (estadoAtual == estados.parado) {
        iniciarJogo();
    } else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
        estadoAtual = estados.jogando;
        obstaculo.limpa();
        bloco.reset();
    }
}

function keyboard(event) {
    if (event.keyCode != 32){
        return;
    }
    
    if (estadoAtual == estados.jogando) {
        bloco.pula();
    } 
}

function roda() {
    atualiza();
    desenha();

    window.requestAnimationFrame(roda);
}

function atualiza() {
    frames++;
    bloco.atualiza();

    if (estadoAtual == estados.jogando) {
        obstaculo.atualiza();
    }    
}

function exibirFimDeJogo() {
    const x = LARGURA / 2 - 140;
    const y = ALTURA / 2 - 140;

    ctx.fillStyle = "#DC143C";
    ctx.fillRect(x + 8, y + 8, 354, 340);
    ctx.fillStyle = "#B22222";
    ctx.fillRect(x, y, 354, 340);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 72px consolas";
    ctx.fillText("GAME", x + 36, y + 84);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 72px consolas";
    ctx.fillText("OVER", x + 104, y + 140);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 140px consolas";
    // let t = bloco.score.toString().length;
    ctx.fillText(bloco.score, x + 140, y + 260);

    if (bloco.score > ranking.recorde) {
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 36px consolas";
        ctx.fillText("Novo Recorde!!", x + 46, y + 320);
    }

    ranking.atualiza(bloco);
}

function exibirTelaInicial() {
    const x = LARGURA / 2 - 140;
    const y = ALTURA / 2 - 140;

    ctx.fillStyle = "#4B0082";
    ctx.fillRect(x + 8, y + 8, 354, 340);
    ctx.fillStyle = "#8A2BE2";
    ctx.fillRect(x, y, 354, 340);
    
    ctx.fillStyle = "#000";
    ctx.font = "bold 32px consolas";
    ctx.fillText("Clique para começar", x + 12, y + 36);
    
    ctx.fillStyle = "#fff";
    ctx.font = "bold 32px consolas";
    ctx.fillText("Clique para começar", x + 10, y + 34);
    
    play = new Sprite(imgPlay, 0, 160, 275, 275);    

    play.desenha(x + 38, y + 42);
}

function desenha() {
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0, 0, LARGURA, ALTURA);

    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";
    ctx.fillText(bloco.score, 30, 68);


    if (estadoAtual == estados.parado) {
        exibirTelaInicial();
    } else if (estadoAtual == estados.perdeu) {
        exibirFimDeJogo();
    } else if (estadoAtual == estados.jogando) {
        obstaculo.desenha();
    }

    chao.desenha();
    bloco.desenha();
    ranking.desenha();
}