import FactoryMaker from 'dashjs/src/core/FactoryMaker';
import SwitchRequest from 'dashjs/src/streaming/rules/SwitchRequest';

import RulesContextMetrics from '@/core/metrics/RulesContextMetrics';
// import config from '@/config';
// import { syncFetch } from '@/utils/fetch';

function RLBitrateRuleClass(config) {
  const { context } = this;
  console.log('config', config);

  function setup() {}

  function getMaxIndex(rulesContext) {
    const ctxMetrics = new RulesContextMetrics(rulesContext);
    const switchRequest = SwitchRequest(context).create();

    // request bitrate from server
    // const postData = {
    //   nextChunkSize: ctxMetrics.getNextChunkSize(),
    //   lastquality: ctxMetrics.getLastQuality(),
    //   buffer: ctxMetrics.getBuffer(),
    //   bufferAdjusted: ctxMetrics.getAdujstedBuffer(),
    //   estimatedBandwidth: ctxMetrics.getEstimatedBandwidth(),
    //   lastRequest: ctxMetrics.getLastRequested(),
    //   rebufferTime: ctxMetrics.getRebufferingTime(),
    //   lastChunkFinishTime: ctxMetrics.getLastChunkFinishTime(),
    //   lastChunkStartTime: ctxMetrics.getLastChunkFinishTime(),
    //   lastChunkSize: ctxMetrics.getLastChunkSize(),
    // };

    // const [response, err] = syncFetch.post(
    //   `${config.protocol}://${config.hostname}:${config.lowest_server_port}`,
    //   postData,
    // );
    // if (err) {
    //   console.error('[RLBitrateRule] error', err);
    // }
    // console.log('[RLBitrateRule] received response', response);

    // Ask to switch to the bitrate requested by RL ABR server
    const getRandom = (list) => list[Math.floor(Math.random() * list.length)];
    switchRequest.quality = getRandom([0, 8, 9]);
    switchRequest.reason = 'Received a bitrate switching request from RL ABR server.';
    switchRequest.priority = SwitchRequest.PRIORITY.STRONG;

    console.log(
      `[RLBitrateRule] [${ctxMetrics.getMediaType()}] requesting switch to index: `,
      switchRequest.quality,
      '. Average throughput',
      Math.round(ctxMetrics.getThroughput()),
      'kbps',
    );

    return switchRequest;
  }

  function reset() {}

  const instance = {
    getMaxIndex,
    reset,
  };

  setup();

  return instance;
}

// eslint-disable-next-line
RLBitrateRuleClass.__dashjs_factory_name = 'RLBitrateRule';

const RLBitrateRule = FactoryMaker.getClassFactory(RLBitrateRuleClass);

export default RLBitrateRule;
