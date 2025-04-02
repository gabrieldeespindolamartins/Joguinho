const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')

class Entidade {
    constructor(x, y, largura, cor){
        this.x = x;
        this.y =y; 
        this.largura = largura;
        this.altura = this.altura;
        this.cor = cor
    }
    desenhar (){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x,this.y,this.largura,this.altura)
    }
}

class Jogo{
    constructor(){
        this.loop = this.loop.bind(this)
    }
    loop (coisa_na_tela){
        coisa_na_tela.desenhar()
        requestAnimationFrame(this.loop())
    }
}

const coisa_na_tela = new Entidade(100,100,50,50,'red')
const jogo = new Jogo()
jogo.loop(coisa_na_tela)