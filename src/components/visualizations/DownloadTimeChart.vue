<template>
  <div class="dash-chart">
    <ReactiveChart :data="chartData()" :layout="chartLayout()"></ReactiveChart>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ReactiveChart from '@/components/common/ReactiveChart.vue';
import styles from '@/core/visualizations/styles';

export default {
  name: 'DownloadTimeChart',
  components: {
    ReactiveChart,
  },

  computed: {
    ...mapState({
      timeCodeTrace(state) {
        return this.extractLatest(state.timeCodeTrace, 20);
      },
      downloadTimeTrace(state) {
        return this.extractLatest(state.downloadTimeTrace, 20);
      },
    }),
  },

  methods: {
    extractLatest(trace, n) {
      return trace.slice(Math.max(trace.length - n, 1));
    },

    chartData() {
      const trace = {
        x: this.timeCodeTrace,
        y: this.downloadTimeTrace,
        mode: 'lines+markers',
        name: 'Download Time',
        line: {
          color: styles.downloadTime.color,
          width: 3,
        },
      };
      return [trace];
    },

    chartLayout() {
      const annotation = this.downloadTimeTrace.length > 0
        ? [
          {
            x: this.timeCodeTrace[this.timeCodeTrace.length - 1],
            y: this.downloadTimeTrace[this.downloadTimeTrace.length - 1],
            text: `${this.downloadTimeTrace[
              this.downloadTimeTrace.length - 1
            ].toFixed(3)} sec`,
            yanchor: 'bottom',
            showarrow: false,
          },
        ]
        : null;

      return {
        title: '',
        width: 600,
        height: 250,
        margin: {
          l: 60,
          r: 0,
          b: 40,
          t: 10,
        },
        xaxis: {
          showgrid: true,
          zeroline: false,
          showline: true,
        },
        yaxis: {
          title: 'Download Time (sec)',
          range: [0, 20],
          dtick: 2,
          showgrid: true,
          zeroline: false,
          showline: true,
        },
        annotations: annotation || [],
      };
    },
  },

  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
