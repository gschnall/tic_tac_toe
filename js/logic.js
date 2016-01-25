function playGame(){
//----Global Variables!----
//User Selected Variable
var rows = rows || parseInt(document.selectGrid.gridSize.value);
createBoard(rows)
//Lets Us Know if there is currently a winner
var winner = false

function createBoard(rows){
  var container = document.querySelector('.theContainer')
  container.innerHTML = "";
  var rows = parseInt(rows)
  var rowsPlus = parseInt(rows) + 1
  for(i=1; i< rowsPlus; i++){
    var newDiv = document.createElement('DIV');
    newDiv.className = 'row row-' + String(i);
    container.appendChild(newDiv)
    for(j=0; j<rows; j++){
      var newSpan = document.createElement('SPAN')
      newSpan.className = 'square'
      newDiv.appendChild(newSpan)
    }
  }
}

document.body.querySelector('input').addEventListener('click',function(){
  var rows = document.selectGrid.gridSize.value
  createBoard(rows)
  resetGame()
  playGame()
})

function getBoardArr(){
  sArr = []
  for(i=0; i<spans.length; i++){
    sArr.push(spans[i].innerText)
  }
  return sArr
}

function findWinnerRow(arr){
  var sliceX = 0;
  for(i=0; i<arr.length; i+=rows){
    sliceX += 1
    var newArray = arr.slice(i, rows * sliceX)
    var result = newArray.reduce(function(a,b){
      return(a == b) ? a : NaN
    })
    if(result){return true}
  }
}
function findWinnerColumn(arr){
  var adder = 0
  if(rows == 4){adder = 1}
  else if(rows == 5){adder = 8}
  else if(rows == 6){adder = 16}
  else if(rows == 7){adder = 24}
  else if(rows == 8){adder = 33}
  for(j=0; j<rows; j+=1){
    var newArray = []
    for(i=j; i<(rows*2+j+(rows+adder)); i+=rows){
      if(i == j){newArray.push(arr[i])}
      else{ newArray.push(arr[i])}
    }
    var results = newArray.reduce(function(a,b){
      return (a === b) ? a : NaN
    })
    if(results){return true}
  }
}
function findWinnerDiagonal(arr){
  //Diag-1
  d1Array = []
  d1Array.push(arr[0])
  for(i=0; i<rows; i+=1){
    if(i == 0){d1Array.push(arr[i])}
    else{
      d1Array.push(arr[i * (rows+1)])
    }
  }
  var results = d1Array.reduce(function(a,b){
    return (a === b) ? a : NaN
  })
  if(results){return true}
  //Diag-2
  d2Array = []
  d2Array.push(arr[rows-1])
  for(i=2; i<rows+1; i+=1){
    d2Array.push(arr[i * (rows-1)])
  }
  var results_2 = d2Array.reduce(function(a,b){
    return (a === b) ? a : NaN
  })
  if(results_2){return true}
}

function findWinner(){
  var boardArr = getBoardArr()
  if(findWinnerColumn(boardArr) || findWinnerRow(boardArr) || findWinnerDiagonal(boardArr)){
    return symbol.mark
  }
  else{return false}
}

// Attributes for X and O
function gamePiece(mark,color){
  this.mark = mark;
  this.color = color;
}

var xs = new gamePiece("X", "rgb(33,163,191)")
var os = new gamePiece("O", "rgb(240,115,123)")
var symbol = xs

// Switches between X and O Turn
function alternateSymbol(){
  if(symbol == xs){ symbol = os}
  else{ symbol = xs }
}

// Array of Game Squares
var spans = document.body.querySelectorAll('span');

// On Click Action of Each Game Square
function squareClick(){
  for(i = 0; i < spans.length; i++){
    spans[i].addEventListener('click',function(){
      if (this.innerText == "X" || this.innerText == "O" || winner == true){return;}
      this.innerText = symbol.mark
      this.style.background = symbol.color
      if(findWinner()){
        winner = true
        document.getElementById('winnerBox').innerText = "|--| "+ symbol.mark + " Wins! |--|"
      }
      alternateSymbol();
    })
  }
}
squareClick()

// Reset Game Button
function resetGame(){
  for(i=0; i<spans.length; i++){
    spans[i].innerText = ""
    spans[i].style.background = 'white'
  }
  symbol = xs
  document.getElementById('winnerBox').innerText = ""
  winner = false
}
document.body.querySelector('button').addEventListener('click', resetGame)
}
playGame()
