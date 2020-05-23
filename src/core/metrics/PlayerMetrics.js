class PlayerMetrics {
  constructor(player) {
    this.player = player;
    this.streamInfo = player.getActiveStream().getStreamInfo();
    this.dashMetrics = player.getDashMetrics();
    this.dashAdapter = player.getDashAdapter();
  }

  haveInfo() {
    return this.streamInfo && this.dashMetrics;
  }

  getTimeCode(sessionStartTime) {
    return this.player.convertToTimeCode(
      Math.max(new Date().getTime() / 1000 - sessionStartTime, 0),
    );
  }

  getBitrate() {
    // const periodIdx = this.streamInfo.index;
    // const repSwitch = this.dashMetrics.getCurrentRepresentationSwitch('video', true);
    // return repSwitch
    //   ? Math.round(
    //     this.dashAdapter.getBandwidthForRepresentation(repSwitch.to, periodIdx)
    //         / 1000,
    //   )
    //   : 0;
    return this.player.getQualityFor('video');
  }

  getBufferLevel() {
    return this.dashMetrics.getCurrentBufferLevel('video', true);
  }

  getThroughput() {
    return this.player.getAverageThroughput('video');
  }
}

export default PlayerMetrics;
