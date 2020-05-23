<template>
  <div class="dash">
    <h1>Dash</h1>
    <div class="flex flex-row flex-wrap justify-around items-start content-start">
      <DashPlayer></DashPlayer>
      <div class="flex flex-column">
        <BitrateChart></BitrateChart>
        <BufferLevelChart></BufferLevelChart>
        <ThroughputChart></ThroughputChart>
      </div>
    </div>
  </div>
</template>

<script>
import DashPlayer from '@/components/DashPlayer.vue';
import BitrateChart from '@/components/visualizations/BitrateChart.vue';
import BufferLevelChart from '@/components/visualizations/BufferLevelChart.vue';
import ThroughputChart from '@/components/visualizations/ThroughputChart.vue';

export default {
  name: 'Dash',
  components: {
    DashPlayer,
    BitrateChart,
    BufferLevelChart,
    ThroughputChart,
  },
};
</script>

<style lang="scss" scoped></style>
