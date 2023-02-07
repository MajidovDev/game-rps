window.addEventListener('DOMContentLoaded', ()=>{
    const choices = document.querySelectorAll('.choice'),
    score = document.querySelector('.score'),
    restart = document.querySelector('#restart'),
    result = document.querySelector('.result'),
    modal = document.querySelector('.modal-body'),
    totalRound = document.querySelector('.btn-footer'),
    newRound = document.querySelector('.new-round')
    scoreBoard = {
        player: 0,
        computer: 0,
        draw: 0,
    };
    setTimeout ( () => {
        const loader = document.querySelector('.loader')

        setTimeout(()=>{
            loader.style.opacity = '0'
            setTimeout(()=>{
                loader.style.display = 'none'
            }, 400)
        }, 2500)
    })
//play game
function play(event){
    newRound.classList.remove('d-none')
    restart.classList.remove('d-none')
    const playerChoice =  event.target.id
    const compChoice = computerChoice()
    const winner = getWinner(playerChoice, compChoice)
    showWinner(winner, compChoice)
}

//computer choice
function computerChoice(){
    const rand = Math.random()
    if (rand < 0.34){
        return 'grab'
    }else if(rand <= 0.77){
        return 'stop'
    }else{
        return 'scissors'
    }
}
//paper = stop
//rock = grab

//get winner
function getWinner(p, c){
    if(p === c){
        return 'draw'
    }else if(p === 'grab'){
        if(c === 'stop'){
            return 'computer'
        }else{
            return 'player'
        }
    }else if(p === 'stop'){
        if(c === 'scissors'){
            return 'computer'
        }else{
            return 'player'
        }
    }else if(p === 'scissors'){
        if(c === 'grab'){
            return 'computer'
        }else{
            return 'player'
        }
    }  
}

//show winner
function showWinner(winner, compChoice){
    if(winner === 'player'){
        scoreBoard.player ++
        result.innerHTML = `
        <h1 class="bg-success rounded-2 result-text">You Win</h1>
        <p>Computer Chose <strong><i id="${compChoice}" class="fa fa-hand-${compChoice}-o fa-5x></i></strong></p>

        <i id="paper" class="choice fa fa-hand-stop-o fa-5x"></i>
        `
    }else if(winner === 'computer'){
        scoreBoard.computer ++
        result.innerHTML = `
        <h1 class="bg-danger rounded-2 result-text">You Lose</h1>
        <p>Computer Chose <strong><i id="${compChoice}" class="fa fa-hand-${compChoice}-o fa-5x></i></strong></p>

        <i id="paper" class="choice fa fa-hand-stop-o fa-5x"></i>
        `
    }else{
        scoreBoard.draw ++
        result.innerHTML = `
        <h1 class="bg-secondary rounded-2 result-text">It's a draw</h1>
        <p>Computer Chose <strong><i id="${compChoice}" class="fa fa-hand-${compChoice}-o fa-5x></i></strong></p>

        <i id="paper" class="choice fa fa-hand-stop-o fa-5x"></i>
        `
    }
    score.innerHTML=`
    <div class="score row row-score">
        <div class="col">
            <p>Player : <span>${scoreBoard.player}</span></p>
        </div>
        <div class="col">
            <p>Draw : <span>${scoreBoard.draw}</span></p>
        </div>
        <div class="col">
            <p>Computer : <span>${scoreBoard.computer}</span></p>
        </div>
    </div>
            `        
    //total score
    modal.innerHTML = `
    <div class="overall-score-body">
        <p>Victory : <span>${scoreBoard.player}</span></p>
        <p>Defeat : <span>${scoreBoard.computer}</span></p>
        <p>Draw : <span>${scoreBoard.draw}</span></p>
    </div>  
    `
    total = scoreBoard.computer + scoreBoard.player + scoreBoard.draw
    //total round
    totalRound.innerHTML = `
    <h5>Total rounds: ${total}</h5>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue</button>
    `

}


//restart game
function restartGame(){
    scoreBoard.player = 0
    scoreBoard.computer = 0
    scoreBoard.draw = 0
    score.innerHTML=`
    <div class="score row row-score">
        <div class="col-lg-4 col-md-12">
            <p>Player : <span>${scoreBoard.player}</span></p>
        </div>
        <div class="col-lg-4 col-md-12">
            <p>Draw : <span>${scoreBoard.draw}</span></p>
        </div>
        <div class="col-lg-4 col-md-12">
            <p>Computer : <span>${scoreBoard.computer}</span></p>
        </div>
    </div>
    `
    modal.innerHTML = `
    <div class="overall-score1-body">
        <p>Victory: <span>${scoreBoard.player}</span></p>
        <p>Defeat: <span>${scoreBoard.computer}</span></p>
        <p>Draw: <span>${scoreBoard.draw}</span></p>
    </div>  
    `
    result.innerHTML = `
        <h1 class="bg-primary result-text rounded-2">Choose your choice</h1>
        <p>Computer's action will appear here!</p>
        `

    restart.classList.add('d-none')
    newRound.classList.add('d-none')
}

//event listeners
choices.forEach(choice => {
    return choice.addEventListener('click', play)
})
restart.addEventListener('click', restartGame)

})