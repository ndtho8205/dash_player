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
  name: 'BitrateChart',
  components: {
    ReactiveChart,
  },

  computed: {
    ...mapState({
      timeCodeTrace(state) {
        return this.extractLatest(state.timeCodeTrace, 20);
      },
      bitrateList(state) {
        return state.bitrateInfoList.map((item) => Math.floor(item.bitrate / 1000));
      },
      bitrateTrace(state) {
        return this.extractLatest(state.bitrateTrace, 20);
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
        y: this.bitrateTrace,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Bitrate',
        line: {
          color: styles.bitrate.color,
          width: 3,
        },
      };
      return [trace];
    },

    chartLayout() {
      const annotation = this.bitrateTrace.length > 0
        ? [
          {
            x: this.timeCodeTrace[this.timeCodeTrace.length - 1],
            y: this.bitrateTrace[this.bitrateTrace.length - 1],
            text: `Bitrate idx: ${this.bitrateTrace[this.bitrateTrace.length - 1]}`,
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
          title: 'Bitrate (Kbps)',
          range: [0, 10],
          tickmode: 'array',
          tickvals: Array.from({ length: this.bitrateList.length }, (v, k) => k),
          ticktext: this.bitrateList,
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
