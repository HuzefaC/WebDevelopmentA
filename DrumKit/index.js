drums = document.querySelectorAll(".drum");

drums.forEach((drum) => {
  drum.addEventListener("click", handleClick);
});

document.addEventListener("keydown", handleKeyPress);

function handleClick() {
  playSound(this.innerHTML);
  buttonAnimation(this.innerHTML);
}

function handleKeyPress(event) {
  playSound(event.key);
  buttonAnimation(event.key);
}

function playSound(key) {
  let sounds = {
    w: "crash.mp3",
    a: "kick-bass.mp3",
    s: "snare.mp3",
    d: "tom-1.mp3",
    j: "tom-2.mp3",
    k: "tom-3.mp3",
    l: "tom-4.mp3",
  };

  if (key in sounds) {
    let audio = new Audio(`sounds/${sounds[key]}`);
    audio.play();
  }
}

function buttonAnimation(key) {
  let button = document.querySelector(`.${key}`);
  console.log(button);

  button.classList.add("pressed");

  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}
