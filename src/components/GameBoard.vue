<template>
  <div id="game-board">
    <div v-for="(cell, index) in cells" :key="index" class="cell" @click="hitMole(index)">
      <div v-if="cell" class="mole"></div>
    </div>
    <span id="score-animation" class="hidden">+1</span>
    <div v-if="showCongratsMessage" id="congratsMessage">
      Congratulations {{ winnerName }}! You are the top scorer!
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',
  props: ['players'],
  data() {
    return {
      cells: Array(9).fill(false),
      score: 0,
      time: 60,
      moleInterval: null,
      gameInterval: null,
      playerName: '',
      showCongratsMessage: false,
      winnerName: ''
    };
  },
  methods: {
    showMole() {
      const randomIndex = Math.floor(Math.random() * this.cells.length);
      this.$set(this.cells, randomIndex, true);
      setTimeout(() => {
        this.$set(this.cells, randomIndex, false);
      }, 1000);
    },
    hitMole(index) {
      if (this.cells[index]) {
        this.updateScore();
        this.$set(this.cells, index, false);
      }
    },
    updateScore() {
      this.score++;
      this.$emit('update:score', this.score);
      this.triggerScoreAnimation();
    },
    triggerScoreAnimation() {
      const scoreAnimation = this.$el.querySelector('#score-animation');
      scoreAnimation.classList.remove('hidden');
      scoreAnimation.classList.add('animate');
      setTimeout(() => {
        scoreAnimation.classList.remove('animate');
        scoreAnimation.classList.add('hidden');
      }, 1000);
    },
    startGame(playerName) {
      this.playerName = playerName;
      this.score = 0;
      this.time = 60;
      this.$emit('update:score', this.score);
      this.$emit('update:time', this.time);
      clearInterval(this.moleInterval);
      clearInterval(this.gameInterval);
      this.moleInterval = setInterval(this.showMole, 1000);
      this.gameInterval = setInterval(this.updateTime, 1000);
      this.showCongratsMessage = false;
    },
    updateTime() {
      this.time--;
      this.$emit('update:time', this.time);
      if (this.time === 0) {
        clearInterval(this.moleInterval);
        clearInterval(this.gameInterval);
        this.endGame();
      }
    },
    endGame() {
      this.$emit('end-game', { name: this.playerName, score: this.score });
      this.congratulateWinner(this.playerName, this.score);
    },
    congratulateWinner(playerName, playerScore) {
      if (this.players[0].name === playerName && this.players[0].score === playerScore) {
        this.winnerName = playerName;
        this.showCongratsMessage = true;
      }
    }
  }
};
</script>

<style scoped>
#game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  justify-content: center;
  margin: 0 auto;
}
.cell {
  width: 100px;
  height: 100px;
  background-color: #F8D800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #333;
  position: relative;
}
.mole {
  width: 50px;
  height: 50px;
  background-image: url('../assets/mole.jpg');
  background-size: cover;
  border-radius: 50%;
  position: absolute;
}
.hidden {
  display: none;
}
.animate {
  animation: scoreIncrease 2s ease-out;
}
@keyframes scoreIncrease {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}

#congratsMessage {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #F8D800;
  padding: 10px;
  border: 2px solid #333;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2em;
  z-index: 1000;
  pointer-events: none;
  width: 80%;
  text-align: center;
}
</style>