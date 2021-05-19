header = document.getElementsByTagName("h1")[0];

player1Dice = document.getElementsByClassName("img1")[0];
player2Dice = document.getElementsByClassName("img2")[0];

player1Number = Math.floor(Math.random() * 6) + 1;
player2Number = Math.floor(Math.random() * 6) + 1;

player1Dice.src = `images/dice${player1Number}.png`;
player2Dice.src = `images/dice${player2Number}.png`;

if (player1Number > player2Number) {
  header.innerHTML = "Player 1 Wins!";
} else if (player1Number < player2Number) {
  console.log(header);
  header.innerHTML = "Player 2 Wins!";
} else {
  header.innerHTML = "Draw!";
}
