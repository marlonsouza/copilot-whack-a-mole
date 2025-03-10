<template>
  <table id="rankingTable">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, index) in players" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ player.name }}</td>
        <td>{{ player.score }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'RankingTable',
  props: ['players']
};
</script>

<style scoped>
#rankingTable {
  margin: 20px auto;
  border-collapse: collapse;
}
#rankingTable th, #rankingTable td {
  border: 2px solid #333;
  padding: 10px;
  background-color: #F8D800;
}
#rankingTable th {
  background-color: #FF0000;
}
</style>