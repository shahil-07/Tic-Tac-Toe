let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true; //playerX, playerO
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++

    checkWinner();
  });
});

const disableBoxes = () => {
    for ( let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for ( let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, winner is ${winner}.`
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
  msg.innerText = "It's a draw."
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner", pos1Val);
        showWinner(pos1Val);
        return;
      }
    }
  }
  if (count === 9) {
    showDraw();
  }
};


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
