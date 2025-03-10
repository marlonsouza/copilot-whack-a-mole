<template>
  <div id="app">
    <h1>Whack-a-Mole</h1>
    <ScoreBoard :score="score" :time="time" />
    <GameBoard ref="gameBoard" :players="players" @update:score="updateScore" @update:time="updateTime" @end-game="endGame" />
    <div>
      <input id="playerName" type="text" v-model="playerName" placeholder="Enter your name" />
      <button id="startGame" @click="startGame">Start Game</button>
    </div>
    <RankingTable :players="players" />
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue';
import GameBoard from './components/GameBoard.vue';
import RankingTable from './components/RankingTable.vue';

export default {
  name: 'App',
  components: {
    ScoreBoard,
    GameBoard,
    RankingTable
  },
  data() {
    return {
      playerName: '',
      score: 0,
      time: 60,
      players: []
    };
  },
  methods: {
    startGame() {
      if (this.playerName) {
        this.$refs.gameBoard.startGame(this.playerName);
      } else {
        alert('Please enter your name');
      }
    },
    updateScore(newScore) {
      this.score = newScore;
    },
    updateTime(newTime) {
      this.time = newTime;
    },
    endGame(player) {
      this.players.push(player);
      this.players.sort((a, b) => b.score - a.score);
    }
  }
};
</script>

<style scoped>
#app {
  font-family: 'Press Start 2P', cursive;
  background-color: #5C94FC;
  color: #333;
  text-align: center;
}
#playerName, #startGame {
  font-family: 'Press Start 2P', cursive;
  font-size: 1em;
  padding: 10px;
  margin: 20px;
  border: 2px solid #333;
  background-color: #F8D800;
  color: #333;
  cursor: pointer;
}
#playerName {
  width: 400px;
}
</style>
