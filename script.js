class Character {
  constructor() {
    this.clothes = {
      pink_dress: document.getElementById("pink_dress"),
      pink_shoes: document.getElementById("pink_shoes"),
      bag: document.getElementById("bag"),
      green_dress: document.getElementById("green_dress"),
      green_shoes: document.getElementById("green_shoes"),
      luffy: document.getElementById("luffy"),
    };
  }

  toggle(item) {
    const element = this.clothes[item];
    if (!element) return;

    element.style.display =
      element.style.display === "none" ? "block" : "none";
  }

  reset() {
    Object.values(this.clothes).forEach((item) => {
      item.style.display = "none";
    });
  }
}

class AudioController {
  constructor() {
    this.music = document.getElementById("myAudio");
    this.pop = document.getElementById("pop");
    this.isPlaying = false;
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.music.pause();
    } else {
      this.music.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  playPop() {
    this.pop.currentTime = 0;
    this.pop.play();
  }
}

class Game {
  constructor() {
    this.character = new Character();
    this.audio = new AudioController();

    this.setupEvents();
  }

  setupEvents() {
    document.querySelectorAll(".clothes-buttons button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        const type = img.alt;

        this.character.toggle(type);
        this.audio.playPop();
      });
    });

    document.querySelector("#music").addEventListener("click", () => {
      this.audio.toggleMusic();
    });

    document.querySelector("button[onclick='reset()']").onclick = () => {
      this.character.reset();
    };
  }

  saveCharacter() {
    const container = document.querySelector(".character-container");

    html2canvas(container).then((canvas) => {
      const link = document.createElement("a");
      link.download = "character.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}

// Inicialização do jogo
window.onload = () => {
  const game = new Game();

  // conectar botão save
  document.querySelector("button[onclick='saveCharacter()']").onclick = () => {
    game.saveCharacter();
  };
};