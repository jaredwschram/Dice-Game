var scores, roundScore, activePlayer, dice, gamePlaying, lastDice, targetScore, alertMsg;
init();
//Making the roll dice button work
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //Generate a random number
        var dice = Math.floor(Math.random() * 6) + 1
        console.log(dice);
        console.log(lastDice);
        console.log('------');
        if(targetScore !== undefined){
            if(dice !== 1){
                if(lastDice === 6 && dice === 6){
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                    nextPlayer();
                }else{
                    //Display dice result and add values to current round score
                    var diceDOM = document.querySelector('.dice1')
                    diceDOM.style.display = 'block';
                    diceDOM.src = 'dice-' + dice + '.png';
                    roundScore += dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
                lastDice = dice;

            }else{
                nextPlayer();
            }
        }else{
            document.getElementById('alert').textContent = "Please enter a Target Score Above!";
            document.getElementById('alert').style.display = 'block';
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add value of current score to current player global score
        scores[activePlayer] += roundScore;
        //Update UI with new current player global score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if player won game
        if(scores[activePlayer] >= targetScore)    {
        document.querySelector('.dice1').classList.toggle('active');
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        gamePlaying = false;
        }else{
        nextPlayer();
        }
    }
    
});

//Calling next player if current player rolls a 1 
function nextPlayer(){
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastDice = null;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
}
//Reset or New game - clears everything and restarts game.
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.getElementById('alert').style.display = 'none';
    document.getElementById('targetScore').value = ""
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

document.getElementById("targetScoreBtn").addEventListener('click',function(){
    targetScore = document.getElementById("targetScore").value
});
document.querySelector('.btn-new').addEventListener('click', init);