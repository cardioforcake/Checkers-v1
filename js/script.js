let pieceTracker = []
let possibleMoves = []
let playerTurn = 1
let pieceSelected = '';
let forcedMove = false;
let followUp = false;

populateBoard()

$('.reset').click(reset)

function populateBoard(){
    function piece(s){
      this.color = '';
      this.serial = `${s}`;
      this.location = '';
      this.king = false;
    }
    for(let i=0; i<24;i++){
      let newPiece = new piece(i)
      if(i<12){
        newPiece.color = 'red'
      }else{
        newPiece.color = 'black'
      }
      pieceTracker.push(newPiece);
    }
    pieceTracker[0].location = '11'; pieceTracker[1].location = '13'; pieceTracker[2].location = '15';pieceTracker[3].location = '17';
    pieceTracker[4].location = '22'; pieceTracker[5].location = '24'; pieceTracker[6].location = '26';pieceTracker[7].location = '28';
    pieceTracker[8].location = '31'; pieceTracker[9].location = '33'; pieceTracker[10].location = '35';pieceTracker[11].location = '37';
    pieceTracker[12].location = '62'; pieceTracker[13].location = '64'; pieceTracker[14].location = '66';pieceTracker[15].location = '68';
    pieceTracker[16].location = '71'; pieceTracker[17].location = '73'; pieceTracker[18].location = '75';pieceTracker[19].location = '77';
    pieceTracker[20].location = '82'; pieceTracker[21].location = '84'; pieceTracker[22].location = '86';pieceTracker[23].location = '88';
    updateBoard()
}
  
function updateBoard(){
    $('img').remove()
    pieceTracker.forEach(pc=>{
        if(pc.location!==''){
        if(pc.color==='red' && pc.king===true){
            $(`#${pc.location}`).append(`<img src='https://i.imgur.com/VeoAlEC.png' class=${pc.serial} onclick='clicked(this)'>`)
        }else if(pc.color==='red'){
            $(`#${pc.location}`).append(`<img src='https://i.imgur.com/g9kfr4z.png' class=${pc.serial} onclick='clicked(this)'>`)
        }else if(pc.color==='black' && pc.king===true){
            $(`#${pc.location}`).append(`<img src='https://i.imgur.com/2KXC76y.png' class=${pc.serial} onclick='clicked(this)'>`)
        }else if(pc.color==='black'){
            $(`#${pc.location}`).append(`<img src='https://i.imgur.com/3Virlum.png' class=${pc.serial} onclick='clicked(this)'>`)
        }
    }
    if(playerTurn===1){
        $('h2').text("RED'S TURN")
        $('.turnSymbol').attr('id','red')
    }else if(playerTurn===-1){
        $('h2').text("BLACK'S TURN")
        $('.turnSymbol').attr('id','black')
    }
})
}

function reset(){
    pieceTracker = []
    possibleMoves = []
    playerTurn = 1
    pieceSelected = '';
    forcedMove = false;
    followUp = false;
    populateBoard()
}

function clicked(c){
    if(pieceSelected===''){
        pieceSelected = $(c).attr('class')
        forcedMove=checkHop1();
        if(forcedMove){
            checkHop2(c)
            followUp = true;
        }else{
            singleMove(c)
        }
        if(possibleMoves.length===0){
            pieceSelected = '';
        }
    }else if(pieceSelected===$(c).attr('class') && followUp===false){
        $('.destination').removeClass('destination');
        pieceSelected = '';
        possibleMoves = [];
    }
}

function checkWinner(){
    if(pieceTracker.length===1){
        if(pieceTracker[0].color==='red'){
            $('h2').text('RED WINS!')
        }else if(pieceTracker[0].color==='red'){
            $('h2').text('BLACK WINS!')    
        }
    }
}

$('.dark').click(function(){
    if($(this).hasClass('destination')){
        pieceTracker.forEach(pc=>{
            if(pc.serial===pieceSelected){
                possibleMoves.forEach(mv=>{
                    if(mv[0]===$(this).attr('id')){
                        pieceTracker = pieceTracker.filter(pc=>pc.location !== mv[1])
                    }
                })
                pc.location = $(this).attr('id')
                if($(this).attr('id')[0]==='8' && pc.color==='red'){
                    pc.king=true;
                }
                if($(this).attr('id')[0]==='1' && pc.color==='black'){
                    pc.king=true;
                }
            }
        })
        $(document.querySelectorAll('.destination')).removeClass('destination')
        possibleMoves = [];
        updateBoard()
        if(followUp){
            checkHop2(this.children[0]) 
        }
        if(possibleMoves.length===0){
            pieceSelected=''
            followUp=false;
            playerTurn = playerTurn*-1
            updateBoard()
        }
        checkWinner();
    }
})

function checkColor(loc){
    let clr = ''
    pieceTracker.forEach(pc=>{
        if(pc.location===loc){
            clr = pc.color;
            return clr;
        }
    })
    return clr;
}

function checkHop1(){
    let test = false;
    pieceTracker.forEach(pc =>{
        if(pc.king===true && playerTurn===1 && pc.color==='red'){
            if(checkColor(`${Number(pc.location[0])+2}${Number(pc.location[1])-2}`)==='' && checkColor(`${Number(pc.location[0])+1}${Number(pc.location[1])-1}`)==='black' && Number(pc.location[1])>2){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])+2}${Number(pc.location[1])+2}`)==='' && checkColor(`${Number(pc.location[0])+1}${Number(pc.location[1])+1}`)==='black' && Number(pc.location[1]<7)){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])-2}${Number(pc.location[1])-2}`)==='' && checkColor(`${Number(pc.location[0])-1}${Number(pc.location[1])-1}`)==='black' && Number(pc.location[1])>2){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])-2}${Number(pc.location[1])+2}`)==='' && checkColor(`${Number(pc.location[0])-1}${Number(pc.location[1])+1}`)==='black' && Number(pc.location[1]<7)){
                test=true;
            }
        }if(pc.king===true && playerTurn===-1 && pc.color==='black'){
            if(checkColor(`${Number(pc.location[0])+2}${Number(pc.location[1])-2}`)==='' && checkColor(`${Number(pc.location[0])+1}${Number(pc.location[1])-1}`)==='red' && Number(pc.location[1])>2){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])+2}${Number(pc.location[1])+2}`)==='' && checkColor(`${Number(pc.location[0])+1}${Number(pc.location[1])+1}`)==='red' && Number(pc.location[1])<7){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])-2}${Number(pc.location[1])-2}`)==='' && checkColor(`${Number(pc.location[0])-1}${Number(pc.location[1])-1}`)==='red' && Number(pc.location[1])>2){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])-2}${Number(pc.location[1])+2}`)==='' && checkColor(`${Number(pc.location[0])-1}${Number(pc.location[1])+1}`)==='red' && Number(pc.location[1])<7){
                test=true;
            }
        }else if(playerTurn===1 && pc.color==='red'){
            if(checkColor(`${Number(pc.location[0])+2}${Number(pc.location[1])-2}`)==='' && checkColor(`${Number(pc.location[0])+1}${Number(pc.location[1])-1}`)==='black' && Number(pc.location[1])>2){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])+2}${Number(pc.location[1])+2}`)==='' && checkColor(`${Number(pc.location[0])+1}${Number(pc.location[1])+1}`)==='black' && Number(pc.location[1])<7){
                test=true;
            }
        }else if(playerTurn===-1 && pc.color==='black'){
            if(checkColor(`${Number(pc.location[0])-2}${Number(pc.location[1])-2}`)==='' && checkColor(`${Number(pc.location[0])-1}${Number(pc.location[1])-1}`)==='red' && Number(pc.location[1])>2){
                test=true;
            }
            if(checkColor(`${Number(pc.location[0])-2}${Number(pc.location[1])+2}`)==='' && checkColor(`${Number(pc.location[0])-1}${Number(pc.location[1])+1}`)==='red' && Number(pc.location[1])<7){
                test=true;
            }
        }
    })
    return test;
}

function checkHop2(x){
    pieceTracker.forEach(pc =>{
        if(pc.king===true && playerTurn===1 && pc.color==='red' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)==='black' && Number($(x).parent().attr('id')[1])>2){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`,`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`])
                $(`#${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)==='black' && Number($(x).parent().attr('id')[1])<7){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`,`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`])
                $(`#${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)==='black' && Number($(x).parent().attr('id')[1])>2){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`,`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`])
                $(`#${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)==='black' && Number($(x).parent().attr('id')[1])<7){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`,`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`])
                $(`#${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`).addClass('destination')
            }
        }else if(pc.king===true && playerTurn===-1 && pc.color==='black' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)==='red' && Number($(x).parent().attr('id')[1])>2){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`,`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`])
                $(`#${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)==='red' && Number($(x).parent().attr('id')[1])<7){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`,`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`])
                $(`#${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)==='red' && Number($(x).parent().attr('id')[1])>2){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`,`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`])
                $(`#${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)==='red' && Number($(x).parent().attr('id')[1])<7){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`,`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`])
                $(`#${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`).addClass('destination')
            }
        }else if(playerTurn===1 && pc.color==='red' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)==='black' && Number($(x).parent().attr('id')[1])>2){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`,`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`])
                $(`#${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])-2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)==='black' && Number($(x).parent().attr('id')[1])<7){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`,`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`])
                $(`#${Number($(x).parent().attr('id')[0])+2}${Number($(x).parent().attr('id')[1])+2}`).addClass('destination')
            }
        }else if(playerTurn===-1 && pc.color==='black' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)==='red' && Number($(x).parent().attr('id')[1])>2){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`,`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`])
                $(`#${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])-2}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`)==='' && checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)==='red' && Number($(x).parent().attr('id')[1])<7){
                possibleMoves.push([`${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`,`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`])
                $(`#${Number($(x).parent().attr('id')[0])-2}${Number($(x).parent().attr('id')[1])+2}`).addClass('destination')
            }
        }
    })
}

function singleMove(x){
    pieceTracker.forEach(pc=>{
        if(pc.king===true && playerTurn===1 && pc.color==='red' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)==='' && Number($(x).parent().attr('id')[1])>1){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)
                $(`#${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)==='' && Number($(x).parent().attr('id')[1])<8){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)
                $(`#${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)==='' && Number($(x).parent().attr('id')[1])>1){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)
                $(`#${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)==='' && Number($(x).parent().attr('id')[1])<8){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)
                $(`#${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`).addClass('destination')
            }
        }else if(pc.king===true && playerTurn===-1 && pc.color==='black' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)==='' && Number($(x).parent().attr('id')[1])>1){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)
                $(`#${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)==='' && Number($(x).parent().attr('id')[1])<8){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)
                $(`#${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)==='' && Number($(x).parent().attr('id')[1])>1){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)
                $(`#${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)==='' && Number($(x).parent().attr('id')[1])<8){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)
                $(`#${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`).addClass('destination')
            }
        }else if(playerTurn===1 && pc.color==='red' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)==='' && Number($(x).parent().attr('id')[1])>1){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`)
                $(`#${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])-1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)==='' && Number($(x).parent().attr('id')[1])<8){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`)
                $(`#${Number($(x).parent().attr('id')[0])+1}${Number($(x).parent().attr('id')[1])+1}`).addClass('destination')
            }
        }else if(playerTurn===-1 && pc.color==='black' && pc.serial===pieceSelected){
            if(checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)==='' && Number($(x).parent().attr('id')[1])>1){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`)
                $(`#${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])-1}`).addClass('destination')
            }
            if(checkColor(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)==='' && Number($(x).parent().attr('id')[1])<8){
                possibleMoves.push(`${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`)
                $(`#${Number($(x).parent().attr('id')[0])-1}${Number($(x).parent().attr('id')[1])+1}`).addClass('destination')
            }
        }
    })

}