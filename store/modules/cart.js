const state = {
  reportAndError: {
    boolean: false,
    content: '网络开了会儿小差， 请刷新重试下哦~',
  },
};

const getters = {
  reportAndErrorObj(state) {
    return state.reportAndError;
  }
};

const mutations = {
  reportAndErrorObj(state, data) {
    state.reportAndError = data;
  },
};

const actions = {
  reportAndErrorObj(content, data) {
    content.commit('reportAndErrorObj', data);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}