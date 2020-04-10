let canvas;
let ctx;

let frames = 0;
const velocidade = 6;
let recorde;

const estados = {
    parado: 0,
    jogando: 1,
    perdeu: 2,
};


let estadoAtual = estados.parado;

const ALTURA = window.innerHeight - 10;
const LARGURA = window.innerWidth - 10;

const maximoPulos = 3;

const chao = {
    y: ALTURA - 50,
    altura: 50,
    cor: "#FE9A2E",
    desenha: function () {
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, LARGURA, this.altura);
    }
};

const bloco = {
    x: 50,
    y: 0,
    altura: 50,
    largura: 50,
    cor: "#610B0B",
    gravidade: 1.6,
    velocidade: 0,
    forcaDoPulo: 23.6,
    quantidadePulos: 0,
    score: 0,
    atualiza: function () {
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
            this.y = chao.y - this.altura;
            this.quantidadePulos = 0;
            this.velocidade = 0;
        }
    },
    pula: function () {
        if (this.quantidadePulos < maximoPulos) {
            this.velocidade = -this.forcaDoPulo;
            this.quantidadePulos++;
        }
    },
    reset: function () {
        this.y = 0;
        this.velocidade = 0;
        this.score = 0;
    },
    desenha: function () {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
};

const obstaculo = {
    _obs: [],
    _cores: ["#084B8A", "#0101DF", "#2A0A29", "#4B088A", "#0A0A2A"],
    tempoInsere: 100,
    insere: function () {
        this._obs.push({
            x: LARGURA,
            largura: 30 + Math.floor(80 * Math.random()),
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this._cores[Math.floor(5 * Math.random())],
        });
        this.tempoInsere = 80 + Math.floor(60 * Math.random());
    },
    atualiza: function () {
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
    },
    limpa: function () {
        this._obs = [];
    },
    desenha: function () {
        for (var i = 0, tamanho = this._obs.length; i < tamanho; i++) {
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
        }
    }
};

function main() {

    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000"

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", clique);

    estadoAtual = estados.parado;

    carregarRanking();

    roda();
}

function carregarRanking() {
    recorde = localStorage.getItem("recorde");
    if (!recorde) {
        recorde = 0;
    }

    console.log(recorde);
}

function atualizaRanking() {
    if (bloco.score > recorde) {
        localStorage.setItem("recorde", bloco.score);
    }
}

function iniciarJogo() {
    estadoAtual = estados.jogando;
    carregarRanking();
}

function clique(event) {
    if (estadoAtual == estados.jogando) {
        bloco.pula();
    } else if (estadoAtual == estados.parado) {
        iniciarJogo();
    } else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
        estadoAtual = estados.jogando;
        obstaculo.limpa();
        bloco.reset();
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

    ctx.fillStyle = "red";
    ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);

    ctx.save();
    ctx.translate(LARGURA / 2, ALTURA / 2);
    ctx.fillStyle = "#fff";
    let t = bloco.score.toString().length;
    ctx.fillText(bloco.score, t * -13, 19);

    if (bloco.score > recorde) {
        ctx.fillText("Novo Recorde!!", -154, -65);
    }

    atualizaRanking();

    ctx.restore();
}

function exibirTelaInicial() {
    ctx.fillStyle = "green";
    ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
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
}