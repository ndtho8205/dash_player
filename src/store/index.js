import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timeCodeTrace: [],
    bitrateInfoList: [],
    bitrateTrace: [],
    bufferLevelTrace: [],
    throughputTrace: [],
  },

  getters: {},

  mutations: {
    PUSH_TIME_CODE(state, value) {
      state.timeCodeTrace.push(value);
    },

    SET_BITRATE_INFO_LIST(state, value) {
      state.bitrateInfoList = value;
    },

    PUSH_BITRATE(state, value) {
      state.bitrateTrace.push(value);
    },

    PUSH_BUFFER_LEVEL(state, value) {
      state.bufferLevelTrace.push(value);
    },

    PUSH_THROUGHPUT(state, value) {
      state.throughputTrace.push(value);
    },
  },

  actions: {},
  modules: {},
});
