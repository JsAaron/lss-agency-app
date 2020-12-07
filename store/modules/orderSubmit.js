const state = {
  formData: null,
};


const mutations = {
  mutSetFormData(state, data) {
    state.formData = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}