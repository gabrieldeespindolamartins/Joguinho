const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

document.addEventListener("keypress", (e) => {
    if(e.code=='Space'){
        console.log("a")
        personagem.saltar()
    }
    if (Jogo.gameOver && e.code == 'Space') {
        reiniciarJogo()
    }
})

class Entidade {
    constructor(x, y, largura, altura, cor){
        this.x = x;
        this.y = y; 
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
    }
    desenhar (){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade {
    #velocidade_y
    
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_y = 0
        this.pulando = false
        
    }
    saltar(){
        this.#velocidade_y = 8
        this.pulando = true
        console.log("a")
        
    }
    atualizar(){
        if(this.pulando){
            this.y -= this.#velocidade_y
            this.#velocidade_y -= Jogo.gravidade
            if(this.y >= canvas.height - 50){
                this.#velocidade_y = 0
                this.y = canvas.height - 50
                this.pulando = false
            }
        }
    }
    verificarColisão() {
        if (
            obstaculo.x < this.x + this.largura &&
            obstaculo.x + obstaculo.largura > this.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y
        ) {
            obstaculo.velocidade_x = 0
            this.#velocidade_y = 0
            Jogo.gameOver = true
        }
    }
        }
    


class Obstaculo extends Entidade {
    #velocidade_x
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_x = 10
    }
    atualizar(){
        this.x -= this.#velocidade_x
        if (this.x <= this.largura) {
        this.x = canvas.width
        this.#velocidade_x += 0.15
        this.altura = Math.floor(Math.random() * 50) + 50
        this.y = 400 - this.altura
    }
    }
    desenhar (){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
    getVelocidadeX() { 
        return this.#velocidade_x;
    }
}

class Jogo{
    static gravidade = 0.5
    static gameOver = false
    constructor(){
        this.loop = this.loop.bind(this)
    }
    reiniciarJogo(){
        
    }
    loop (){
        if(Jogo.gameOver) {
            console.log("colidiu")
            ctx.fillStyle = 'black'
            ctx.font = '40px Arial'
            ctx.fillText('GAME OVER', 300, 100)
            ctx.fillText('Press Space to Restart', 200, 200)
            return};
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        personagem.desenhar()   
        obstaculo.desenhar()
        obstaculo.atualizar()
        personagem.atualizar()
        personagem.verificarColisão()
        requestAnimationFrame(this.loop)
    }
    
}


const personagem = new Personagem(100, canvas.height - 50, 50, 50, 'red')
const obstaculo = new Obstaculo(canvas.width - 50, canvas.height - 50, 50, 50, 'red')
const jogo = new Jogo()
jogo.loop()