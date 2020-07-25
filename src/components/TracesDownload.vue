<template>
  <div>
    <input type="text" :value="filename" />
    <button @click="downloadTraces">Download traces</button>
    <a ref="link" href="" download="" style="visibility: hidden;"></a>
  </div>
</template>

<script>
export default {
  name: 'TracesDownload',
  data() {
    return {
      filename: 'export_traces.csv',
    };
  },

  methods: {
    downloadTraces() {
      const csvContent = this.exportTracesToCsv();

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      this.$refs.link.setAttribute('href', url);
      this.$refs.link.setAttribute('download', this.filename);
      this.$refs.link.click();
    },
    exportTracesToCsv() {
      const {
        timeCodeTrace,
        bitrateTrace,
        bufferLevelTrace,
        throughputTrace,
        downloadTimeTrace,
      } = this.$store.state;

      const lines = timeCodeTrace.map((timeCode, idx) =>
        [
          timeCode,
          bitrateTrace[idx],
          bufferLevelTrace[idx],
          throughputTrace[idx],
          downloadTimeTrace[idx],
        ].join(' '));
      lines.splice(0, 0, 'timeCode bitrate bufferLevel throughput downloadTime\n');

      return lines.join('\n');
    },
  },
};
</script>
