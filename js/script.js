const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const telaGameOver = document.querySelector('.game-over')
const botaoStart = document.querySelector('.btn-start')
const botaoRestart = document.querySelector('.btn-restart')
const jumpSfx = new Audio('../audio/jump-sfx.wav')
const gameOverSfx = new Audio('../audio/game-over-sfx.wav')
const scoreSfx = new Audio('../audio/ten-point-sfx.wav')
const divScore = document.querySelector('.score')
let score = 0
let velPipeAnimation = 1.5


pipe.style.animation = 'none'
pipe.style.opacity = '0'
divScore.style.opacity = '0'



function start() {

    pipe.style.opacity = '1'
    pipe.style.animation = 'pipe-animation 1.5s infinite linear'
    botaoStart.style.opacity = '0'
    botaoStart.style.zIndex = '-1'
    divScore.style.opacity = '1'

    const jump = () => {
        mario.classList.add('jump')
        jumpSfx.play()

        setTimeout(() => {
            mario.classList.remove('jump')
        }, 500)
    }

    const velAnimation = setInterval(() => {
        if(velPipeAnimation >= 0.5) {
            velPipeAnimation -= 0.005
            pipe.style.animation = `pipe-animation ${velPipeAnimation}s infinite linear`
        }
    }, 1000)

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

        if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px`

            mario.style.animation = 'none'
            mario.style.bottom = `${marioPosition}px`
            mario.src = 'images/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'
            
            telaGameOver.style.opacity = '1'

            gameOverSfx.play()

            clearInterval(loop)
            clearInterval(velAnimation)
        } else {
            divScore.innerHTML = `${score.toFixed(0)}`
            score+= 0.5

            if((score % 100) == 0) {
                scoreSfx.play()
            }
        }
    }, 10)

    document.addEventListener('keydown', jump)
}

botaoRestart.addEventListener('click', () => {
    location.reload()
})
