import dashjs from 'dashjs';

import DashMetricsWrapper from '@/core/metrics/DashMetricsWrapper';

// import config from '@/core/configs';
// import fetch from '@/core/utils/fetch';

function LowestBitrateRule() {
  const { context } = this;

  const factory = dashjs.FactoryMaker;
  const SwitchRequest = factory.getClassFactoryByName('SwitchRequest');

  const ctxMetricsWrapper = new DashMetricsWrapper(context);

  function setup() {}

  function getMaxIndex(rulesContext) {
    ctxMetricsWrapper.setRulesContext(rulesContext);

    const switchRequest = SwitchRequest(context).create();

    // request bitrate from server
    // const postData = {};

    // const [response, err] = fetch.post(
    //   `${config.protocol}://${config.hostname}:${config.port.lowest}`,
    //   postData,
    // );
    // if (err) {
    //   console.error(`[${ruleName}] error`, err);
    // }
    // console.log(`[${ruleName}] received response`, response);

    // Ask to switch to the lowest bitrate
    switchRequest.quality = 8; // response.bitrate;
    switchRequest.reason = 'Always switching to the lowest bitrate';
    switchRequest.priority = SwitchRequest.PRIORITY.STRONG;

    console.log(
      `[LowestBitrateRule] [${ctxMetricsWrapper.getMediaType()}] requesting switch to index: `,
      switchRequest.quality,
      '. Average throughput',
      Math.round(ctxMetricsWrapper.getListOfLastChunkThroughput()),
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
LowestBitrateRule.__dashjs_factory_name = 'LowestBitrateRule';
export default dashjs.FactoryMaker.getClassFactory(LowestBitrateRule);
