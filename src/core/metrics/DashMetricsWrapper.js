import dashjs from 'dashjs';

const factory = dashjs.FactoryMaker;
const DashMetrics = factory.getSingletonFactoryByName('DashMetrics');
const DashManifestModel = factory.getSingletonFactoryByName('DashManifestModel');
const StreamController = factory.getSingletonFactoryByName('StreamController');

class DashMetricsWrapper {
  constructor(context) {
    this.dashMetrics = DashMetrics(context).getInstance();
    this.dashManifest = DashManifestModel(context).getInstance();
    this.streamController = StreamController(context).getInstance();

    this.rulesContext = null;
    this.abrController = null;
    this.throughputHistory = this.abrController.getThroughputHistory();
  }

  setRulesContext(rulesContext) {
    this.rulesContext = rulesContext;
    this.abrController = rulesContext.getAbrController();
  }

  getMediaType() {
    return this.rulesContext.getMediaInfo().type;
  }

  isDynamic() {
    return this.streamInfo && this.streamInfo.manifestInfo
      ? this.streamInfo.manifestInfo.isDynamic
      : false;
  }

  // Metrics

  getListOfLastChunkThroughput() {
    return this.throughputHistory.getSafeAverageThroughput(
      this.getMediaType(),
      this.isDynamic(),
    );
  }

  // getListOfLastChunkDownloadTime() {}

  // getListOfNextChunkVideoSize() {}

  // getLastChunkBitrate() {}

  // getNumberOfRemainingChunks() {}

  // getCurrentBufferLevel() {}
}

export default DashMetricsWrapper;
