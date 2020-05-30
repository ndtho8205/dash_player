class PlayerMetrics {
  constructor(player) {
    this.player = player;
    this.streamInfo = player.getActiveStream().getStreamInfo();
    this.dashMetrics = player.getDashMetrics();
    this.dashAdapter = player.getDashAdapter();
    // this.httpMetrics = this.calculateHTTPMetrics();
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
    // const bitrateValue = repSwitch
    //   ? Math.round(
    //     this.dashAdapter.getBandwidthForRepresentation(repSwitch.to, periodIdx)
    //         / 1000,
    //   )
    //   : 0;
    const bitrateIdx = this.player.getQualityFor('video');

    return bitrateIdx;
  }

  getBufferLevel() {
    return this.dashMetrics.getCurrentBufferLevel('video', true);
  }

  getThroughput() {
    return this.player.getAverageThroughput('video');
  }

  getAverageDownloadTime() {
    const type = 'video';
    const requests = this.dashMetrics.getHttpRequests(type);

    const requestWindow = requests
      .slice(-20)
      .filter(
        (req) =>
          req.responsecode >= 200
          && req.responsecode < 300
          && req.type === 'MediaSegment'
          // eslint-disable-next-line no-underscore-dangle
          && req._stream === type
          // eslint-disable-next-line no-underscore-dangle
          && !!req._mediaduration,
      )
      .slice(-4);

    if (requestWindow.length > 0) {
      const downloadTimes = requestWindow.map(
        // eslint-disable-next-line no-underscore-dangle
        (req) => Math.abs(req._tfinish.getTime() - req.tresponse.getTime()) / 1000,
      );

      return downloadTimes.reduce((l, r) => l + r) / downloadTimes.length;
    }

    return 0;
  }
}

export default PlayerMetrics;
