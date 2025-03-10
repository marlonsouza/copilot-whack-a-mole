import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import GameBoard from '@/components/GameBoard.vue';
import RankingTable from '@/components/RankingTable.vue';

describe('App.vue', () => {
  it('renders ScoreBoard, GameBoard, and RankingTable components', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.findComponent(ScoreBoard).exists()).toBe(true);
    expect(wrapper.findComponent(GameBoard).exists()).toBe(true);
    expect(wrapper.findComponent(RankingTable).exists()).toBe(true);
  });

  it('starts the game when startGame is called', async () => {
    const wrapper = shallowMount(App);
    wrapper.setData({ playerName: 'Test Player' });
    await wrapper.vm.startGame();
    expect(wrapper.vm.$refs.gameBoard.playerName).toBe('Test Player');
  });
});

// Add similar tests for other components
