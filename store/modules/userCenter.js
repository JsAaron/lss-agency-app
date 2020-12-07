import api from '../../core/appOnLaunch.js';
import request from '../../core/request.js';

const state = {
  data: null,
};

const getters = {
  data(state) {
    return state.data;
  },
  foot_bar(state) {
    return state.data.foot_bar;
  }
};

const mutations = {
  data(state, data) {
    state.data = data;
  },
};

const actions = {
  data(context) {
    request({
      url: api.user.config,
    }).then(response => {
      if (response.code === 0) {
        if (response.data &&
          response.data.config &&
          response.data.config.user_center) {
          context.commit('data', response.data.config.user_center);
        }
      }
    }).catch(e => {});
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}