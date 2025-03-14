const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let personagem = {
  x:375,
  y:350,
  largura:50,
  altura:50

}

function desenharPersonagem(){
    ctx.fillStyle = 'black' //cor
    //pos x,u
    //largura e altura
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura,
    )
}
function atualizarPersonagem(){
    personagem.y -= 1
    
}
function loop() {
    ctx.clearRect(0,0, canvas.client.width, canvas.height)
    desenharPersonagem()
    atualizarPersonagem()
    requestAnimationFrame(loop)
    
}

loop()