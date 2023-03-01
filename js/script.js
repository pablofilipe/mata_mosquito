var largura = 0
var altura = 0
var vidas = 1
var tempo = 10
var criarMosquitoTempo = 1500
var nivel = window.location.search.replace('?', '')

if ( nivel === 'normal' ) {
    criarMosquitoTempo = criarMosquitoTempo
} else if( nivel === 'dificil' ) {
    criarMosquitoTempo = 1000
} else if( nivel === 'chucknorris' ) {
    criarMosquitoTempo = 750
}

function ajustarTamanhoPalco() {
    largura = window.innerWidth
    altura = window.innerHeight
}

document.getElementById('cronometro').innerHTML = tempo

var cronometro = setInterval(function() {
    tempo -= 1
    
    if ( tempo < 0 ) {
        clearInterval( cronometro )
        clearInterval( criarMosquito )
        window.location.href = './vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

function posicaoAleatoria() {
    // Remover o elemento caso exista.
    var mosquitoSelected = document.getElementById('mosquito')
    if ( mosquitoSelected ) {
        mosquitoSelected.remove()

        console.log( vidas )

        if ( vidas > 3) {
            window.location.href = './fim_de_jogo.html'
        } else {
            document.getElementById('v'+vidas).src = './img/coracao_vazio.png'
            vidas++
        }
    }

    var posicaoX = Math.floor( Math.random() * largura ) - 90
    var posicaoY = Math.floor( Math.random() * altura ) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // console.log( posicaoX, posicaoY )

    // Criar elemento HTML.
    var elementoMosquito = document.createElement('img')
    elementoMosquito.src = './img/mosquito.png'
    elementoMosquito.className = `${tamanhoAleatorio()} ${orientacaoAleatorio()}`
    elementoMosquito.style.position = 'absolute'
    elementoMosquito.style.left = posicaoX + 'px'
    elementoMosquito.style.top = posicaoY + 'px'
    elementoMosquito.style.right = posicaoX + 'px'
    elementoMosquito.style.bottom = posicaoY + 'px'
    elementoMosquito.id = 'mosquito'
    elementoMosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild( elementoMosquito )
}

function tamanhoAleatorio() {
    var classe = Math.floor( Math.random() * 3 )
    
    switch( classe) {
        case 0:
            return 'mosquito-default'
        case 1:
            return 'mosquito-md'
        case 2:
            return 'mosquito-lg'
    }
}

function orientacaoAleatorio() {
    var classe = Math.floor( Math.random() * 2 )
    
    switch( classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

var criarMosquito = setInterval(function() {
    posicaoAleatoria()
}, criarMosquitoTempo)

ajustarTamanhoPalco()