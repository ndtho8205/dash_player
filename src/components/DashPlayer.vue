<template>
  <div class="dash-player">
    <video ref="videoPlayer" width="640" height="360" controls></video>
    <div>
      <p><b>Number of remaining chunks:</b> {{ this.remainingChunks }}/<b>160</b></p>
    </div>
  </div>
</template>

<script>
import { MediaPlayer } from 'dashjs';

import PlayerMetrics from '@/core/metrics/PlayerMetrics';
import LowestBitrateRule from '@/core/rules/LowestBitrateRule';
// import RLBitrateRule from '@/core/rules/RLBitrateRule';

export default {
  name: 'DashPlayer',
  data() {
    return {
      player: null,
      autoplay: true,
      src: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
      sessionStartTime: 0,
      eventPoller: null,
      remainingChunks: 0,
    };
  },

  mounted() {
    this.initPlayer();
  },

  beforeDestroy() {
    this.destroyInterval();
  },

  methods: {
    initPlayer() {
      // create DASH media player
      this.player = MediaPlayer().create();
      this.player.updateSettings({
        streaming: {
          abr: {
            useDefaultABRRules: false,
          },
        },
      });

      // custom ABR rules
      this.player.addABRCustomRule(
        'qualitySwitchRules',
        'LowestBitrateRule',
        LowestBitrateRule,
        // 'RLBitrateRule',
        // RLBitrateRule,
      );

      // handle media player events
      const context = this;
      this.player.on(
        MediaPlayer.events.STREAM_INITIALIZED,
        this.handleOnStreamInitialized,
        context,
      );
      this.player.on(
        MediaPlayer.events.PLAYBACK_STARTED,
        this.handleOnPlaybackStarted,
        context,
      );
      this.player.on(
        MediaPlayer.events.PLAYBACK_PAUSED,
        this.handleOnPlaybackPaused,
        context,
      );
      this.player.on(
        MediaPlayer.events.PLAYBACK_ENDED,
        this.handleOnPlaybackEnded,
        context,
      );

      // init media player with source
      this.player.initialize(this.$refs.videoPlayer, this.src, this.autoplay);
    },

    handleOnStreamInitialized() {
      const bitrateInfoList = this.player.getBitrateInfoListFor('video');
      console.log({ bitrateInfoList });
      this.$store.commit('SET_BITRATE_INFO_LIST', bitrateInfoList);
    },

    handleOnPlaybackStarted() {
      console.log(`[${this.name}] onPlaybackStarted`);
      if (!this.sessionStartTime) {
        this.sessionStartTime = new Date().getTime() / 1000;
      }

      this.pollData();
    },

    handleOnPlaybackPaused() {
      console.log(`[${this.name}] onPlaybackPaused`);
      this.destroyInterval();
    },

    handleOnPlaybackEnded() {
      console.log(`[${this.name}] onPlaybackEnded`);
      this.destroyInterval();
    },

    pollData() {
      if (this.eventPoller) {
        return;
      }

      this.eventPoller = setInterval(() => {
        const playerMetrics = new PlayerMetrics(this.player);
        if (playerMetrics.haveInfo()) {
          this.$store.commit(
            'PUSH_TIME_CODE',
            playerMetrics.getTimeCode(this.sessionStartTime),
          );
          this.$store.commit('PUSH_BITRATE', playerMetrics.getBitrate());
          this.$store.commit('PUSH_BUFFER_LEVEL', playerMetrics.getBufferLevel());
          this.$store.commit('PUSH_THROUGHPUT', playerMetrics.getThroughput());
          this.$store.commit(
            'PUSH_DOWNLOAD_TIME',
            playerMetrics.getAverageDownloadTime(),
          );
          this.remainingChunks = (
            (this.player.duration() - this.player.time())
            / 4
          ).toFixed(2);
        }
      }, 1000);
    },

    destroyInterval() {
      clearInterval(this.eventPoller);
      this.eventPoller = null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
