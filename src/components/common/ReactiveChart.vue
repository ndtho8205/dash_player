<template>
  <div ref="chart"></div>
</template>

<script>
import Plotly from 'plotly.js-basic-dist-min';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      config: {
        reponsive: true,
        scrollZoom: false,
        editable: false,
        displayModeBar: false,
      },
    };
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.plot();
      },
    },
    layout: {
      deep: true,
      handler() {
        this.plot();
      },
    },
  },

  mounted() {
    this.plot();
  },

  methods: {
    plot() {
      Plotly.react(this.$refs.chart, this.data, this.layout, this.config);
    },
  },
};
</script>

<style lang="sass" scoped></style>
