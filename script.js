const mark = '<i class="fa-solid fa-xmark fa-lg" style="color: #0eb4fb;"></i>';
const circle = '<i class="fa-regular fa-circle" style="color: #ff2424;"></i>';
const original = $(".card").clone(true);
let player1Score = 0
let player2Score = 0
$(function () {
  restart()
  $(".start").click(() => {
    restart()
  })
});


function restart() {
  $(".player1").css({
    "background-color": "#0eb4fb",
  });
  $(".player2").css({
    "background-color": "lightgray",
  });
  $(".game-container").html(original.clone(true)); 
  startGame()
}

function startGame() {
  const cards = $(".card");
  let playerStep = false;
  let drawCounter = 0
  $(cards).click(function (e) {
    e.preventDefault();
    const card = $(this);
    drawCounter++
    if (card.children().length == 0) {
      if (playerStep) {
        card.addClass("active");
        $(".player1").css({
          "background-color": "#0eb4fb",
        });
        $(".player2").css({
          "background-color": "lightgray",
        });
        playerStep = false;
        $(card).attr("data-player", "circle");
        card.html(circle);
      } else {
        card.addClass("active");
        $(".player1").css({
          "background-color": "lightgray",
        });
        $(".player2").css({
          "background-color": "#ff2424",
        });
        playerStep = true;
        $(card).attr("data-player", "mark");
        card.html(mark);
      }
    } else {
      return;
    }

    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
      [0, 4, 8], [2, 4, 6] // Диагонали
    ];
    console.log(checkWinner(getBoard(), winningCombos));
    if (checkWinner(getBoard(), winningCombos) == "x") {
      playerWin(1)
      console.log(player1Score);
      player1Score++
      console.log(player1Score);
      $(".score__player1").text(`score: ${player1Score}`)
    } else if(checkWinner(getBoard(), winningCombos) == "o") {
      playerWin(2)
      player2Score++
      $(".score__player2").text(`score: ${player2Score}`)
   } else if (drawCounter == 9) {
      playerWin("draw")
   }

  });
}

function playerWin(player) {
  if (player == 1) {
    $("#player-popup").text("Player 1 Win!")
  } else if (player == 2){
    $("#player-popup").text("Player 2 Win!")
  } else {
    $("#player-popup").text("Draw!")
  }
  $('.popup-fade').fadeIn();

  $('.popup-close').click(function () {
    $(this).parents('.popup-fade').fadeOut();
    restart()
    return false;
  });

  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      restart()
      $('.popup-fade').fadeOut();
    }
  });

  $('.popup-fade').click(function (e) {
    if ($(e.target).closest('.popup').length == 0) {
      restart()
      $(this).fadeOut();
    }
  });
  
}

function checkWinner(board, winningCombos) {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}


function getBoard() {
  const board = [];
  $(".card").each(function () {
    const player = $(this).attr("data-player");
    if (player === "mark") {
      board.push("x");
    } else if (player === "circle") {
      board.push("o");
    } else {
      board.push(null);
    }
  });
  return board;
}