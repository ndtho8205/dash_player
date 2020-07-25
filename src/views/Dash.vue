<template>
  <div class="dash">
    <h1>Dash</h1>
    <div class="flex flex-row flex-wrap justify-around items-start content-start">
      <DashPlayer></DashPlayer>
      <div class="flex flex-column">
        <TracesDownload></TracesDownload>
        <BitrateBufferLevelChart></BitrateBufferLevelChart>
        <ThroughputChart></ThroughputChart>
        <DownloadTimeChart></DownloadTimeChart>
      </div>
    </div>
  </div>
</template>

<script>
import DashPlayer from '@/components/DashPlayer.vue';
import BitrateBufferLevelChart from '@/components/visualizations/BitrateBufferLevelChart.vue';
import ThroughputChart from '@/components/visualizations/ThroughputChart.vue';
import DownloadTimeChart from '@/components/visualizations/DownloadTimeChart.vue';
import TracesDownload from '@/components/TracesDownload.vue';

export default {
  name: 'Dash',
  components: {
    DashPlayer,
    BitrateBufferLevelChart,
    ThroughputChart,
    DownloadTimeChart,
    TracesDownload,
  },
};
</script>

<style lang="scss" scoped></style>
