function Sprite(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(
            img,
            this.x,
            this.y,
            this.largura,
            this.altura,
            xCanvas,
            yCanvas,
            this.largura,
            this.altura
        );
    }
}

const play = new Sprite(0, 160, 275, 275);

function Personagem(){
    
    this.bonecoParado = new Sprite(160, 0, 80, 80);
    this.bonecoDireito = new Sprite(0, 0, 80, 80);
    this.bonecoEsquerdo = new Sprite(80, 0, 80, 80);

    this.boneco = this.bonecoDireito;

    this.x = 50;
    this.y = 0;
    this.altura = this.bonecoDireito.altura;
    this.largura = this.bonecoDireito.largura;
    this.cor = "#610B0B";
    this.gravidade = 1.6;
    this.velocidade = 0;
    this.forcaDoPulo = 23.6;
    this.quantidadePulos = 0;
    this.score = 0;
    this.v = 0;

    this.atualiza = function() {
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
            this.y = chao.y - this.altura;
            this.quantidadePulos = 0;
            this.velocidade = 0;
        }
    }

    this.pula = function() {
        if (this.quantidadePulos < maximoPulos) {
            this.velocidade = -this.forcaDoPulo;
            this.quantidadePulos++;
        }
    }

    this.reset = function() {
        this.y = 0;
        this.velocidade = 0;
        this.score = 0;
    }

    this.desenha = function (){
        if (estadoAtual == estados.parado){
            this.boneco = this.bonecoParado;
        } else {
            if (frames % 10 == 0){
                this.v = this.v == 0 ? 1 : 0;
            }

            this.boneco = this.v == 0 ? this.bonecoDireito : this.bonecoEsquerdo;
        } 
        
        this.boneco.desenha(this.x, this.y);
    }
}

function Obstaculo(){
    this._obs = [];
    this._cores = function(){
        var hexadecimais = '0123456789ABCDEF';
        var cor = '#';
    
        for (var i = 0; i < 6; i++) {
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
        return cor;
    }

    this.tempoInsere = 100;
    this.insere = function () {
        this._obs.push({
            x: LARGURA,
            largura: 30 + Math.floor(80 * Math.random()),
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this._cores()//[Math.floor(5 * Math.random())],
        });
        this.tempoInsere = 80 + Math.floor(60 * Math.random());
    }

    this.atualiza = function () {
        if (this.tempoInsere == 0) {
            this.insere()
        } else {
            this.tempoInsere--;
        }

        for (var i = 0, tamanho = this._obs.length; i < tamanho; i++) {
            var obs = this._obs[i];

            obs.x -= velocidade;

            if ((bloco.x < obs.x + obs.largura) && (bloco.x + bloco.largura >= obs.x) && (bloco.y + bloco.altura >= chao.y - obs.altura)) {
                estadoAtual = estados.perdeu;
            } else if (obs.x <= -obs.largura) {
                bloco.score++;
                this._obs.splice(i, 1);
                tamanho--;
                i--;
            }
        }
    }

    this.limpa = function () {
        this._obs = [];
    }

    this.desenha = function () {
        for (var i = 0, tamanho = this._obs.length; i < tamanho; i++) {
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
        }
    }
}

function Ranking(){

    this.recorde = 0;
    this.scores = [
        {email: "paolasbasso@gmail.com", score: 100},
        {email: "marcosfaneli@gmail.com", score: 98},
        {email: "eduardofaneli2@gmail.com", score: 77},
        {email: "nidalee@gmail.com", score: 3},
        {email: "hannah@gmail.com", score: 1},
    ]
    
    this.carrega = function () {
        this.recorde = localStorage.getItem("recorde");
        if (!this.recorde) {
            this.recorde = 0;
        }
        console.log(this.recorde);
    }

    this.atualiza = function(personagem) {
        if (personagem.score > this.recorde) {
            localStorage.setItem("recorde", personagem.score);
        }
    }

    this.desenha = function(){
        ctx.fillStyle = "#A020F0";
        ctx.fillRect(LARGURA - 320, 20, 300, 180);

        ctx.fillStyle = "#FDF5E6";
        ctx.fillRect(LARGURA - 314, 62, 288, 130);
        
        ctx.fillStyle = "#000";
        ctx.font = "bold 32px Arial";
        ctx.fillText("Ranking", LARGURA - 308, 52);

        ctx.fillStyle = "#DEDBDA";
        ctx.font = "bold 32px Arial";
        ctx.fillText("Ranking", LARGURA - 310, 50);

        ctx.fillStyle = "#000";
        ctx.font = "14px consolas";
        let posicao = 1;
        this.scores.forEach(score => {
            ctx.fillText(`${posicao} ${score.email.padEnd(28," ")} ${score.score.toString().padStart(5," ")}`, LARGURA - 310, (posicao * 22) + 64);
            posicao++;
        });
    }
}

function Chao(){
    this.y = ALTURA - 50;
    this.altura = 50;
    this.cor = "#FE9A2E";
    this.desenha = function () {
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, LARGURA, this.altura);
    }
}

let canvas;
let ctx;
let img;
const velocidade = 6;

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

    img = new Image();
    img.src = "./img/jogo.png";

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