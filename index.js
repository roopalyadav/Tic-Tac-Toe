var playerTurn = document.getElementById("playerTurn");
var message = document.getElementById("message");
var currentPlayer='X';
var currentPlayerName='Player1'
var gameActive=true;
var reset = document.getElementById("reset");
currentPlayerTurn = ()=> `It ${currentPlayerName}'s turn`;

const winMessage = ()=> `Congratulations! ${currentPlayerName} wins`;
const drawMessage = () => `Draw!`;
var state = ['', '', '', '', '', '', '', '', ''];
playerTurn.innerHTML=currentPlayerTurn();
document.querySelectorAll('.cell').forEach((cell)=>{
    cell.addEventListener('click', handleClickedCell);

})
var winningConditions=[[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]]
function checkCell(div, cellindex)
{
    if(state[cellindex]=='' && gameActive)
    {
        div.innerHTML=`${currentPlayer}`;
        state[cellindex]=currentPlayer;
    }
    let roundWon=false;
    for(let i=0;i<winningConditions.length;i++)
    {
        
        let wc=winningConditions[i];
        
        let a=state[wc[0]];
        let b=state[wc[1]];
        let c=state[wc[2]];
        console.log(state[wc[0]]);
        if(a==="" || b==="" || c==="")
        continue;
        if(a===b && b===c)
        {
            
            roundWon=true;
            break;;
        }
    }
    if(roundWon)
    {
        message.innerHTML=winMessage();
        gameActive=false;
        return;
    }
    if(!state.includes(''))
    {
        message.innerHTML=drawMessage();
        gameActive=false;
        return;
    }
    currentPlayerName=currentPlayer=='X'?'Player2':'Player1';
    currentPlayer=currentPlayer=='X'?'O':'X';
    
    
    playerTurn.innerHTML=currentPlayerTurn();
}
function handleClickedCell(event)
{
    let div= event.target;
    let cellindex = parseInt(div.getAttribute('div-cell-index'))
    
    if(state[cellindex]!='' || !gameActive)
    {
        return;
    }
    checkCell(div, cellindex);
}

reset.addEventListener('click',handleReset);

function handleReset()
{
    document.querySelectorAll('.cell').forEach((cell)=>{
        cell.innerHTML="";
        currentPlayer='X';
        currentPlayerName='Player1'
        gameActive=true;
        state = ['', '', '', '', '', '', '', '', ''];
        playerTurn.innerHTML=currentPlayerTurn();
        message.innerHTML="";
    })
}