class RulesContextMetrics {
  constructor(rulesContext) {
    this.rulesContext = rulesContext;
    this.abrController = rulesContext.getAbrController();
    this.streamInfo = rulesContext.getStreamInfo();
    this.throughputHistory = this.abrController.getThroughputHistory();
  }

  getMediaType() {
    return this.rulesContext.getMediaType();
  }

  isDynamic() {
    return this.streamInfo && this.streamInfo.manifestInfo
      ? this.streamInfo.manifestInfo.isDynamic
      : false;
  }

  getThroughput() {
    return this.throughputHistory.getSafeAverageThroughput(
      this.getMediaType(),
      this.isDynamic(),
    );
  }

  getNextChunkSize() {
    console.log(this.rulesContext);
    return 0;
  }

  getLastQuality() {
    console.log(this.rulesContext);
    return 0;
  }

  getBuffer() {
    console.log(this.rulesContext);
    return 0;
  }

  getAdjustedBuffer() {
    console.log(this.rulesContext);
    return 0;
  }

  getEstimatedBandwidth() {
    console.log(this.rulesContext);
    return 0;
  }

  getLastRequested() {
    console.log(this.rulesContext);
    return 0;
  }

  getRebufferingTime() {
    console.log(this.rulesContext);
    return 0;
  }

  getLastChunkFinishTime() {
    console.log(this.rulesContext);
    return 0;
  }

  getLastChunkStartTime() {
    console.log(this.rulesContext);
    return 0;
  }

  getLastChunkSize() {
    console.log(this.rulesContext);
    return 0;
  }
}

export default RulesContextMetrics;
