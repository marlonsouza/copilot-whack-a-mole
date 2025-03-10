<template>
  <div id="score-board">
    <span>Score: <span>{{ score }}</span></span>
    <span id="score-animation" class="hidden">+1</span>
    <span>Time: <span>{{ time }}</span>s</span>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: ['score', 'time']
};
</script>

<style scoped>
#score-board {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  font-size: 1.5em;
}
.hidden {
  display: none;
}
</style>