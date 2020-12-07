import api from '../../core/appOnLaunch.js';
import request from '../../core/request.js';

const state = {
  home_pages: {},
  type: ''
};

const getters = {

};

const mutations = {
  getHomePages(state, data) {
    console.table(data);
    state.type = data.type;
    state.home_pages = data.home_pages;
  }
};

const actions = {
  getHomePages(content) {
    request({ url: `${api.index.index}&page_id=0&longitude=&latitude=` }).then(response => {
      content.commit('getHomePages', response.data);
    }).catch(err => {
      console.log(err);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}