import FactoryMaker from 'dashjs/src/core/FactoryMaker';
import SwitchRequest from 'dashjs/src/streaming/rules/SwitchRequest';
import RulesContextMetrics from '@/core/metrics/RulesContextMetrics';

import config from '@/core/configs';
import fetch from '@/core/utils/fetch';

const ruleName = 'LowestBitrateRule';

function LowestBitrateRuleClass() {
  const { context } = this;

  function setup() {}

  function getMaxIndex(rulesContext) {
    const ctxMetrics = new RulesContextMetrics(rulesContext);
    const switchRequest = SwitchRequest(context).create();

    // request bitrate from server
    const postData = {};

    const [response, err] = fetch.post(
      `${config.protocol}://${config.hostname}:${config.port.lowest}`,
      postData,
    );
    if (err) {
      console.error(`[${ruleName}] error`, err);
    }
    console.log(`[${ruleName}] received response`, response);

    // Ask to switch to the lowest bitrate
    switchRequest.quality = 9; // response.bitrate;
    switchRequest.reason = 'Always switching to the lowest bitrate';
    switchRequest.priority = SwitchRequest.PRIORITY.STRONG;

    console.log(
      `[${ruleName}] [${ctxMetrics.getMediaType()}] requesting switch to index: `,
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
LowestBitrateRuleClass.__dashjs_factory_name = 'LowestBitrateRule';

const LowestBitrateRule = FactoryMaker.getClassFactory(LowestBitrateRuleClass);

export default LowestBitrateRule;
