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
  name: 'ThroughputChart',
  components: {
    ReactiveChart,
  },

  computed: {
    ...mapState({
      timeCodeTrace(state) {
        return this.extractLatest(state.timeCodeTrace, 20);
      },
      throughputTrace(state) {
        return this.extractLatest(state.throughputTrace, 20);
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
        y: this.throughputTrace,
        mode: 'lines+markers',
        name: 'Throughput',
        line: {
          color: styles.throughput.color,
          width: 3,
        },
      };
      return [trace];
    },

    chartLayout() {
      const annotation = this.throughputTrace.length > 0
        ? [
          {
            x: this.timeCodeTrace[this.timeCodeTrace.length - 1],
            y: this.throughputTrace[this.throughputTrace.length - 1],
            text: `${Math.round(
              this.throughputTrace[this.throughputTrace.length - 1],
            )} Kbps`,
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
          title: 'Throughput (Kbps)',
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
