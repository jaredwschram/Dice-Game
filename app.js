var scores, roundScore, activePlayer, dice1, dice2, gamePlaying, lastDice1, lastDice2, targetScore, alertMsg;
init();
//Making the roll dice button work
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //Generate a random number
        var dice1 = Math.floor(Math.random() * 6) + 1
        var dice2 = Math.floor(Math.random() * 6) + 1
        console.log(dice1);
        console.log(lastDice1);
        console.log('---Separate-Dice----')
        console.log(dice2);
        console.log(lastDice2);
        console.log('---End---');
        if(targetScore !== undefined){
            if(dice1 !== 1 && dice2 !== 1){
                if((lastDice1 === 6 && dice1 === 6) ){
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                    nextPlayer();
                }else{
                    //Display dice result and add values to current round score
                    var diceDOM1 = document.querySelector('.dice1')
                    var diceDOM2 = document.querySelector('.dice2')
                    diceDOM1.style.display = 'block';
                    diceDOM2.style.display = 'block';
                    diceDOM1.src = 'dice-' + dice1 + '.png';
                    diceDOM2.src = 'dice-' + dice2 + '.png';
                    roundScore += (dice1 + dice2) ;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
                lastDice1 = dice1;
                lastDice2 = dice2;
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
    lastDice1 = null;
    lastDice2 = null;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}
//Reset or New game - clears everything and restarts game.
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    lastDice1 = null;
    lastDice2 = null;
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