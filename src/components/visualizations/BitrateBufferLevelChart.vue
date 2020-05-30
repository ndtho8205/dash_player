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
      bufferLevelTrace(state) {
        return this.extractLatest(state.bufferLevelTrace, 20);
      },
    }),
  },

  methods: {
    extractLatest(trace, n) {
      return trace.slice(Math.max(trace.length - n, 1));
    },

    chartData() {
      const traceBitrate = {
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

      const traceBufferLevel = {
        x: this.timeCodeTrace,
        y: this.bufferLevelTrace,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Buffer Level',
        yaxis: 'y2',
        line: {
          color: styles.buffer.color,
          width: 3,
        },
      };
      return [traceBitrate, traceBufferLevel];
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
          {
            x: this.timeCodeTrace[this.timeCodeTrace.length - 1],
            y: this.bufferLevelTrace[this.bufferLevelTrace.length - 1],
            text: `Buffer level: ${
              this.bufferLevelTrace[this.bufferLevelTrace.length - 1]
            }s`,
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
          r: 40,
          b: 40,
          t: 10,
        },
        showlegend: false,
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
          titlefont: {
            color: styles.bitrate.color,
          },
          tickfont: {
            color: styles.bitrate.color,
          },
        },
        yaxis2: {
          title: 'Buffer Level (sec)',
          range: [0, 20],
          dtick: 2,
          showgrid: true,
          zeroline: false,
          showline: true,
          overlaying: 'y',
          side: 'right',
          titlefont: {
            color: styles.buffer.color,
          },
          tickfont: {
            color: styles.buffer.color,
          },
        },
        annotations: annotation || [],
      };
    },
  },

  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
