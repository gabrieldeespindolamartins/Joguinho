const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let gravidade = 0.5
let chao = 350
let velocidade_x = 10
let gameOver = false
let pontos = 0  // Pontuação do jogador
let melhorPontos = localStorage.getItem('melhorPontos') || 0  // Melhor pontuação salva no localStorage

// Função para atualizar a melhor pontuação
function salvarMelhorPontos() {
    if (pontos > melhorPontos) {
        melhorPontos = pontos
        localStorage.setItem('melhorPontos', melhorPontos)  // Salva a melhor pontuação
    }
}

document.addEventListener('keypress', (evento) => {
    if (evento.code == 'Space' && !gameOver) {
        if (personagem.pulando && personagem.contadorPulos < 2) {
            personagem.velocidade_y = 10
            personagem.contadorPulos += 1
        } else if (!personagem.pulando) {
            personagem.velocidade_y = 10
            personagem.pulando = true
            personagem.contadorPulos += 1
        }
    }

    if (gameOver && evento.code == 'Space') {
        reiniciarJogo()
    }
})

let obstaculo = {
    x: 1100,
    y: chao - 50,
    largura: 20,
    altura: Math.floor(Math.random() * 50) + 50
}

let personagem = {
    x: 100,
    y: chao,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    pulando: false,
    contadorPulos: 0
}

function desenharPersonagem() {
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function desenharObstaculo() {
    ctx.fillStyle = 'black'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y
        personagem.velocidade_y -= gravidade
    }

    if (personagem.y >= chao) {
        personagem.y = chao
        personagem.velocidade_y = 0
        personagem.pulando = false
        personagem.contadorPulos = 0
    }
}

function atualizarObstaculo() {
    obstaculo.x -= velocidade_x
    if (obstaculo.x + obstaculo.largura < 0) {
        obstaculo.x = canvas.width
        obstaculo.altura = Math.floor(Math.random() * 50) + 50
        obstaculo.y = 400 - obstaculo.altura
    }
}

function verificarColisao() {
    if (
        obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.x + obstaculo.largura > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        velocidade_x = 0
        personagem.velocidade_y = 0
        salvarMelhorPontos()  // Salva a melhor pontuação ao colidir
        console.log("colidiu")
        ctx.fillStyle = 'black'
        ctx.font = '40px Arial'
        ctx.fillText('GAME OVER', 300, 100)
        ctx.fillText('Press Space to Restart', 200, 200)
        ctx.fillText('Melhor Pontuação: ' + melhorPontos, 200, 250)
        gameOver = true
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenharPersonagem()
    atualizarPersonagem()
    desenharObstaculo()
    atualizarObstaculo()
    verificarColisao()

    // Atualiza a pontuação enquanto o jogo não acabar
    if (!gameOver) {
        pontos += 1  // Incrementa a pontuação ao longo do tempo
        ctx.fillStyle = 'black'
        ctx.font = '20px Arial'
        ctx.fillText('Pontuação: ' + pontos, 20, 30)  // Exibe a pontuação atual
        ctx.fillText('Melhor Pontuação: ' + melhorPontos, 20, 50)  // Exibe a melhor pontuação
        requestAnimationFrame(loop)
    }
}

function reiniciarJogo() {
    gameOver = false
    velocidade_x = 10
    pontos = 0  // Reseta a pontuação
    personagem.y = chao
    personagem.velocidade_y = 0
    personagem.pulando = false
    personagem.contadorPulos = 0
    obstaculo.x = canvas.width
    obstaculo.altura = Math.floor(Math.random() * 50) + 50
    obstaculo.y = 400 - obstaculo.altura
    loop()
}

loop()
